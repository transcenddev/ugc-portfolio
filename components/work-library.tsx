"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import {
  libraryProjects,
  portfolioCategories,
  type PortfolioCategory,
  type ProjectGroup,
} from "@/content/portfolio";
import { ProjectCard } from "./project-card";

type Filter = PortfolioCategory | "All";
type GroupFilter = ProjectGroup | "All";

const filters: Filter[] = ["All", ...portfolioCategories];

/**
 * Tiles rendered before the visitor asks for more. Keeps the initial grid
 * scannable while the count line still advertises the full library.
 */
const COLLAPSED_COUNT = 12;

export function WorkLibrary() {
  const [active, setActive] = useState<Filter>("All");
  const [activeGroup, setActiveGroup] = useState<GroupFilter>("All");
  const [isExpanded, setIsExpanded] = useState(false);

  // Reflect filters in the URL so a filtered view is shareable.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get("c");
    const group = params.get("g");
    if (
      category &&
      (category === "All" ||
        portfolioCategories.includes(category as PortfolioCategory))
    ) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time read of filters from the URL on mount
      setActive(category as Filter);
    }
    if (group) setActiveGroup(group as GroupFilter);
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (active === "All") params.delete("c");
    else params.set("c", active);
    if (activeGroup === "All") params.delete("g");
    else params.set("g", activeGroup);
    const query = params.toString();
    window.history.replaceState(
      null,
      "",
      query ? `${window.location.pathname}?${query}` : window.location.pathname,
    );
  }, [active, activeGroup]);

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

  /** In-category items, before the group filter narrows them further. */
  const inCategory = useMemo(
    () =>
      active === "All"
        ? libraryProjects
        : libraryProjects.filter((project) => project.category === active),
    [active],
  );

  /**
   * Groups present in the active category. A category with one or no group
   * gets no second row, so this stays empty for most filters.
   */
  const groups = useMemo(() => {
    const present = new Set(
      inCategory
        .map((project) => project.group)
        .filter((group): group is ProjectGroup => Boolean(group)),
    );
    return present.size > 1 ? [...present] : [];
  }, [inCategory]);

  const groupCounts = useMemo(() => {
    const map = new Map<GroupFilter, number>();
    for (const group of groups) {
      map.set(
        group,
        inCategory.filter((project) => project.group === group).length,
      );
    }
    return map;
  }, [groups, inCategory]);

  const filtered = useMemo(
    () =>
      groups.length > 0 && activeGroup !== "All"
        ? inCategory.filter((project) => project.group === activeGroup)
        : inCategory,
    [groups.length, inCategory, activeGroup],
  );

  // A new filter or group is a fresh start — collapse back to the short grid.
  // Re-filtering re-renders up to 68 tiles, so it runs as a transition to keep
  // the clicked chip responsive.
  const selectCategory = (filter: Filter) => {
    setActive(filter);
    setActiveGroup("All");
    startTransition(() => setIsExpanded(false));
  };

  const selectGroup = (group: GroupFilter) => {
    setActiveGroup(group);
    startTransition(() => setIsExpanded(false));
  };

  const visible =
    isExpanded || filtered.length <= COLLAPSED_COUNT
      ? filtered
      : filtered.slice(0, COLLAPSED_COUNT);

  return (
    <section
      className="border-t border-stage-line bg-stage"
      id="work"
      tabIndex={-1}
    >
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
                className={`meta shrink-0 rounded-full border px-4 py-2 transition-colors active:scale-95 ${
                  isActive
                    ? "border-accent bg-accent text-white"
                    : "border-stage-line text-stage-muted hover:border-stage-muted hover:text-stage-text"
                }`}
                key={filter}
                onClick={() => selectCategory(filter)}
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

        {/* Second level, only for categories that are actually split. */}
        {groups.length > 0 && (
          <div
            aria-label={`Narrow ${active} by type`}
            className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
            role="group"
          >
            {(["All", ...groups] as GroupFilter[]).map((group) => {
              const isActive = group === activeGroup;
              const count =
                group === "All"
                  ? inCategory.length
                  : (groupCounts.get(group) ?? 0);

              return (
                <button
                  aria-pressed={isActive}
                  className={`meta shrink-0 rounded-full px-3 py-1.5 transition-colors active:scale-95 ${
                    isActive
                      ? "bg-stage-text text-stage"
                      : "text-stage-muted hover:text-stage-text"
                  }`}
                  key={group}
                  onClick={() => selectGroup(group)}
                  type="button"
                >
                  {group}
                  <span aria-hidden="true" className="ml-2 opacity-60">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Newly mounted tiles fade in via `.tile-reveal`; no height
            transition, so expanding never re-lays-out the whole grid. */}
        <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-4">
          {visible.map((project, index) => (
            <ProjectCard
              key={`${project.category}/${project.group ?? ""}/${project.file}`}
              mode="grid"
              project={project}
              revealIndex={index}
            />
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p aria-live="polite" className="meta text-stage-muted">
            Showing {visible.length} of {filtered.length}
          </p>

          {filtered.length > COLLAPSED_COUNT && (
            <button
              aria-expanded={isExpanded}
              className="meta shrink-0 rounded-full border border-stage-line px-4 py-2 text-stage-text transition-colors hover:border-stage-muted"
              onClick={() => setIsExpanded((previous) => !previous)}
              type="button"
            >
              {isExpanded
                ? "Show less"
                : `Show all ${filtered.length}`}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
