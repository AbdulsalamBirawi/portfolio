/**
 * Single source of truth for every piece of CV content.
 * Both the 3D arcade stations and /resume render from this file.
 */

export const profile = {
  name: "Abdalsalam Al Birawi",
  title: "Senior Front-end Developer",
  tagline: "React · Next.js · TypeScript",
  summary:
    "Software engineer with strong experience in problem solving and UI/UX, always striving to become a better web developer. Friendly, professional, able to work alone or in groups, and under pressure.",
  location: "Aleppo, Syria",
  email: "abdalsalamalbirawi@gmail.com",
  phone: "+963 932583562",
  linkedin: "https://www.linkedin.com/in/abdalsalam-albirawi",
  portfolioHandle: "abdalsalam_albirawi",
} as const;

export type Job = {
  company: string;
  role: string;
  location: string;
  period: string;
  start: string;
  bullets: { title: string; body: string }[];
};

export const experience: Job[] = [
  {
    company: "Authentica, T2",
    role: "Senior Front-end Developer",
    location: "Riyadh, KSA",
    period: "1/2026 – present",
    start: "2026",
    bullets: [
      {
        title: "Architectural redesign & development",
        body: "Took ownership of features end-to-end, spearheading an architectural redesign to resolve core limitations in scalability and long-term maintainability. Architected the frontend using Next.js 14 and TypeScript, with Redux Toolkit for robust state management.",
      },
      {
        title: "High-quality, responsive interfaces",
        body: "Developed user-centric interfaces that perform reliably across web platforms. Standardised UI/UX using MUI for a modern, responsive and accessible interface, focused on professional-grade product quality.",
      },
      {
        title: "API integration & automation",
        body: "Integrated multi-channel APIs (SMS, Email, Voice, WhatsApp, Nafath), streamlining communication workflows and implementing automation in verification logic.",
      },
    ],
  },
  {
    company: "MOOLA, T2",
    role: "Front-end Developer",
    location: "Riyadh, KSA",
    period: "8/2024 – 1/2026",
    start: "2024",
    bullets: [
      {
        title: "Scalable fintech platforms",
        body: "Engineered scalable financial platforms using Next.js with strong proficiency in JavaScript and React.js, supporting real-time operations for expense management and corporate card issuance.",
      },
      {
        title: "Mobile-first & intuitive experiences",
        body: "Built mobile-first, consumer-facing applications with intuitive interfaces, delivering seamless user experiences.",
      },
      {
        title: "Data integration & API proficiency",
        body: "Integrated complex APIs to automate financial workflows such as expense approvals and transaction categorisation, ensuring reliable experiences.",
      },
    ],
  },
  {
    company: "Growth Hacker",
    role: "Front-end Developer",
    location: "Montreal, Canada",
    period: "6/2023 – 8/2024",
    start: "2023",
    bullets: [
      {
        title: "User interface design excellence",
        body: "Spearheaded the development of intuitive and visually appealing user interfaces, incorporating industry best practices and standards, noticeably enhancing the overall user experience.",
      },
      {
        title: "Front-end performance optimisation",
        body: "Played a pivotal role in optimising front-end performance through efficient coding practices, substantially decreasing page load times and improving responsiveness across devices.",
      },
    ],
  },
  {
    company: "Uplink",
    role: "Front-end Developer",
    location: "Remote",
    period: "6/2021 – 6/2023",
    start: "2021",
    bullets: [
      {
        title: "Production system maintenance",
        body: "Debugged and maintained live production systems at scale, using advanced profiling tools (Chrome DevTools, React DevTools) to address performance bottlenecks.",
      },
      {
        title: "React best practices & optimisation",
        body: "Applied React best practices, implemented code splitting and optimised rendering for a 20% reduction in page load times.",
      },
      {
        title: "Collaborative workflow",
        body: "Used modern frontend tooling (Jira for task tracking) to maintain Agile workflows and collaborate with cross-functional teams for timely deliveries.",
      },
    ],
  },
  {
    company: "Craft Code",
    role: "Front-end Developer",
    location: "Syria",
    period: "2/2020 – 5/2021",
    start: "2020",
    bullets: [
      {
        title: "Foundation in web development",
        body: "Acquired a robust foundation in web development, honing essential skills in HTML, CSS and JavaScript.",
      },
      {
        title: "Responsive design & usability",
        body: "Applied the principles of responsive design and accessibility, laying the groundwork for a strong understanding of user-centric development.",
      },
    ],
  },
];

export type Skill = { name: string; level: number };

export const skills: {
  proficient: Skill[];
  familiar: Skill[];
} = {
  proficient: [
    { name: "React", level: 95 },
    { name: "Next.js", level: 92 },
    { name: "TypeScript", level: 90 },
    { name: "JavaScript", level: 93 },
    { name: "React Native", level: 82 },
    { name: "Angular", level: 70 },
  ],
  familiar: [
    { name: "Node.js", level: 60 },
    { name: "Express.js", level: 58 },
    { name: "Python", level: 52 },
    { name: "C++", level: 50 },
    { name: "Java", level: 45 },
  ],
};

export const education = {
  school: "Aleppo University",
  degree: "Bachelor in Software Engineering",
  period: "Sep 2017 – Sep 2022",
};

export const awards = [
  {
    title: "Best graduation project in the faculty",
    detail:
      "Graded 98% and nominated for the Syrian national competition for best projects.",
  },
  {
    title: "Imagine Foundation",
    detail: "Recommendation letter.",
  },
];

export const languages = [
  { name: "Arabic", level: "Native", value: 100 },
  { name: "English", level: "Fluent", value: 85 },
  { name: "German", level: "A1, beginner", value: 20 },
];

export const references = [
  {
    name: "Abdel Rahman Bashir",
    role: "Technical Lead, Growth Hacker",
    email: "a.bashir@growth-hacker.ca",
  },
  {
    name: "Faris Shahateet",
    role: "Technical Lead, MOOLA",
    email: "f.shahateet@moolapay.io",
  },
];

/** Total years of professional front-end experience, used as the arcade "score". */
export const yearsOfExperience = 6;
