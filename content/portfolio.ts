export const portfolioCategories = [
  "Fitness & Wellness",
  "Men's Grooming & Self-Care",
  "Lifestyle & Fashion",
  "Tech & Gadgets",
  "Travel",
  "Content That Connects",
] as const;

export type PortfolioCategory = (typeof portfolioCategories)[number];

/**
 * Second-level grouping inside a single large category. Only Fitness & Wellness
 * is split today; every other category stays flat and needs no group.
 */
export const projectGroups = [
  "Getting Started",
  "Running",
  "Calisthenics & Gym",
  "Nutrition",
  "Recovery & Supplements",
] as const;

export type ProjectGroup = (typeof projectGroups)[number];

export type AspectRatio = "9/16" | "16/9" | "4/3";

export type Project = {
  category: PortfolioCategory;
  /** Narrows a large category without removing clips from the library. */
  group?: ProjectGroup;
  /** Frame shape. Defaults to "9/16"; tag reviews/B-roll as 16:9 and
   *  digicam lifestyle as 4/3 so the grid shows each clip at its true ratio
   *  instead of letterboxing or cropping it. */
  aspect?: AspectRatio;
  /** Path relative to /assets/videos/browser-ready/ */
  file: string;
  title: string;
  /**
   * Only set when the collaboration is verifiable from the asset itself.
   * Never infer or invent a brand partner.
   */
  brand?: string;
  /**
   * Hand-picked for the Selected Work spotlight at the top of the page.
   * Spotlit clips still appear in the full library below.
   */
  featured?: boolean;
  /**
   * Kept in the data but excluded from every rendered list. Use for
   * near-duplicate clips rather than commenting them out, so the entry stays
   * valid and one word brings it back.
   */
  hidden?: boolean;
};

/**
 * Optional media origin. Unset in local dev, so every asset resolves to the
 * local /assets path. On Vercel it points at the public Blob store, and the
 * same paths resolve there. NEXT_PUBLIC_ is required because client
 * components import this module and the value is inlined at build time.
 */
const ASSET_ORIGIN = process.env.NEXT_PUBLIC_ASSET_ORIGIN ?? "";

/**
 * Local asset prefixes that are mirrored into the Blob store, mapped to their
 * production Blob prefixes. The local `assets/` tree (and `browser-ready`) is
 * not part of the public URL.
 */
const BLOB_PATH_MAP: ReadonlyArray<readonly [local: string, blob: string]> = [
  ["/assets/videos/browser-ready/", "/videos/"],
  ["/assets/testimonials/", "/videos/testimonials/"],
];

/**
 * Prefixes a root-relative asset path with the configured media origin. When
 * NEXT_PUBLIC_ASSET_ORIGIN is unset the path is returned unchanged, so local
 * development keeps serving from /assets. When it is set, migrated media paths
 * are rewritten to the Blob layout; any other asset keeps its path.
 */
export function assetUrl(path: string): string {
  if (!ASSET_ORIGIN) {
    return path;
  }
  for (const [localPrefix, blobPrefix] of BLOB_PATH_MAP) {
    if (path.startsWith(localPrefix)) {
      return `${ASSET_ORIGIN}${blobPrefix}${path.slice(localPrefix.length)}`;
    }
  }
  return `${ASSET_ORIGIN}${path}`;
}

export const VIDEO_BASE = "/assets/videos/browser-ready";
export const POSTER_BASE = "/assets/posters";

/** Derives the generated first-frame poster path for a video file. */
export function posterFor(file: string): string {
  return `${POSTER_BASE}/${encodeURI(file.replace(/\.(mp4|mov)$/i, ".webp"))}`;
}

/** Full source URL for a video file. */
export function videoFor(file: string): string {
  return assetUrl(`${VIDEO_BASE}/${encodeURI(file)}`);
}

/** Maps a project's `aspect` to the CSS value used by `aspectRatio:`. */
export function aspectValue(aspect?: AspectRatio): string {
  return aspect ?? "9/16";
}

/** The single clip that introduces Reymar in the hero. */
export const heroReel = {
  file: "content_connects/my_story_why_i_started.mp4",
  title: "Why I started",
} as const;

