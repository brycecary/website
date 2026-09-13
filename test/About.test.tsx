import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import About from "../src/pages/About";

describe("About", () => {
    it("renders the heading and blurb", () => {
        render(<About />);
        expect(screen.getByRole("heading", { name: "About Me", level: 1 })).toBeInTheDocument();
        expect(screen.getByText(/Software Engineer, Linux user, Amateur Radio Operator/)).toBeInTheDocument();
    });
});
