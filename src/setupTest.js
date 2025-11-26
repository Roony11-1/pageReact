import '@testing-library/jest-dom'
import { expect } from "vitest";
import { beforeAll } from "vitest";

beforeAll(() => {
  vi.setConfig({ testTimeout: 10000 });
});