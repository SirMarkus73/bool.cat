import { beforeEach, describe, expect, it } from "vitest";
import { findFirstShortUrlMock, resetDbMocks } from "#/test/mocks/db";
import { checkSlugAvailability } from "./checkSlugAvailability";

describe("checkSlugAvailability", () => {
	beforeEach(() => {
		resetDbMocks();
	});

	it("returns success when no short url exists with the given slug", async () => {
		findFirstShortUrlMock.mockResolvedValueOnce(undefined);

		const result = await checkSlugAvailability("free-slug");

		expect(result).toEqual({ success: true, data: null });
		expect(findFirstShortUrlMock).toHaveBeenCalledWith({
			where: { slug: "free-slug" },
			columns: { id: true },
		});
	});

	it("returns a server error when the slug is already taken", async () => {
		findFirstShortUrlMock.mockResolvedValueOnce({ id: 1 });

		const result = await checkSlugAvailability("taken-slug");

		expect(result).toEqual({
			success: false,
			type: "server",
			message: "Slug is already taken.",
		});
	});
});
