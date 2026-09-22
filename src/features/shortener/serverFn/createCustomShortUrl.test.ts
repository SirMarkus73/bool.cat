import { describe, expect, it } from "vitest";
import { createCustomShortUrlValidator } from "./createCustomShortUrl";

describe("createCustomShortUrlValidator", () => {
	const validInput = {
		slug: "my-slug",
		targetUrl: "https://example.com",
		expirationDate: new Date("2030-01-01"),
	};

	it("accepts a valid payload", () => {
		expect(createCustomShortUrlValidator.safeParse(validInput).success).toBe(
			true,
		);
	});

	it("rejects an empty slug", () => {
		const result = createCustomShortUrlValidator.safeParse({
			...validInput,
			slug: "",
		});

		expect(result.success).toBe(false);
	});

	it("rejects a slug longer than 40 characters", () => {
		const result = createCustomShortUrlValidator.safeParse({
			...validInput,
			slug: "a".repeat(41),
		});

		expect(result.success).toBe(false);
	});

	it("accepts a slug exactly 40 characters long", () => {
		const result = createCustomShortUrlValidator.safeParse({
			...validInput,
			slug: "a".repeat(40),
		});

		expect(result.success).toBe(true);
	});

	it("rejects a targetUrl that is not a valid url", () => {
		const result = createCustomShortUrlValidator.safeParse({
			...validInput,
			targetUrl: "not-a-url",
		});

		expect(result.success).toBe(false);
	});

	it("rejects an expirationDate that is not a date", () => {
		const result = createCustomShortUrlValidator.safeParse({
			...validInput,
			expirationDate: "2030-01-01",
		});

		expect(result.success).toBe(false);
	});
});
