import { describe, expect, it } from "vitest";
import theme from "../src/theme";

describe("theme", () => {
    it("is the dark brand theme", () => {
        expect(theme.palette.mode).toBe("dark");
        expect(theme.palette.primary.main).toBe("#2d79be");
        expect(theme.palette.background.paper).toBe("#040710");
    });
});
