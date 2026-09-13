import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "../src/App";

describe("App", () => {
    it("renders the banner", () => {
        render(<App />);
        const banner = screen.getByAltText("Bryce Cary");
        expect(banner).toBeInTheDocument();
        expect(banner).toHaveAttribute("src", expect.stringContaining("banner_v2_blue.png"));
    });

    it("renders every section", () => {
        render(<App />);
        expect(screen.getByRole("heading", { name: "About Me" })).toBeInTheDocument();
        expect(screen.getByRole("heading", { name: "Projects" })).toBeInTheDocument();
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
});
