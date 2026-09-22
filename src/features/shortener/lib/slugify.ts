// Caracteres que no son letras, números, "-" o "_": se sustituyen por "-".
const INVALID_CHARS = /[^a-zA-Z0-9_-]+/g;
// "--", "---", etc. colapsan a un solo "-".
const DUPLICATE_DASHES = /-{2,}/g;
// "__", "___", etc. colapsan a un solo "_".
const DUPLICATE_UNDERSCORES = /_{2,}/g;
// Mezclas de "_" y "-" seguidos ("_-", "-_-", ...) colapsan a un solo "-".
const MIXED_SEPARATORS = /[_-]{2,}/g;

export function slugify(input: string): string {
	return input
		.trim()
		.replace(INVALID_CHARS, "-")
		.replace(DUPLICATE_DASHES, "-")
		.replace(DUPLICATE_UNDERSCORES, "_")
		.replace(MIXED_SEPARATORS, "-");
}

export type SlugSegment =
	| { id: number; kind: "unchanged"; text: string }
	| { id: number; kind: "changed"; removed: string; added: string };

/**
 * One character of the text as it currently stands in the pipeline, plus
 * the substring of the *original* input it traces back to. For an
 * untouched character `origin` is just that character; once a run of
 * characters collapses into one (by any step), the surviving atom's
 * `origin` is the whole original run it replaced.
 */
type Atom = { char: string; origin: string };

/**
 * Generic building block: finds every match of `regex` in `text` and
 * reports where it is, what it matched, and what it becomes. Knows
 * nothing about slugs — just a regex-in, matches-out utility.
 */
function findReplacements(
	text: string,
	regex: RegExp,
	replacer: (match: string) => string,
): { index: number; original: string; replacement: string }[] {
	const replacements: {
		index: number;
		original: string;
		replacement: string;
	}[] = [];

	for (const match of text.matchAll(regex)) {
		if (match.index === undefined) continue;
		replacements.push({
			index: match.index,
			original: match[0],
			replacement: replacer(match[0]),
		});
	}

	return replacements;
}

/**
 * Runs one step of the `slugify` pipeline over `atoms`: re-finds matches on
 * the text the atoms currently spell out, then collapses each match's
 * atoms into a single new atom whose `origin` is the concatenation of
 * everything that fed into it — so no matter how many steps a character
 * has been through, its atom still remembers the original text behind it.
 */
function applyStep(
	atoms: Atom[],
	regex: RegExp,
	replacer: (match: string) => string,
): Atom[] {
	const text = atoms.map((atom) => atom.char).join("");
	const result: Atom[] = [];
	let cursor = 0;

	for (const { index, original, replacement } of findReplacements(
		text,
		regex,
		replacer,
	)) {
		if (index > cursor) {
			result.push(...atoms.slice(cursor, index));
		}

		const consumed = atoms.slice(index, index + original.length);
		result.push({
			char: replacement,
			origin: consumed.map((atom) => atom.origin).join(""),
		});

		cursor = index + original.length;
	}

	if (cursor < atoms.length) {
		result.push(...atoms.slice(cursor));
	}

	return result;
}

/**
 * Breaks `input` into the pieces that make up `slugify(input)` by running
 * the exact same steps `slugify` runs, in the same order, tracking each
 * surviving character back to what it originally was. An unchanged piece
 * comes back as plain `text`; a changed piece carries both the original
 * text that was `removed` and the `added` text that replaced it — enough
 * to render a red/blue before-after preview.
 */
export function getSlugSegments(input: string): SlugSegment[] {
	const trimmed = input.trim();
	let atoms: Atom[] = [...trimmed].map((char) => ({ char, origin: char }));

	atoms = applyStep(atoms, INVALID_CHARS, () => "-");
	atoms = applyStep(atoms, DUPLICATE_DASHES, () => "-");
	atoms = applyStep(atoms, DUPLICATE_UNDERSCORES, () => "_");
	atoms = applyStep(atoms, MIXED_SEPARATORS, () => "-");

	const segments: SlugSegment[] = [];

	for (const atom of atoms) {
		const isChanged = atom.origin !== atom.char;
		const last = segments.at(-1);

		if (!isChanged && last?.kind === "unchanged") {
			last.text += atom.char;
			continue;
		}
		if (isChanged && last?.kind === "changed") {
			last.removed += atom.origin;
			last.added += atom.char;
			continue;
		}

		segments.push(
			isChanged
				? {
						id: segments.length,
						kind: "changed",
						removed: atom.origin,
						added: atom.char,
					}
				: { id: segments.length, kind: "unchanged", text: atom.char },
		);
	}

	return segments;
}
