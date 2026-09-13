import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Contact from "../src/pages/Contact";

const EXPECTED = [
    { name: "contact@brycecary.dev", url: "mailto:contact@brycecary.dev" },
    { name: "GitHub", url: "https://github.com/brycecary" },
    { name: "X", url: "https://x.com/brycecary_" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/bryce-cary/" },
];

describe("Contact", () => {
    it("renders every contact link", () => {
        render(<Contact />);
        const links = screen.getAllByRole("link");
        expect(links).toHaveLength(EXPECTED.length);
        expect(links.map((l) => l.getAttribute("href"))).toEqual(EXPECTED.map((c) => c.url));
    });

    it("opens links in a new tab", () => {
        render(<Contact />);
        for (const link of screen.getAllByRole("link")) {
            expect(link).toHaveAttribute("target", "_blank");
        }
    });

    it("labels each link for screen readers and tooltips", () => {
        render(<Contact />);
        for (const { name } of EXPECTED) {
            expect(screen.getByLabelText(name)).toBeInTheDocument();
        }
    });
});
