export const portfolioCategories = [
  "Fitness & Wellness",
  "Men's Grooming & Self-Care",
  "Lifestyle & Fashion",
  "Tech & Gadgets",
] as const;

export type PortfolioCategory =
  | (typeof portfolioCategories)[number]
  | "Content That Connects";

export type Project = {
  category: PortfolioCategory;
  /** Path relative to /assets/videos/browser-ready/ */
  file: string;
  title: string;
  /**
   * Only set when the collaboration is verifiable from the asset itself.
   * Never infer or invent a brand partner.
   */
  brand?: string;
  /** Hand-picked for the Featured tier. */
  featured?: boolean;
};

export const VIDEO_BASE = "/assets/videos/browser-ready";
export const POSTER_BASE = "/assets/posters";

/** Derives the generated first-frame poster path for a video file. */
export function posterFor(file: string): string {
  return `${POSTER_BASE}/${encodeURI(file.replace(/\.(mp4|mov)$/i, ".webp"))}`;
}

/** Full source URL for a video file. */
export function videoFor(file: string): string {
  return `${VIDEO_BASE}/${encodeURI(file)}`;
}

/** The single clip that introduces Reymar in the hero. */
export const heroReel = {
  file: "content_connects/my_story_why_i_started.mp4",
  title: "Why I started",
} as const;

