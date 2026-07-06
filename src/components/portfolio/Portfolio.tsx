import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const NAV = [
  { href: "#top", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#work", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("#top");
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "pt-3" : "pt-6"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4">
        <a
          href="#top"
          className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-4 py-2 text-sm font-semibold tracking-tight backdrop-blur-xl"
        >
          <span className="inline-block h-2 w-2 rounded-full bg-white" />
          Alex Carter
        </a>
        <nav className="hidden rounded-full border border-border bg-background/60 p-1.5 backdrop-blur-xl md:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => {
              const isActive = active === n.href;
              return (
                <li key={n.href} className="relative">
                  <a
                    href={n.href}
                    className={`relative z-10 inline-flex rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${
                      isActive ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-primary"
                        transition={{ type: "spring", stiffness: 400, damping: 34 }}
                      />
                    )}
                    {n.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
        <a
          href="#contact"
          className="hidden items-center gap-1.5 rounded-full border border-border bg-background/60 px-4 py-2 text-xs font-medium backdrop-blur-xl transition-colors hover:bg-secondary md:inline-flex"
        >
          Hire me
          <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, 80]);

  return (
    <section id="top" className="relative overflow-hidden pt-44 pb-40">
      {/* Premium grid + vignette backdrop */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 opacity-[0.07]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          maskImage:
            "radial-gradient(ellipse at center, black 40%, transparent 75%)",
        }}
      />
      <motion.div
        style={{ y }}
        className="pointer-events-none absolute inset-0 -z-10 opacity-60"
      >
        <div className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.05] blur-3xl" />
      </motion.div>

      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={container}
          className="max-w-4xl"
        >
          <motion.div variants={fadeUp} className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-1.5 text-xs text-muted-foreground backdrop-blur">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
            </span>
            Available for new opportunities
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="text-5xl font-semibold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Full stack developer
            <br />
            <span className="italic font-light text-muted-foreground">crafting</span>{" "}
            <span className="text-muted-foreground">quiet software.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground"
          >
            I&apos;m Alex — a software engineer with 6+ years of experience shipping
            performant web products end-to-end with TypeScript, React, Node, and
            Postgres.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-[0_10px_40px_-10px_rgba(255,255,255,0.25)] transition-transform hover:scale-[1.03]"
            >
              View projects
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur transition-colors hover:bg-secondary"
            >
              Contact me
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-20 flex flex-wrap items-center gap-x-10 gap-y-4 text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            <span>Previously at</span>
            <span className="text-foreground/70">Vault Financial</span>
            <span className="text-foreground/70">Northwind Labs</span>
            <span className="text-foreground/70">Mesa Digital</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Section({
  id,
  eyebrow,
  title,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-border py-28">
      <div className="mx-auto max-w-6xl px-6">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={container}
          className="mb-16 flex flex-col gap-4"
        >
          <motion.span
            variants={fadeUp}
            className="text-xs uppercase tracking-[0.2em] text-muted-foreground"
          >
            {eyebrow}
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl"
          >
            {title}
          </motion.h2>
        </motion.div>
        {children}
      </div>
    </section>
  );
}

function About() {
  return (
    <Section id="about" eyebrow="About" title="Engineer, systems thinker, and quiet perfectionist.">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="grid gap-12 md:grid-cols-3"
      >
        <motion.p variants={fadeUp} className="text-lg leading-relaxed text-muted-foreground md:col-span-2">
          I care about the details other people don&apos;t notice — the empty state
          that finally makes sense, the query that shaved 400ms off checkout, the
          animation curve that just feels right. I&apos;ve helped early stage
          startups and Fortune 500 teams ship products used by millions.
        </motion.p>
        <motion.div variants={fadeUp} className="space-y-6">
          {[
            { k: "6+", v: "Years experience" },
            { k: "40+", v: "Projects shipped" },
            { k: "12", v: "Companies served" },
          ].map((s) => (
            <div key={s.v} className="flex items-baseline justify-between border-b border-border pb-4">
              <span className="text-3xl font-semibold">{s.k}</span>
              <span className="text-sm text-muted-foreground">{s.v}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </Section>
  );
}

type SkillCategory = {
  title: string;
  skills: { name: string; pct: number }[];
};

const SKILL_GROUPS: SkillCategory[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", pct: 98 },
      { name: "TypeScript", pct: 95 },
      { name: "Tailwind CSS", pct: 95 },
      { name: "TanStack Router / Query", pct: 90 },
      { name: "Framer Motion", pct: 88 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js / Express", pct: 96 },
      { name: "tRPC / GraphQL", pct: 90 },
      { name: "PostgreSQL", pct: 92 },
      { name: "Redis", pct: 85 },
      { name: "Prisma / Drizzle", pct: 90 },
    ],
  },
  {
    title: "DevOps & Infra",
    skills: [
      { name: "AWS", pct: 88 },
      { name: "Docker", pct: 90 },
      { name: "Cloudflare / Vercel", pct: 92 },
      { name: "GitHub Actions", pct: 88 },
      { name: "Terraform", pct: 82 },
    ],
  },
  {
    title: "Tools & Others",
    skills: [
      { name: "Git", pct: 96 },
      { name: "Figma", pct: 85 },
      { name: "Vite / Turborepo", pct: 92 },
      { name: "Playwright / Vitest", pct: 90 },
      { name: "Linux / Shell", pct: 88 },
    ],
  },
];

function SkillBar({ name, pct }: { name: string; pct: number }) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-xs tabular-nums text-muted-foreground">{pct}%</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] as const, delay: 0.15 }}
          className="h-full rounded-full bg-white"
        />
      </div>
    </div>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Skills" title="Technologies I work with every day.">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="grid gap-8 md:grid-cols-2"
      >
        {SKILL_GROUPS.map((group) => (
          <motion.div
            key={group.title}
            variants={fadeUp}
            className="rounded-2xl border border-border bg-card/40 p-6 backdrop-blur"
          >
            <h3 className="mb-6 text-sm font-medium uppercase tracking-widest text-muted-foreground">
              {group.title}
            </h3>
            <div className="space-y-5">
              {group.skills.map((s) => (
                <SkillBar key={s.name} name={s.name} pct={s.pct} />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  );
}

const PROJECTS = [
  {
    year: "2025",
    title: "Ledger",
    tag: "Fintech · SaaS",
    desc: "Modern accounting platform with realtime double-entry ledger, receipt OCR, and multi-currency support for global teams.",
    stack: ["TypeScript", "Next.js", "Postgres", "AWS"],
  },
  {
    year: "2024",
    title: "Northwind CRM",
    tag: "B2B · Enterprise",
    desc: "Rebuilt a legacy CRM into a snappy React app used daily by 3,000+ sales reps, cutting page loads by 68%.",
    stack: ["React", "tRPC", "Drizzle", "Redis"],
  },
  {
    year: "2024",
    title: "Halo Studio",
    tag: "Design tool",
    desc: "Collaborative vector editor with realtime multiplayer, custom CRDT engine, and sub-16ms interaction latency.",
    stack: ["Canvas", "WASM", "Cloudflare", "Rust"],
  },
  {
    year: "2023",
    title: "Field Ops",
    tag: "Logistics",
    desc: "Offline-first mobile web app for utility crews. Syncs work orders across spotty rural networks without data loss.",
    stack: ["PWA", "IndexedDB", "Node", "GraphQL"],
  },
];

function Work() {
  return (
    <Section id="work" eyebrow="Selected work" title="A few things I&#39;m proud of.">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="grid gap-6 md:grid-cols-2"
      >
        {PROJECTS.map((p) => (
          <motion.a
            key={p.title}
            href="#"
            variants={fadeUp}
            whileHover={{ y: -6 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border bg-card/40 p-8 backdrop-blur transition-colors hover:border-white/25 hover:bg-card/60"
          >
            <div>
              <div className="mb-8 flex items-center justify-between text-xs text-muted-foreground">
                <span>{p.tag}</span>
                <span>{p.year}</span>
              </div>
              <h3 className="mb-4 flex items-center justify-between text-3xl font-semibold tracking-tight">
                {p.title}
                <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground" />
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
            <div className="mt-10 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </motion.div>
    </Section>
  );
}

const EXPERIENCE = [
  {
    role: "Senior Full Stack Engineer",
    company: "Vault Financial",
    period: "2023 — Present",
    desc: "Leading the platform team behind Vault&apos;s core ledger. Owning architecture, hiring, and rollout across 4 markets.",
  },
  {
    role: "Full Stack Engineer",
    company: "Northwind Labs",
    period: "2021 — 2023",
    desc: "Shipped the CRM rewrite from monolith to modular React + tRPC, and built the design system used by 6 product teams.",
  },
  {
    role: "Software Engineer",
    company: "Mesa Digital (Consultancy)",
    period: "2019 — 2021",
    desc: "Delivered products for early stage founders — from MVP to Series A — across fintech, health, and marketplaces.",
  },
  {
    role: "Junior Developer",
    company: "Freelance",
    period: "2018 — 2019",
    desc: "Built websites and internal tools for small businesses while studying computer science.",
  },
];

function Experience() {
  return (
    <Section id="experience" eyebrow="Experience" title="A steady, deliberate path.">
      <motion.ol
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        variants={container}
        className="relative border-l border-border"
      >
        {EXPERIENCE.map((e) => (
          <motion.li key={e.role + e.period} variants={fadeUp} className="relative pl-8 pb-12 last:pb-0">
            <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-white" />
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h3 className="text-xl font-medium">{e.role}</h3>
              <span className="text-sm text-muted-foreground">{e.period}</span>
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{e.company}</p>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              {e.desc}
            </p>
          </motion.li>
        ))}
      </motion.ol>
    </Section>
  );
}

function Contact() {
  return (
    <section id="contact" className="border-t border-border py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          variants={container}
        >
          <motion.span variants={fadeUp} className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Contact
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-4 text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
          >
            Let&apos;s build something
            <br />
            <span className="text-muted-foreground">worth using.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-xl text-lg text-muted-foreground"
          >
            I&apos;m open to senior full stack roles and select contract work.
            The fastest way to reach me is email.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href="mailto:hello@alexcarter.dev"
              className="inline-flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              <Mail className="h-4 w-4" />
              hello@alexcarter.dev
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-2xl border border-border bg-background px-6 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Download CV
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Alex Carter. Crafted with care.
        </p>
        <div className="flex items-center gap-2">
          {[
            { icon: Github, href: "#", label: "GitHub" },
            { icon: Linkedin, href: "#", label: "LinkedIn" },
            { icon: Twitter, href: "#", label: "Twitter" },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}

export function Portfolio() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Work />
      <Experience />
      <Contact />
      <Footer />
    </main>
  );
}