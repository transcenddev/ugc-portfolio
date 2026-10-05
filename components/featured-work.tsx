import { contentConnectsProjects } from "@/content/portfolio";
import { ProjectCard } from "./project-card";

export function FeaturedWork() {
  return (
    <section className="bg-stage" id="featured">
      <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24 lg:max-w-7xl lg:px-10">
        <div className="flex flex-col gap-4 border-b border-stage-line pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow text-stage-muted">Selected Work</p>
            <h2 className="display-l mt-4 text-stage-text">
              Content That Got Me Noticed
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-6 text-stage-muted">
            Stories, milestones, and everyday moments that show the person
            behind the content.
          </p>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {contentConnectsProjects.map((project, index) => (
            <ProjectCard
              index={index}
              key={project.file}
              mode="stage"
              project={project}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
