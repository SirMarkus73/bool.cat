import { jwtVerify, SignJWT } from "jose";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { ApiResponse } from "#/interfaces/api";
import { serverEnv } from "#/lib/env/server";
import { getRandomSlugToken } from "./getRandomSlugToken";

const { getRandomSlugMock } = vi.hoisted(() => ({
	getRandomSlugMock: vi.fn<() => Promise<ApiResponse<{ slug: string }>>>(),
}));

vi.mock("./getRandomSlug", () => ({
	getRandomSlug: getRandomSlugMock,
}));

// Real serverEnv, backed by the test env vars in vitest.config.ts's
// test.env — not mocked, so the JWT is signed and verified with the same
// secret the service actually uses.
const secretKey = new TextEncoder().encode(serverEnv.JWT_SECRET);

describe("getRandomSlugToken", () => {
	beforeEach(() => {
		getRandomSlugMock.mockReset();
	});

	it("propagates the failure when no slug could be generated", async () => {
		const failure = {
			success: false as const,
			type: "server" as const,
			message: "Failed to generate a unique slug after multiple attempts.",
		};
		getRandomSlugMock.mockResolvedValueOnce(failure);

		const result = await getRandomSlugToken();

		expect(result).toEqual(failure);
	});

	it("signs a JWT embedding the generated slug", async () => {
		getRandomSlugMock.mockResolvedValueOnce({
			success: true,
			data: { slug: "abc123" },
		});

		const result = await getRandomSlugToken();

		expect(result.success).toBe(true);
		if (!result.success) throw new Error("expected success");

		expect(result.data.slug).toBe("abc123");

		const { payload } = await jwtVerify(result.data.slugToken, secretKey);
		expect(payload.slug).toBe("abc123");
		expect(payload.exp).toBeDefined();
	});

	it("returns a server error when signing the token fails", async () => {
		getRandomSlugMock.mockResolvedValueOnce({
			success: true,
			data: { slug: "abc123" },
		});
		vi.spyOn(SignJWT.prototype, "sign").mockRejectedValueOnce(
			new Error("signing failed"),
		);

		const result = await getRandomSlugToken();

		expect(result).toEqual({
			success: false,
			type: "server",
			message: "Failed to generate slug token.",
		});
	});
});
