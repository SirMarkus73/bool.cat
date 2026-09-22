import { describe, expect, it } from "vitest";
import { getSlugSegments, slugify } from "./slugify";

describe("slugify", () => {
	it("keeps a string made only of valid characters untouched", () => {
		expect(slugify("hello-world_123")).toBe("hello-world_123");
	});

	it("trims leading and trailing whitespace", () => {
		expect(slugify("  hello  ")).toBe("hello");
	});

	it("replaces a single invalid character with a dash", () => {
		expect(slugify("hello world")).toBe("hello-world");
	});

	it("replaces a run of invalid characters with a single dash", () => {
		expect(slugify("hello!!!world")).toBe("hello-world");
	});

	it("replaces accented and unicode characters", () => {
		expect(slugify("café🎉")).toBe("caf-");
	});

	it("collapses duplicate dashes into one", () => {
		expect(slugify("hello--world")).toBe("hello-world");
	});

	it("collapses duplicate underscores into one", () => {
		expect(slugify("hello__world")).toBe("hello_world");
	});

	it("collapses mixed runs of dashes and underscores into a single dash", () => {
		expect(slugify("hello_-_world")).toBe("hello-world");
		expect(slugify("hello-_world")).toBe("hello-world");
	});

	it("returns an empty string when input is empty or only whitespace", () => {
		expect(slugify("")).toBe("");
		expect(slugify("   ")).toBe("");
	});

	it("handles a string made entirely of invalid characters", () => {
		expect(slugify("!!!")).toBe("-");
	});
});

describe("getSlugSegments", () => {
	it("returns a single unchanged segment for an already valid slug", () => {
		expect(getSlugSegments("hello-world")).toEqual([
			{ id: 0, kind: "unchanged", text: "hello-world" },
		]);
	});

	it("returns a changed segment for an invalid character run", () => {
		expect(getSlugSegments("hello world")).toEqual([
			{ id: 0, kind: "unchanged", text: "hello" },
			{ id: 1, kind: "changed", removed: " ", added: "-" },
			{ id: 2, kind: "unchanged", text: "world" },
		]);
	});

	it("merges consecutive changed characters into a single segment", () => {
		expect(getSlugSegments("a!!!b")).toEqual([
			{ id: 0, kind: "unchanged", text: "a" },
			{ id: 1, kind: "changed", removed: "!!!", added: "-" },
			{ id: 2, kind: "unchanged", text: "b" },
		]);
	});

	it("tracks the original run behind a character collapsed across multiple steps", () => {
		// "--" collapses to "-" in the duplicate-dash step, so the single
		// surviving "-" must remember both original dashes as its origin.
		expect(getSlugSegments("a--b")).toEqual([
			{ id: 0, kind: "unchanged", text: "a" },
			{ id: 1, kind: "changed", removed: "--", added: "-" },
			{ id: 2, kind: "unchanged", text: "b" },
		]);
	});

	it("reconstructs slugify's output when concatenating its segments", () => {
		const inputs = [
			"hello world",
			"  Café Déjà-vu!!  ",
			"a_-_b--c__d",
			"",
			"already-valid_slug",
			"!!!",
		];

		for (const input of inputs) {
			const rebuilt = getSlugSegments(input)
				.map((segment) =>
					segment.kind === "unchanged" ? segment.text : segment.added,
				)
				.join("");

			expect(rebuilt).toBe(slugify(input));
		}
	});
});
