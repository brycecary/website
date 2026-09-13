import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Copyright from "../src/components/Copyright";

describe("Copyright", () => {
    it("shows the current year", () => {
        render(<Copyright />);
        expect(screen.getByText(`© ${new Date().getFullYear()} Bryce Cary`)).toBeInTheDocument();
    });

    it("is a footer landmark", () => {
        render(<Copyright />);
        expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    });
});