export const projects: Project[] = [
  // ── Content That Connects ──────────────────────────────────────
  // The first four are spotlit in Selected Work.
  {
    category: "Content That Connects",
    file: "content_connects/my_story_why_i_started.mp4",
    title: "Why I started",
    featured: true,
  },
  {
    category: "Content That Connects",
    file: "content_connects/life_after_college_graduation.mp4",
    title: "Life after graduation",
    featured: true,
  },
  {
    category: "Content That Connects",
    file: "content_connects/graduation_day.mp4",
    title: "Graduation day",
    featured: true,
  },
  {
    category: "Content That Connects",
    file: "content_connects/ccl_community_anniversary_meetup.mp4",
    title: "Creator community meetup",
    featured: true,
  },
  {
    category: "Content That Connects",
    file: "content_connects/day_in_my_life.mp4",
    title: "A day in my life",
  },
  {
    category: "Content That Connects",
    file: "content_connects/early_20s_crisis_brolls.mp4",
    title: "The early-20s crisis",
  },
  {
    category: "Content That Connects",
    file: "content_connects/people_need_your_level_1_story.mp4",
    title: "People need your level 1 story",
  },
  {
    category: "Content That Connects",
    file: "tech_gadgets_ai_tools/final_thesis_defense_day.mp4",
    title: "Thesis defense day",
    aspect: "16/9",
  },

  // ── Fitness & Wellness ────────────────────────────────────────
  // Getting started
  {
    category: "Fitness & Wellness",
    group: "Getting Started",
    file: "fitness_wellness/how_to_start_working_out_as_skinny_guy.mp4",
    title: "Starting your fitness journey",
  },
  // Running
  {
    category: "Fitness & Wellness",
    group: "Running",
    file: "fitness_wellness/how_to_start_running_beginner.mp4",
    title: "Starting to run from zero",
  },
  {
    category: "Fitness & Wellness",
    group: "Running",
    file: "fitness_wellness/feeling_shy_running_tips.mp4",
    title: "Too shy to run outside",
  },
  {
    category: "Fitness & Wellness",
    group: "Running",
    file: "fitness_wellness/10k_running_forest_beach_cow_butterfly_reymar.mp4",
    title: "10K through forest and beach",
  },
  {
    category: "Fitness & Wellness",
    group: "Running",
    file: "fitness_wellness/running_sunset_night_beach_people_fisherman_kids.mp4",
    title: "Sunset run on the beach",
  },
  {
    category: "Fitness & Wellness",
    group: "Running",
    file: "fitness_wellness/running_rain_reymar.mp4",
    title: "A run in the rain",
  },
  {
    category: "Fitness & Wellness",
    group: "Running",
    file: "fitness_wellness/running_night_road_naic_gulod_dodi_reymar_edit.mp4",
    title: "Night run on the road",
  },

  // Calisthenics & gym
  {
    category: "Fitness & Wellness",
    group: "Calisthenics & Gym",
    file: "fitness_wellness/clean_handstand_press_90_degree_hold_beach_sunset_reymar.mp4",
    title: "Handstand press at sunset",
  },
  {
    category: "Fitness & Wellness",
    group: "Calisthenics & Gym",
    file: "fitness_wellness/lsit_handstand_90_degree_hold.mp4",
    title: "L-sit to 90-degree hold",
    // Near-duplicate of "Handstand press at sunset".
    // hidden: true,
  },
  {
    category: "Fitness & Wellness",
    group: "Calisthenics & Gym",
    file: "fitness_wellness/pull_calisthenic_skill_home_gym_qc_reymar_walk_people_complimenting.mp4",
    title: "Calisthenics at the home gym",
  },
  {
    category: "Fitness & Wellness",
    group: "Calisthenics & Gym",
    file: "fitness_wellness/wooden_paralletes_equipment_for_calisthenics.mp4",
    title: "Wooden parallettes for calisthenics",
  },
  {
    category: "Fitness & Wellness",
    group: "Calisthenics & Gym",
    file: "fitness_wellness/pushup_tutorial.mp4",
    title: "Push-up form, step by step",
  },
  {
    category: "Fitness & Wellness",
    group: "Calisthenics & Gym",
    file: "fitness_wellness/pushup_board_pushups.mp4",
    title: "Push-up board session",
    // Near-duplicate of "Push-up form, step by step".
    hidden: true,
  },
  {
    category: "Fitness & Wellness",
    group: "Calisthenics & Gym",
    file: "fitness_wellness/kettle_bell_beginner_workout.mp4",
    title: "Beginner kettlebell workout",
  },
  {
    category: "Fitness & Wellness",
    group: "Calisthenics & Gym",
    file: "fitness_wellness/dumbbell_romanian_deadlift_tutorial_equipments.mp4",
    title: "Romanian deadlift tutorial",
  },
  {
    category: "Fitness & Wellness",
    group: "Calisthenics & Gym",
    file: "fitness_wellness/2024-06-03_db_bicep_curl_gym_black_compression_mullet_reymar.mp4",
    title: "Dumbbell curls at the gym",
  },
  {
    category: "Fitness & Wellness",
    group: "Calisthenics & Gym",
    file: "fitness_wellness/2024-06-18_mma_punching_bag_boxing_v2_fitness_gym_reymar_edit.mp4",
    title: "Heavy bag rounds",
  },
  {
    category: "Fitness & Wellness",
    group: "Calisthenics & Gym",
    file: "fitness_wellness/foot_pedal_workout.mp4",
    title: "Foot pedal cardio at home",
  },

  // Nutrition
  {
    category: "Fitness & Wellness",
    group: "Nutrition",
    file: "fitness_wellness/overnight_oats_recipe_for_lazy_peeps.mp4",
    title: "Overnight oats for busy mornings",
  },
  {
    category: "Fitness & Wellness",
    group: "Nutrition",
    file: "fitness_wellness/how_to_cook_chicken_breast_in_air_fryer.mp4",
    title: "Chicken breast in the air fryer",
  },
  {
    category: "Fitness & Wellness",
    group: "Nutrition",
    file: "fitness_wellness/overnight_oats_recipe_to_stay_lean_as_broke_college_student.mp4",
    title: "Blended overnight oats",
    // Near-duplicate of "Overnight oats for busy mornings".
    // hidden: true,
  },
  {
    category: "Fitness & Wellness",
    group: "Nutrition",
    file: "fitness_wellness/overnight_oats_whey_protein_athlene_review.mp4",
    title: "Athlene whey in overnight oats",
    brand: "Athlene",
  },
  {
    category: "Fitness & Wellness",
    group: "Nutrition",
    file: "fitness_wellness/everything_make_with_5kg_oats.mp4",
    title: "Everything I make with 5kg of oats",
  },
  {
    category: "Fitness & Wellness",
    group: "Nutrition",
    file: "content_connects/where_i_bought_5kg_oats_export1.mp4",
    title: "Where I buy oats in bulk",
  },
  {
    category: "Fitness & Wellness",
    group: "Nutrition",
    file: "fitness_wellness/oats_before_running_preworkout_meal.mp4",
    title: "Oats before a run",
  },
  {
    category: "Fitness & Wellness",
    group: "Nutrition",
    file: "fitness_wellness/quick_instant_oatmeal_for_bulking_peeps_with_no_time.mp4",
    title: "Instant oatmeal for bulking",
  },
  {
    category: "Fitness & Wellness",
    group: "Nutrition",
    file: "fitness_wellness/how_to_track_food.mp4",
    title: "How I track my food",
  },
  {
    category: "Fitness & Wellness",
    group: "Nutrition",
    file: "fitness_wellness/how_to_know_calorie_target_tdee_using_cronometer.mp4",
    title: "Finding your calorie target",
  },

  // Recovery & supplements
  {
    category: "Fitness & Wellness",
    group: "Recovery & Supplements",
    file: "fitness_wellness/before_after_creatine_transformation.mp4",
    title: "Creatine, before and after",
  },
  {
    category: "Fitness & Wellness",
    group: "Recovery & Supplements",
    file: "fitness_wellness/yyanst_glucosamine_chondroitin_tumeric_msm_for_joints.mp4",
    title: "Joint support supplement",
    brand: "YYANST",
  },
  {
    category: "Fitness & Wellness",
    group: "Recovery & Supplements",
    file: "fitness_wellness/cold_remedies.mp4",
    title: "What I take for a cold",
  },

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
    file: "selfcare_mens_grooming/haircut_transformation.mp4",
    title: "Haircut transformation",
    // Near-duplicate of "The mullet refresh".
    // hidden: true,
  },
  {
    category: "Men's Grooming & Self-Care",
    file: "selfcare_mens_grooming/bandana_tutorial_hair_style.mp4",
    title: "Styling hair with a bandana",
  },
  {
    category: "Men's Grooming & Self-Care",
    file: "selfcare_mens_grooming/hairdryer_yoole.mp4",
    title: "Blow-drying with the Yoole dryer",
    brand: "Yoole",
  },
  {
    category: "Men's Grooming & Self-Care",
    file: "selfcare_mens_grooming/facial_hair_clean_shave_echen_electric_razor.mp4",
    title: "Clean shave with an electric razor",
    brand: "Echen",
  },
  {
    category: "Men's Grooming & Self-Care",
    file: "selfcare_mens_grooming/before_after_braces_adjustment.mp4",
    title: "Braces adjustment day",
  },
  {
    category: "Men's Grooming & Self-Care",
    file: "selfcare_mens_grooming/old_spice_swagger_invisible_stick_deodorant_antipersiperant.mp4",
    title: "Old Spice Swagger invisible stick",
    brand: "Old Spice",
  },
  {
    category: "Men's Grooming & Self-Care",
    file: "selfcare_mens_grooming/from_tawas_roll_on_deodorant_to_old_spice_swagger_story.mp4",
    title: "From tawas to Old Spice",
    brand: "Old Spice",
  },

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
    // Near-duplicate of "All-gray fit".
    // hidden: true,
  },
  {
    category: "Lifestyle & Fashion",
    file: "content_connects/temporary_tattoo_zoar_magic.mp4",
    title: "Trying a temporary tattoo",
    aspect: "16/9",
    brand: "Zoar Magic",
  },

  // ── Tech & Gadgets ────────────────────────────────────────────
  {
    category: "Tech & Gadgets",
    file: "tech_gadgets_ai_tools/1hora_bluetooth_headset.mp4",
    title: "1HORA bluetooth headset",
    brand: "1HORA",
  },
  {
    category: "Tech & Gadgets",
    file: "tech_gadgets_ai_tools/gojodoq_earbuds.mp4",
    title: "Budget wireless earbuds",
    brand: "Goojodoq",
  },
  {
    category: "Tech & Gadgets",
    file: "tech_gadgets_ai_tools/game_controller_gamesir_nova_lite_unboxing_review.mp4",
    title: "GameSir Nova Lite unboxing",
    brand: "GameSir",
  },
  {
    category: "Tech & Gadgets",
    file: "tech_gadgets_ai_tools/unboxing_iem_tangzu_waner_sg.mp4",
    title: "Wired IEM unboxing",
    brand: "TANGZU",
  },
  {
    category: "Tech & Gadgets",
    file: "tech_gadgets_ai_tools/thermalright_paste_cpu.mp4",
    title: "Repasting a CPU",
    brand: "Thermalright",
  },
  {
    category: "Tech & Gadgets",
    file: "tech_gadgets_ai_tools/my_pc_got_broken_fix_laptop.mp4",
    title: "When my PC broke",
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
    file: "tech_gadgets_ai_tools/what_editing_app_i_used_instagram_edits.mp4",
    title: "The app I edit with",
  },
  {
    category: "Tech & Gadgets",
    file: "tech_gadgets_ai_tools/cs_tech_internship_sp_madrid.mp4",
    title: "My tech internship",
  },

  // ── Travel ────────────────────────────────────────────────────
  {
    category: "Travel",
    file: "travel/metropolitan_museum.mp4",
    title: "A day at the Metropolitan Museum",
    // aspect: "4/3",
  },
  {
    category: "Travel",
    file: "travel/venice_grand_canal_manila_edit.mp4",
    title: "Venice Grand Canal, Manila",
    // aspect: "4/3",
  },
  {
    category: "Travel",
    file: "content_connects/ccl_community_anniversary_meetup.mp4",
    title: "Creator community meetup",
    // Duplicate of the Content That Connects entry.
    // hidden: true,
  },
];

/** Spotlit at the top of the page in Selected Work. */
export const featuredProjects = projects.filter(
  (project) => project.featured && !project.hidden,
);

/** "Everything, by category" — the library is the complete set. */
export const libraryProjects = projects.filter((project) => !project.hidden);

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
  phone: "+63 966 987 9402",
  phoneHref: "tel:+639669879402",
  calendly: "https://calendly.com/2049rare/30min",
};
