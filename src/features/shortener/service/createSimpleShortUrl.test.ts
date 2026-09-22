import { SignJWT } from "jose";
import { beforeEach, describe, expect, it } from "vitest";
import { SIMPLE_SHORT_URL_EXPIRATION_HOURS } from "#/lib/constants";
import { serverEnv } from "#/lib/env/server";
import {
	authenticatedUser,
	unauthenticatedUser,
} from "#/test/mocks/authContext";
import {
	dbInsertMock,
	dbInsertValuesMock,
	resetDbMocks,
} from "#/test/mocks/db";
import { createSimpleShortUrl } from "./createSimpleShortUrl";

// Real serverEnv, backed by the test env vars in vitest.config.ts's
// test.env — not mocked, so tokens are signed with the same secret the
// service actually verifies against.
const secret = new TextEncoder().encode(serverEnv.JWT_SECRET);

function signSlugToken(
	payload: Record<string, unknown>,
	options?: { expiresIn?: string },
) {
	return new SignJWT(payload)
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime(options?.expiresIn ?? "5m")
		.sign(secret);
}

describe("createSimpleShortUrl", () => {
	beforeEach(() => {
		resetDbMocks();
	});

	it("creates a short url owned by the authenticated user", async () => {
		const slugToken = await signSlugToken({ slug: "my-slug" });

		const result = await createSimpleShortUrl(
			{ targetUrl: "https://example.com", slugToken },
			authenticatedUser,
		);

		expect(result).toEqual({ success: true, data: null });
		expect(dbInsertMock).toHaveBeenCalledTimes(1);

		const inserted = dbInsertValuesMock.mock.calls[0][0];
		expect(inserted.slug).toBe("my-slug");
		expect(inserted.redirectUrl).toBe("https://example.com");
		expect(inserted.ownerId).toBe("user-1");

		const expectedExpiration =
			Date.now() + SIMPLE_SHORT_URL_EXPIRATION_HOURS * 60 * 60 * 1000;
		expect(inserted.expirationDate.getTime()).toBeGreaterThan(Date.now());
		expect(inserted.expirationDate.getTime()).toBeLessThanOrEqual(
			expectedExpiration + 1000,
		);
	});

	it("creates an ownerless short url for an unauthenticated guest", async () => {
		const slugToken = await signSlugToken({ slug: "guest-slug" });

		const result = await createSimpleShortUrl(
			{ targetUrl: "https://example.com", slugToken },
			unauthenticatedUser,
		);

		expect(result).toEqual({ success: true, data: null });
		expect(dbInsertValuesMock.mock.calls[0][0].ownerId).toBeNull();
	});

	it("rejects a malformed slug token without touching the database", async () => {
		const result = await createSimpleShortUrl(
			{ targetUrl: "https://example.com", slugToken: "not-a-jwt" },
			authenticatedUser,
		);

		expect(result).toEqual({
			success: false,
			type: "server",
			message: "Invalid or expired slug token.",
		});
		expect(dbInsertMock).not.toHaveBeenCalled();
	});

	it("rejects a token whose payload is missing the slug claim", async () => {
		const slugToken = await signSlugToken({ notSlug: "oops" });

		const result = await createSimpleShortUrl(
			{ targetUrl: "https://example.com", slugToken },
			authenticatedUser,
		);

		expect(result.success).toBe(false);
		expect(dbInsertMock).not.toHaveBeenCalled();
	});

	it("rejects an expired slug token", async () => {
		const slugToken = await signSlugToken(
			{ slug: "expired-slug" },
			{ expiresIn: "-1s" },
		);

		const result = await createSimpleShortUrl(
			{ targetUrl: "https://example.com", slugToken },
			authenticatedUser,
		);

		expect(result).toEqual({
			success: false,
			type: "server",
			message: "Invalid or expired slug token.",
		});
		expect(dbInsertMock).not.toHaveBeenCalled();
	});
});