export const projects: Project[] = [
  // ── Featured (hand-picked, strongest proof first) ──────────────
  {
    category: "Men's Grooming & Self-Care",
    file: "selfcare_mens_grooming/old_spice_swagger_invisible_stick_deodorant_antipersiperant.mp4",
    title: "Old Spice Swagger invisible stick",
    brand: "Old Spice",
    featured: true,
  },
  {
    category: "Fitness & Wellness",
    file: "fitness_wellness/how_to_start_working_out_as_skinny_guy.mp4",
    title: "Starting your fitness journey",
    featured: true,
  },
  {
    category: "Tech & Gadgets",
    file: "tech_gadgets_ai_tools/1hora_bluetooth_headset.mp4",
    title: "1HORA bluetooth headset",
    brand: "1HORA",
    featured: true,
  },

  // ── Content That Connects ──────────────────────────────────────
  {
    category: "Content That Connects",
    file: "content_connects/my_story_why_i_started.mp4",
    title: "Why I started",
  },
  {
    category: "Content That Connects",
    file: "content_connects/life_after_college_graduation.mp4",
    title: "Life after graduation",
  },
  {
    category: "Content That Connects",
    file: "content_connects/graduation_day.mp4",
    title: "Graduation day",
  },
  {
    category: "Content That Connects",
    file: "content_connects/ccl_community_anniversary_meetup.mp4",
    title: "Creator community meetup",
  },

  // ── Fitness & Wellness ────────────────────────────────────────
  {
    category: "Fitness & Wellness",
    file: "fitness_wellness/overnight_oats_recipe_for_lazy_peeps.mp4",
    title: "Overnight oats for busy mornings",
  },
  {
    category: "Fitness & Wellness",
    file: "fitness_wellness/how_to_cook_chicken_breast_in_air_fryer.mp4",
    title: "Chicken breast in the air fryer",
  },
  {
    category: "Fitness & Wellness",
    file: "fitness_wellness/overnight_oats_recipe_to_stay_lean_as_broke_college_student.mp4",
    title: "Blended overnight oats",
  },
  // {
  //   category: "Fitness & Wellness",
  //   file: "content_connects/my_story_why_i_started.mp4",
  //   title: "Why I started working out",
  // },

  // ── Men's Grooming & Self-Care ────────────────────────────────
  {
    category: "Men's Grooming & Self-Care",
    file: "selfcare_mens_grooming/skincare.mp4",
    title: "Simple skincare routine",
  },
  {
    category: "Men's Grooming & Self-Care",
    file: "selfcare_mens_grooming/wavy_hair_routine.mp4",
    title: "Taking care of wavy hair",
  },
  {
    category: "Men's Grooming & Self-Care",
    file: "selfcare_mens_grooming/lipcare.mp4",
    title: "Everyday lip care",
  },
  {
    category: "Men's Grooming & Self-Care",
    file: "selfcare_mens_grooming/haircut_mullet.mp4",
    title: "The mullet refresh",
  },
  {
    category: "Men's Grooming & Self-Care",
    file: "selfcare_mens_grooming/old_spice_swagger_invisible_stick_deodorant_antipersiperant.mp4",
    title: "Old Spice Swagger invisible stick",
    brand: "Old Spice",
  },

  //   category: "Men's Grooming & Self-Care",
  // file: "selfcare_mens_grooming/old_spice_swagger_invisible_stick_deodorant_antipersiperant.mp4",
  // title: "Old Spice Swagger invisible stick",
  // brand: "Old Spice",
  // featured: true,

  // ── Lifestyle & Fashion ───────────────────────────────────────
  {
    category: "Lifestyle & Fashion",
    file: "fashion_lifestyle_apparrel_accessories/fit_check_all_black_shirt_pants_mullet_eyeglasses_reymar.mp4",
    title: "Black tee + dark gray pants",
  },
  {
    category: "Lifestyle & Fashion",
    file: "fashion_lifestyle_apparrel_accessories/black_or_white_compression_shirt_reymar.mp4",
    title: "Black or white compression?",
  },
  {
    category: "Lifestyle & Fashion",
    file: "fashion_lifestyle_apparrel_accessories/fit_check_all_grey_hoodie_pants_stairs_metropolitan_museum_of_manila_reymar_2.mp4",
    title: "All-gray fit",
  },
  {
    category: "Lifestyle & Fashion",
    file: "fashion_lifestyle_apparrel_accessories/fit_check_grey_hoodie_baggy_pants.mp4",
    title: "Grey hoodie + baggy jeans + beanie",
  },

  // ── Tech & Gadgets ────────────────────────────────────────────
  {
    category: "Tech & Gadgets",
    file: "tech_gadgets_ai_tools/gojodoq_earbuds.mp4",
    title: "Budget wireless earbuds",
    brand: "Goojodoq",
  },
  {
    category: "Tech & Gadgets",
    file: "tech_gadgets_ai_tools/pc_laptop_iphone_cleanup_tool.mp4",
    title: "Clean storage pc, laptop & iPhone",
  },
  {
    category: "Tech & Gadgets",
    file: "tech_gadgets_ai_tools/auto_file_sorting_in_google_drive_using_zapier.mp4",
    title: "Auto-sorting files Google Drive with Zapier",
  },
  {
    category: "Tech & Gadgets",
    file: "tech_gadgets_ai_tools/cs_tech_internship_sp_madrid.mp4",
    title: "My tech internship",
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
export const contentConnectsProjects = projects.filter(
  (project) => project.category === "Content That Connects",
);
export const libraryProjects = projects.filter(
  (project) =>
    !project.featured && project.category !== "Content That Connects",
);

export const services = [
  {
    title: "Short-Form UGC",
    description:
      "Vertical videos combining relatable hooks, storytelling, and natural product integration.",
  },
  {
    title: "Talking-Head Videos",
    description:
      "On-camera reviews, testimonials, and product explanations delivered in a natural, conversational style.",
  },
  {
    title: "Product Demos & Unboxings",
    description:
      "Hands-on videos showing your product, its features, packaging, and how it fits into everyday life.",
  },
  {
    title: "Lifestyle B-Roll",
    description:
      "Cinematic product and lifestyle footage shot in real-life settings for social media, ads, and brand storytelling.",
  },
  {
    title: "Tutorials & How-To",
    description:
      "Step-by-step guides showing how your product works and how it can be used in everyday life.",
  },
];

export const processSteps = [
  {
    title: "Strategy",
    description:
      "Discuss ideas, expectations, concepts, and goals through email or a quick call.",
  },
  {
    title: "Creation",
    description: "Develop the concept, script, and video for approval.",
  },
  {
    title: "Edits",
    description: "Incorporate your feedback and make the agreed revisions.",
  },
  {
    title: "Delivery",
    description: "Hand off approved files on schedule.",
  },
];

export const contactDetails = {
  email: "2049rare@gmail.com",
  handle: "@2049rae",
  location: "Cavite, Philippines",
  calendly: "https://calendly.com/2049rare/30min",
};
