import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Projects from "../src/pages/Projects";

const EXPECTED = [
    { name: "Uptime", url: "https://adduptime.net", active: true },
    { name: "Deploy", url: "https://github.com/brycecary/Deploy", active: true },
    { name: "River Hawk Website", url: "https://riverhawkoa.org", active: true },
    { name: "Nentico Lodge 12 Website", url: "https://nentico.org", active: true },
    { name: "FRC Robot Software", url: "https://github.com/cavineers", active: false },
];

describe("Projects", () => {
    it("renders the heading", () => {
        render(<Projects />);
        expect(screen.getByRole("heading", { name: "Projects", level: 1 })).toBeInTheDocument();
    });

    it.each(EXPECTED)("renders $name", ({ name }) => {
        render(<Projects />);
        expect(screen.getByRole("heading", { name })).toBeInTheDocument();
    });

    it("gives every project an external View link", () => {
        render(<Projects />);
        const links = screen.getAllByRole("link", { name: /View/ });
        expect(links).toHaveLength(EXPECTED.length);
        for (const link of links) {
            expect(link).toHaveAttribute("target", "_blank");
        }
        expect(links.map((l) => l.getAttribute("href"))).toEqual(EXPECTED.map((p) => p.url));
    });

    it("marks each project active or inactive", () => {
        render(<Projects />);
        expect(screen.getAllByText("Active")).toHaveLength(EXPECTED.filter((p) => p.active).length);
        expect(screen.getAllByText("Inactive")).toHaveLength(EXPECTED.filter((p) => !p.active).length);
    });

    it("renders the tag chips for a project", () => {
        render(<Projects />);
        const heading = screen.getByRole("heading", { name: "Uptime" });
        const card = heading.closest(".MuiPaper-root") as HTMLElement;
        for (const tag of ["Discord", "node", "JS/TS", "Postgres", "Docker"]) {
            expect(within(card).getByText(tag)).toBeInTheDocument();
        }
    });
});
