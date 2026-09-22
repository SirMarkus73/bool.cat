import { vi } from "vitest";

export const dbInsertValuesMock = vi.fn().mockResolvedValue(undefined);
export const dbInsertMock = vi.fn(() => ({ values: dbInsertValuesMock }));
export const findFirstShortUrlMock = vi.fn();

// Referenced from src/test/setup.ts's vi.mock("#/db", ...) factory. Vitest
// only allows a hoisted factory to reference outside variables whose name
// starts with "mock", so this object (not the individual fns above) is
// what gets imported there.
export const mockDb = {
	insert: dbInsertMock,
	query: {
		shortUrl: {
			findFirst: findFirstShortUrlMock,
		},
	},
};

export function resetDbMocks() {
	dbInsertMock.mockClear();
	dbInsertValuesMock.mockReset().mockResolvedValue(undefined);
	findFirstShortUrlMock.mockReset();
}
