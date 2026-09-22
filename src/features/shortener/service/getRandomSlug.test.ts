import { beforeEach, describe, expect, it, vi } from "vitest";
import { getRandomSlug } from "./getRandomSlug";

const { nanoidMock, checkSlugAvailabilityMock } = vi.hoisted(() => ({
	nanoidMock: vi.fn(),
	checkSlugAvailabilityMock: vi.fn(),
}));

vi.mock("nanoid", () => ({ nanoid: nanoidMock }));
vi.mock("./checkSlugAvailability", () => ({
	checkSlugAvailability: checkSlugAvailabilityMock,
}));

describe("getRandomSlug", () => {
	beforeEach(() => {
		nanoidMock.mockReset();
		checkSlugAvailabilityMock.mockReset();
	});

	it("returns the generated slug when it is available on the first try", async () => {
		nanoidMock.mockReturnValueOnce("abc123");
		checkSlugAvailabilityMock.mockResolvedValueOnce({
			success: true,
			data: null,
		});

		const result = await getRandomSlug();

		expect(result).toEqual({ success: true, data: { slug: "abc123" } });
		expect(nanoidMock).toHaveBeenCalledWith(6);
		expect(checkSlugAvailabilityMock).toHaveBeenCalledWith("abc123");
	});

	it("retries with a new slug until an available one is found", async () => {
		nanoidMock
			.mockReturnValueOnce("taken1")
			.mockReturnValueOnce("taken2")
			.mockReturnValueOnce("free3");
		checkSlugAvailabilityMock
			.mockResolvedValueOnce({
				success: false,
				type: "server",
				message: "Slug is already taken.",
			})
			.mockResolvedValueOnce({
				success: false,
				type: "server",
				message: "Slug is already taken.",
			})
			.mockResolvedValueOnce({ success: true, data: null });

		const result = await getRandomSlug();

		expect(result).toEqual({ success: true, data: { slug: "free3" } });
		expect(checkSlugAvailabilityMock).toHaveBeenCalledTimes(3);
	});

	it("gives up after the maximum number of retries", async () => {
		nanoidMock.mockReturnValue("always-taken");
		checkSlugAvailabilityMock.mockResolvedValue({
			success: false,
			type: "server",
			message: "Slug is already taken.",
		});

		const result = await getRandomSlug();

		expect(result).toEqual({
			success: false,
			type: "server",
			message: "Failed to generate a unique slug after multiple attempts.",
		});
		expect(checkSlugAvailabilityMock).toHaveBeenCalledTimes(5);
	});
});
