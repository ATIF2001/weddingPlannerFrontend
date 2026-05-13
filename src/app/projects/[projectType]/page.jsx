import ProjectsPage from "../../../page-components/ProjectsPage";
import { SITE_URL } from "../../../config/site";
import { buildPageMetadata, fetchProjectBySlugServer, fetchProjectsServer } from "../../lib/seo";

const VALID_PROJECT_TYPES = new Set(["corporate", "wedding", "outdoor"]);

export async function generateMetadata({ params }) {
  const routeParams = await params;
  const projectType = routeParams?.projectType || "corporate";
  const lowerType = String(projectType).toLowerCase();
  if (!VALID_PROJECT_TYPES.has(lowerType) && lowerType !== "coporate") {
    const project = await fetchProjectBySlugServer(projectType);
    if (project?.slug) {
      const typeFromProject = String(project.category || "corporate").toLowerCase();
      return buildPageMetadata({
        path: `/projects/${typeFromProject}/${project.slug}`,
        titleKey: "seo.projects.title",
        descriptionKey: "seo.projects.description",
        keywordsKey: "seo.projectDetail.keywords",
        defaults: {
          title: `${project.title} | MK Wedding Planner`,
          description: project.description || "Project gallery by MK Wedding Planner",
          keywords: "event project details, wedding portfolio, event execution",
        },
      });
    }
  }
  const normalized = String(projectType).toLowerCase() === "coporate" ? "corporate" : String(projectType).toLowerCase();
  const titleType = normalized.charAt(0).toUpperCase() + normalized.slice(1);
  const base = await buildPageMetadata({
    path: `/projects/${projectType}`,
    titleKey: "seo.projects.title",
    descriptionKey: "seo.projects.description",
    keywordsKey: "seo.projects.keywords",
    defaults: {
      title: "Projects | MK Wedding Planner",
      description: "Explore wedding, corporate, and outdoor event projects by MK Wedding Planner.",
      keywords: "event gallery, wedding projects, corporate event portfolio, outdoor event design",
    },
  });
  return {
    ...base,
    title: `${titleType} Projects | MK Wedding Planner`,
    alternates: { canonical: `${SITE_URL}/projects/${projectType}` },
  };
}

export default async function Page({ params }) {
  const routeParams = await params;
  const projectType = routeParams?.projectType || "corporate";
  const lowerType = String(projectType).toLowerCase();
  if (!VALID_PROJECT_TYPES.has(lowerType) && lowerType !== "coporate") {
    const initialProject = await fetchProjectBySlugServer(projectType);
    if (initialProject?.slug) {
      const projectCategory = String(initialProject.category || "corporate").toLowerCase();
      return <ProjectsPage forcedType={projectCategory} initialProject={initialProject} projectSlug={initialProject.slug} />;
    }
  }
  const normalized = String(projectType).toLowerCase() === "coporate" ? "corporate" : String(projectType).toLowerCase();
  const initialProjects = await fetchProjectsServer(normalized);
  return <ProjectsPage forcedType={normalized} initialProjects={initialProjects} />;
}

