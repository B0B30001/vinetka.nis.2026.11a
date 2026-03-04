/* ------------------------------------------------------------------ */
/*  School / Class configuration – single source of truth (MVP)       */
/*  Replace with DB calls when scaling beyond a handful of schools.   */
/* ------------------------------------------------------------------ */

export interface Scene {
  id: string;
  title: string;
  /** percentage 0–100, left offset on the map image */
  mapX: number;
  /** percentage 0–100, top offset on the map image */
  mapY: number;
  /** path relative to /public */
  panorama: string;
  /** initial camera direction (degrees) */
  yaw?: number;
  pitch?: number;
  hfov?: number;
}

export interface ClassConfig {
  schoolSlug: string;
  classSlug: string;
  schoolName: string;
  className: string;
  /** Optional hero image shown on the landing page */
  heroImage?: string;
  /** Map image used on the tour page (relative to /public) */
  mapImage: string;
  scenes: Scene[];
  /** Optional accent colour (CSS value) */
  accent?: string;
  /** Per-class password override – falls back to TOUR_PASSWORD env */
  password?: string;
}

export interface SchoolConfig {
  slug: string;
  name: string;
  classes: ClassConfig[];
}

/* ------------------------------------------------------------------ */
/*  Demo data – two schools, three classes                            */
/* ------------------------------------------------------------------ */

const schools: SchoolConfig[] = [
  {
    slug: "nis-almaty",
    name: "Nazarbayev Intellectual School — Almaty",
    classes: [
      {
        schoolSlug: "nis-almaty",
        classSlug: "2026-11a",
        schoolName: "NIS Almaty",
        className: "Class of 2026 · 11A",
        heroImage: "/images/hero-placeholder.svg",
        mapImage: "/maps/demo-school.svg",
        accent: "#2563eb",
        scenes: [
          {
            id: "entrance",
            title: "Main Entrance",
            mapX: 50,
            mapY: 88,
            panorama: "/panos/demo/outside.svg",
            yaw: 0,
            pitch: 0,
            hfov: 110,
          },
          {
            id: "corridor",
            title: "Corridor",
            mapX: 50,
            mapY: 62,
            panorama: "/panos/demo/corridor.svg",
            yaw: 90,
          },
          {
            id: "cafeteria",
            title: "Cafeteria",
            mapX: 22,
            mapY: 40,
            panorama: "/panos/demo/cafeteria.svg",
          },
          {
            id: "gym",
            title: "Gymnasium",
            mapX: 78,
            mapY: 40,
            panorama: "/panos/demo/gym.svg",
          },
          {
            id: "classroom",
            title: "Classroom 11-A",
            mapX: 50,
            mapY: 18,
            panorama: "/panos/demo/classroom.svg",
            yaw: -30,
            pitch: 5,
          },
        ],
      },
      {
        schoolSlug: "nis-almaty",
        classSlug: "2026-11b",
        schoolName: "NIS Almaty",
        className: "Class of 2026 · 11B",
        mapImage: "/maps/demo-school.svg",
        scenes: [
          {
            id: "entrance",
            title: "Main Entrance",
            mapX: 50,
            mapY: 88,
            panorama: "/panos/demo/outside.svg",
          },
          {
            id: "classroom",
            title: "Classroom 11-B",
            mapX: 50,
            mapY: 18,
            panorama: "/panos/demo/classroom.svg",
          },
        ],
      },
    ],
  },
  {
    slug: "bil-astana",
    name: "Bilim Innovation Lyceum — Astana",
    classes: [
      {
        schoolSlug: "bil-astana",
        classSlug: "2025-11g",
        schoolName: "BIL Astana",
        className: "Class of 2025 · 11G",
        mapImage: "/maps/demo-school.svg",
        accent: "#9333ea",
        scenes: [
          {
            id: "entrance",
            title: "Front Gate",
            mapX: 50,
            mapY: 90,
            panorama: "/panos/demo/outside.svg",
          },
          {
            id: "cafeteria",
            title: "Dining Hall",
            mapX: 30,
            mapY: 45,
            panorama: "/panos/demo/cafeteria.svg",
          },
          {
            id: "gym",
            title: "Sports Hall",
            mapX: 70,
            mapY: 45,
            panorama: "/panos/demo/gym.svg",
          },
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Lookup helpers                                                    */
/* ------------------------------------------------------------------ */

export function getSchool(schoolSlug: string): SchoolConfig | undefined {
  return schools.find((s) => s.slug === schoolSlug);
}

export function getClassConfig(
  schoolSlug: string,
  classSlug: string,
): ClassConfig | undefined {
  const school = getSchool(schoolSlug);
  return school?.classes.find((c) => c.classSlug === classSlug);
}

export function getAllClassParams(): { schoolSlug: string; classSlug: string }[] {
  return schools.flatMap((s) =>
    s.classes.map((c) => ({ schoolSlug: s.slug, classSlug: c.classSlug })),
  );
}

export default schools;
