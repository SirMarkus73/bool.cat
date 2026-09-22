import { describe, expect, it } from "vitest";
import { createSimpleShortUrlValidator } from "./createSimpleShortUrl";

describe("createSimpleShortUrlValidator", () => {
	const validInput = { targetUrl: "https://example.com", slugToken: "token" };

	it("accepts a valid payload", () => {
		expect(createSimpleShortUrlValidator.safeParse(validInput).success).toBe(
			true,
		);
	});

	it("rejects a targetUrl that is not a valid url", () => {
		const result = createSimpleShortUrlValidator.safeParse({
			...validInput,
			targetUrl: "not-a-url",
		});

		expect(result.success).toBe(false);
	});

	it("rejects a non-string slugToken", () => {
		const result = createSimpleShortUrlValidator.safeParse({
			...validInput,
			slugToken: 123,
		});

		expect(result.success).toBe(false);
	});
});
