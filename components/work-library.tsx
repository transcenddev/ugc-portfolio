"use client";

import { useMemo, useState } from "react";
import {
  libraryProjects,
  portfolioCategories,
  type PortfolioCategory,
} from "@/content/portfolio";
import { ProjectCard } from "./project-card";

type Filter = PortfolioCategory | "All";

const filters: Filter[] = ["All", ...portfolioCategories];

export function WorkLibrary() {
  const [active, setActive] = useState<Filter>("All");

  const counts = useMemo(() => {
    const map = new Map<Filter, number>([["All", libraryProjects.length]]);
    for (const category of portfolioCategories) {
      map.set(
        category,
        libraryProjects.filter((project) => project.category === category).length,
      );
    }
    return map;
  }, []);

  const visible = useMemo(
    () =>
      active === "All"
        ? libraryProjects
        : libraryProjects.filter((project) => project.category === active),
    [active],
  );

  return (
    <section className="border-t border-stage-line bg-stage" id="work">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:max-w-7xl lg:px-10">
        <p className="eyebrow text-stage-muted">The full library</p>
        <h2 className="display-l mt-4 text-stage-text">
          Everything, by category.
        </h2>

        {/* Filters. Horizontally scrollable on mobile rather than wrapping. */}
        <div
          aria-label="Filter work by category"
          className="-mx-5 mt-8 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
          role="group"
        >
          {filters.map((filter) => {
            const isActive = filter === active;
            const count = counts.get(filter) ?? 0;
            if (count === 0) return null;

            return (
              <button
                aria-pressed={isActive}
                className={`meta shrink-0 rounded-full border px-4 py-2 transition-colors ${
                  isActive
                    ? "border-accent bg-accent text-white"
                    : "border-stage-line text-stage-muted hover:border-stage-muted hover:text-stage-text"
                }`}
                key={filter}
                onClick={() => setActive(filter)}
                type="button"
              >
                {filter}
                <span aria-hidden="true" className="ml-2 opacity-60">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4">
          {visible.map((project) => (
            <ProjectCard key={project.file} mode="grid" project={project} />
          ))}
        </div>

        <p aria-live="polite" className="meta mt-10 text-stage-muted">
          Showing {visible.length} of {libraryProjects.length}
        </p>
      </div>
    </section>
  );
}
