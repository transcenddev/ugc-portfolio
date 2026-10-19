import type { CSSProperties } from "react";
import { aspectValue, posterFor, videoFor, VIDEO_BASE, type Project } from "@/content/portfolio";
import { VideoMedia } from "./video-media";

type ProjectCardProps = {
  project: Project;
  /** "stage" = Featured tier (larger, autoplays in view). "grid" = Library. */
  mode?: "stage" | "grid";
  /** Shown only in the Featured tier, where rank is meaningful. */
  index?: number;
  /**
   * Position in the grid, used to stagger the reveal animation. Past the
   * first few tiles the delay stops growing, so a long list still settles
   * quickly instead of trickling in.
   */
  revealIndex?: number;
};

/** Longest stagger applied before every tile shares the same delay. */
const MAX_STAGGER_STEPS = 8;

export function ProjectCard({
  project,
  mode = "grid",
  index,
  revealIndex,
}: ProjectCardProps) {
  const revealStyle =
    typeof revealIndex === "number"
      ? ({
          animationDelay: `${Math.min(revealIndex, MAX_STAGGER_STEPS) * 28}ms`,
        } as CSSProperties)
      : undefined;

  return (
    <article
      className={`group min-w-0 ${
        typeof revealIndex === "number" ? "tile tile-reveal" : "tile"
      }`}
      style={revealStyle}
    >
      <div
        className="overflow-hidden rounded-lg bg-stage-raised"
        style={{ aspectRatio: aspectValue(project.aspect) }}
      >
        <VideoMedia
          file={project.file}
          fallbackSrc={`${VIDEO_BASE}/${project.file}`}
          label={project.title}
          mode={mode}
          poster={posterFor(project.file)}
          src={videoFor(project.file)}
        />
      </div>

      <div className="mt-3 flex items-baseline gap-3">
        {typeof index === "number" && (
          <span className="meta shrink-0 text-stage-muted">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
        <div className="min-w-0">
          <h3
            className={`text-stage-text ${
              mode === "stage"
                ? "text-base font-medium sm:text-lg"
                : "text-sm font-medium"
            }`}
          >
            {project.title}
          </h3>
          <p className="meta mt-1.5 text-stage-muted">
            {project.group ?? project.category}
            {project.brand && (
              <>
                <span aria-hidden="true"> · </span>
                <span className="text-stage-text">{project.brand}</span>
              </>
            )}
          </p>
        </div>
      </div>
    </article>
  );
}
