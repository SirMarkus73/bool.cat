import { beforeEach, describe, expect, it } from "vitest";
import { authenticatedUser } from "#/test/mocks/authContext";
import {
	dbInsertMock,
	dbInsertValuesMock,
	resetDbMocks,
} from "#/test/mocks/db";
import { slugify } from "../lib/slugify";
import { createCustomShortUrl } from "./createCustomShortUrl";

describe("createCustomShortUrl", () => {
	beforeEach(() => {
		resetDbMocks();
	});

	it("returns the auth failure untouched when the user is not authenticated", async () => {
		const authFailure = {
			success: false as const,
			type: "auth" as const,
			message: "User is not authenticated",
		};

		const result = await createCustomShortUrl(
			{
				slug: "my-slug",
				targetUrl: "https://example.com",
				expirationDate: new Date("2030-01-01"),
			},
			authFailure,
		);

		expect(result).toBe(authFailure);
		expect(dbInsertMock).not.toHaveBeenCalled();
	});

	it("creates a short url owned by the authenticated user", async () => {
		const expirationDate = new Date("2030-01-01T00:00:00.000Z");

		const result = await createCustomShortUrl(
			{ slug: "my-slug", targetUrl: "https://example.com", expirationDate },
			authenticatedUser,
		);

		expect(result).toEqual({ success: true, data: null });
		expect(dbInsertMock).toHaveBeenCalledTimes(1);
		expect(dbInsertValuesMock).toHaveBeenCalledWith({
			expirationDate,
			slug: "my-slug",
			redirectUrl: "https://example.com",
			ownerId: authenticatedUser.data.user.id,
		});
	});

	it("slugifies the requested slug before storing it", async () => {
		const slug = "My Cool Slug!!";

		await createCustomShortUrl(
			{
				slug,
				targetUrl: "https://example.com",
				expirationDate: new Date("2030-01-01"),
			},
			authenticatedUser,
		);

		expect(dbInsertValuesMock.mock.calls[0][0].slug).toBe(slugify(slug));
	});

	it("returns a server error when the insert fails", async () => {
		dbInsertValuesMock.mockRejectedValueOnce(
			new Error("unique constraint violation"),
		);

		const result = await createCustomShortUrl(
			{
				slug: "my-slug",
				targetUrl: "https://example.com",
				expirationDate: new Date("2030-01-01"),
			},
			authenticatedUser,
		);

		expect(result.success).toBe(false);
		if (result.success) return;

		expect(result.type).toBe("server");
		expect(result.message).toBeTypeOf("string");
	});
});
