import { posterFor, videoFor, type Project } from "@/content/portfolio";
import { VideoMedia } from "./video-media";

type ProjectCardProps = {
  project: Project;
  /** "stage" = Featured tier (larger, autoplays in view). "grid" = Library. */
  mode?: "stage" | "grid";
  /** Shown only in the Featured tier, where rank is meaningful. */
  index?: number;
};

export function ProjectCard({ project, mode = "grid", index }: ProjectCardProps) {
  return (
    <article className="group min-w-0">
      <div className="aspect-[9/16] overflow-hidden rounded-lg bg-stage-raised">
        <VideoMedia
          file={project.file}
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
            {project.category}
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
