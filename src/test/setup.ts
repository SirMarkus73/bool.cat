import { vi } from "vitest";
import { mockDb } from "./mocks/db";

// Global test doubles for the app's real I/O boundaries. Runs before every
// test file, so individual tests never redeclare these — they just import
// the mock fns from src/test/mocks/* and configure return values.
vi.mock("#/db", () => ({ db: mockDb }));
vi.mock("#/db/schema", () => ({ shortUrl: {} }));
