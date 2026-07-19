// Personal site config. Single source of truth for name, contact and socials.
export const site = {
  name: "Christopher Manzano Vimos",
  role: "Data Scientist & AI Engineer",
  tagline:
    "I design, build and operate production AI systems end to end — from architecture to deployment.",
  location: "Madrid, Spain",
  email: "christopher.manzano.vimos@gmail.com",
  // Social handles — leave blank ("") to hide.
  socials: {
    github: "chriss1245",
    linkedin: "christopher-manzano-vimos",
  },
  // Path (in /public) to a downloadable CV PDF; leave "" to hide the button.
  cvPdf: "/christopher-manzano-vimos-cv.pdf",
  domain: "manapple.dev",
};

export type Site = typeof site;
