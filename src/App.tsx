import { useState, useEffect } from "react";

// Types
interface Project {
  id: string;
  title: string;
  category: "FEATURED" | "MOBILE" | "DESKTOP" | "DATABASE";
  status: "ACTIVE" | "COMPLETED" | "OPEN SOURCE";
  shortDesc: string;
  fullDesc: string;
  tech: string[];
  features: string[];
  githubUrl: string;
  demoUrl?: string;
}

// Data
const PROJECTS_DATA: Project[] = [
  {
    id: "green-guardian",
    title: "GREEN GUARDIAN",
    category: "FEATURED",
    status: "ACTIVE",
    shortDesc: "Comprehensive environmental monitoring & sustainability tracking suite built for real-time ecological data analytics.",
    fullDesc: "Green Guardian is a flagship cross-platform initiative engineered to monitor, analyze, and visualize environmental metric data. Designed with clean modular architecture, it helps users track carbon footprints, energy consumption, and local air quality indexes using reactive visualizations.",
    tech: ["DART", "NODE.JS", "REST API"],
    features: [
      "Real-time eco-metric telemetry streaming",
      "Interactive data visualizations & trend analysis",
      "Cross-platform responsive client interface",
      "Automated carbon footprint calculation engine"
    ],
    githubUrl: "https://github.com/afraz-bot"
  },
  {
    id: "iut-dbms",
    title: "IUT ACADEMIC DBMS",
    category: "DATABASE",
    status: "COMPLETED",
    shortDesc: "Relational database management engine designed for academic record processing, course registration, and schema optimizations.",
    fullDesc: "Engineered as part of the core Database Systems curriculum at IUT. Features complex relational schema design, custom SQL stored procedures, views, triggers, and query performance benchmarking using enterprise relational database engines.",
    tech: ["ORACLE DB", "POSTGRESQL", "PL/SQL", "DATABASE DESIGN", "ERD"],
    features: [
      "Normalized 3NF relational schema architecture",
      "Automated triggers for course prerequisite verification",
      "Complex analytical queries and performance indexing",
      "Transaction management and ACID compliance enforcement"
    ],
    githubUrl: "https://github.com/afraz-bot"
  },
  {
    id: "javafx-suite",
    title: "JAVAFX DESKTOP SUITE",
    category: "DESKTOP",
    status: "COMPLETED",
    shortDesc: "High-performance modular desktop application featuring custom JavaFX UI components, multi-threading, and persistent data caching.",
    fullDesc: "A robust desktop utility created using JavaFX and Object-Oriented Software Design patterns. Demonstrates asynchronous task execution, custom CSS styling skinning, and local SQLite data synchronization for seamless desktop UX.",
    tech: ["JAVA", "JAVAFX", "SQLITE", "OOP", "CSS3"],
    features: [
      "Custom skinning with dark-mode aesthetic UI controls",
      "Multi-threaded background worker task execution",
      "Local relational database integration via JDBC",
      "Clean MVC design pattern implementation"
    ],
    githubUrl: "https://github.com/afraz-bot"
  },
  {
    id: "flutter-mobile",
    title: "FLUTTER UTILITIES APP",
    category: "MOBILE",
    status: "COMPLETED",
    shortDesc: "Reactive cross-platform mobile utility built with Flutter, focused on slick animations, state management, and offline-first persistence.",
    fullDesc: "A mobile application highlighting Flutter state management capabilities. Implements clean architecture principles, offline data caching, smooth micro-animations, and dynamic theme customization.",
    tech: ["FLUTTER", "DART", "PROVIDER / BLOC", "SHARED PREFERENCES", "REACTIVE UI"],
    features: [
      "Responsive layout optimized for various screen ratios",
      "Offline-first local storage and state hydration",
      "Fluid micro-animations and custom canvas painting",
      "Unit and widget integration test suite"
    ],
    githubUrl: "https://github.com/afraz-bot"
  },
  {
    id: "ds-visualizer",
    title: "ALGORITHM & DS VISUALIZER",
    category: "FEATURED",
    status: "OPEN SOURCE",
    shortDesc: "Interactive web-based visualization tool for understanding sorting algorithms, binary search trees, and graph traversals.",
    fullDesc: "An educational visualizer designed to help computer science students intuitively grasp core algorithms. Step through sorting passes, DFS/BFS graph traversals, and dynamic tree balancing with real-time step control and speed adjustments.",
    tech: ["TYPESCRIPT", "REACT", "ALGORITHMS", "DATA STRUCTURES", "TAILWIND"],
    features: [
      "Step-by-step visual execution of sorting algorithms (Quick, Merge, Heap)",
      "Interactive graph vertex creation and traversal animations",
      "Execution time complexity & space complexity breakdown panel",
      "Custom array generator with randomized distribution modes"
    ],
    githubUrl: "https://github.com/afraz-bot"
  }
];

const SKILL_CATEGORIES = [
  {
    label: "LANGUAGES",
    items: [
      { name: "C / C++", level: "ADVANCED" },
      { name: "JAVA", level: "PROFICIENT" },
      { name: "DART", level: "INTERMEDIATE" },
      { name: "SQL", level: "INTERMEDIATE" },
      { name: "TYPESCRIPT", level: "INTERMEDIATE" }
    ]
  },
  {
    label: "FRAMEWORKS & LIBRARIES",
    items: [
      { name: "FLUTTER", level: "ACTIVE FOCUS" },
      { name: "JAVAFX", level: "DESKTOP" },
      { name: "REACT.JS", level: "WEB" },
      { name: "TAILWIND CSS V4", level: "STYLING" },
      { name: "NODE.JS", level: "BASIC BACKEND" }
    ]
  },
  {
    label: "DATABASES",
    items: [
      { name: "POSTGRESQL", level: "RELATIONAL" },
      { name: "ORACLE DB", level: "ENTERPRISE" },
      { name: "SQLITE", level: "EMBEDDED" }
    ]
  },
  {
    label: "SYSTEMS & TOOLS",
    items: [
      { name: "WINDOWS 11", level: "PRIMARY OS" },
      { name: "LINUX / BASH", level: "ENVIRONMENT" },
      { name: "GIT & GITHUB", level: "VERSION CONTROL" },
      { name: "VITE & TOOLING", level: "DEV ENVIRONMENT" }
    ]
  },
  {
    label: "CORE CS CONCEPTS",
    items: [
      { name: "DATA STRUCTURES", level: "FUNDAMENTALS" },
      { name: "ALGORITHMS", level: "PROBLEM SOLVING" },
      { name: "OBJECT-ORIENTED DESIGN", level: "ARCHITECTURE" },
      { name: "DATABASE SCHEMAS", level: "3NF DESIGN" }
    ]
  },
  {
    label: "INTERESTS & HOBBIES",
    items: [
      { name: "GAMING", level: "PASSION" },
      { name: "TECH READING", level: "CONTINUOUS LEARNING" },
      { name: "SYSTEMS PROGRAMMING", level: "EXPLORATION" }
    ]
  }
];

// Helper Icons
function EmailIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

// Toast Component
function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#0d0d0d] border border-[#00ff88] px-4 py-3 shadow-2xl animate-pulse">
      <div className="w-2 h-2 rounded-full bg-[#00ff88]" />
      <span className="font-mono text-xs text-[#e2e2e2] tracking-wider">{message}</span>
      <button onClick={onClose} className="text-[#666666] hover:text-[#00ff88] ml-2 text-xs">
        ✕
      </button>
    </div>
  );
}

// NavBar Component
function NavBar({ onTriggerToast }: { onTriggerToast: (msg: string) => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: "00 // ABOUT", href: "#about" },
    { label: "01 // PROJECTS", href: "#projects" },
    { label: "02 // SKILLS", href: "#skills" },
    { label: "03 // EDUCATION", href: "#education" },
    { label: "04 // CONTACT", href: "#contact" },
    { label: "05 // AI STACK", href: "#ai-stack" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#1a1a1a] bg-[#080808]/95 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <a href="#about" className="flex items-center gap-3 group">
          <span className="font-mono text-[#00ff88] text-base font-bold tracking-widest group-hover:text-white transition-colors">
            AA<span className="text-[#444444]">.</span>DEV
          </span>
          <span className="hidden sm:flex items-center gap-1.5 px-2 py-0.5 border border-[#1e1e1e] rounded-full bg-[#0d0d0d]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="font-mono text-[10px] text-[#888888]">IUT CSE '23</span>
          </span>
        </a>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-mono text-xs tracking-wider text-[#777777] hover:text-[#00ff88] transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => {
              navigator.clipboard.writeText("afraz.tazim@gmail.com");
              onTriggerToast("Email address copied to clipboard!");
            }}
            className="group flex items-center gap-2 border border-[#2a2a2a] hover:border-[#00ff88] px-3 py-1.5 transition-all duration-200 bg-[#0c0c0c] hover:bg-[#00ff88]/5"
          >
            <CopyIcon />
            <span className="font-mono text-xs tracking-widest text-[#aaaaaa] group-hover:text-[#00ff88]">
              GET EMAIL
            </span>
          </button>
        </div>

        <button
          className="lg:hidden font-mono text-xs text-[#aaaaaa] hover:text-[#00ff88] border border-[#222222] px-3 py-1.5"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "[ CLOSE ]" : "[ MENU ]"}
        </button>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-[#1a1a1a] bg-[#0a0a0a] px-6 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-mono text-xs tracking-widest text-[#888888] hover:text-[#00ff88] py-2 border-b border-[#141414] block"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex justify-between items-center">
            <span className="font-mono text-[10px] text-[#555555]">STUDENT ID: 230041225</span>
            <button
              onClick={() => {
                navigator.clipboard.writeText("afraz.tazim@gmail.com");
                onTriggerToast("Email address copied!");
                setMenuOpen(false);
              }}
              className="font-mono text-xs text-[#00ff88]"
            >
              COPY EMAIL
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

// Hero Section
function HeroSection({ onTriggerToast }: { onTriggerToast: (msg: string) => void }) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("afraz.tazim@gmail.com");
    setCopied(true);
    onTriggerToast("Copied afraz.tazim@gmail.com to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="about" className="min-h-screen flex flex-col justify-center pt-24 pb-16 px-6 relative bg-grid-pattern">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-8">
            <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-6 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[#00ff88]" />
              ISLAMIC UNIVERSITY OF TECHNOLOGY // OIC SUBSIDIARY
            </div>

            <h1 className="font-mono font-bold text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] tracking-tight text-[#e2e2e2]">
              AFRAZ
            </h1>
            <h1 className="font-mono font-bold text-[clamp(2.8rem,7vw,6.5rem)] leading-[0.95] tracking-tight text-[#00ff88] mb-8">
              AHMED
            </h1>

            <div className="font-mono text-xs sm:text-sm tracking-wider text-[#666666] mb-8 flex flex-wrap items-center gap-2 sm:gap-4 bg-[#0d0d0d] border border-[#1a1a1a] p-3 rounded-none max-w-3xl">
              <span className="text-[#00ff88] font-semibold">CS UNDERGRADUATE</span>
              <span className="text-[#333333]">/</span>
              <span>IUT DHAKA</span>
              <span className="text-[#333333]">/</span>
              <span>ID: 230041225</span>
            </div>

            <p className="font-sans text-[#a0a0a0] text-base sm:text-lg leading-relaxed max-w-2xl mb-10">
              Passionate Computer Science & Engineering student at the <strong className="text-white font-medium">Islamic University of Technology (IUT)</strong> in Dhaka, Bangladesh. Specializing in cross-platform desktop/mobile engineering, relational database optimization, and intuitive software architecture. Driven by building clean, scalable software solutions.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                onClick={handleCopyEmail}
                className="group flex items-center gap-2 bg-[#00ff88] hover:bg-[#00cc6a] text-[#080808] font-mono text-xs font-bold tracking-widest px-5 py-3 transition-all duration-200"
              >
                {copied ? <CheckIcon /> : <EmailIcon />}
                <span>{copied ? "EMAIL COPIED!" : "CONTACT ME"}</span>
              </button>

              <a
                href="https://github.com/afraz-bot"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 border border-[#2a2a2a] hover:border-[#00ff88] bg-[#0c0c0c] hover:bg-[#00ff88]/5 px-5 py-3 transition-all duration-200"
              >
                <GitHubIcon />
                <span className="font-mono text-xs tracking-widest text-[#cccccc] group-hover:text-[#00ff88]">
                  GITHUB
                </span>
                <ExternalLinkIcon />
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="border border-[#1f1f1f] bg-[#0a0a0a] p-5 relative overflow-hidden group hover:border-[#00ff88]/50 transition-colors">
              <div className="font-mono text-[10px] text-[#00ff88] tracking-widest mb-1">FEATURED PROJECT</div>
              <div className="font-mono text-xl font-bold text-[#ffffff] mb-1">GREEN GUARDIAN</div>
              <div className="font-sans text-xs text-[#888888] leading-relaxed">
                Eco-monitoring & real-time telemetry streaming application.
              </div>
            </div>

            <div className="border border-[#1f1f1f] bg-[#0a0a0a] p-5 relative overflow-hidden group hover:border-[#00ff88]/50 transition-colors">
              <div className="font-mono text-[10px] text-[#555555] tracking-widest mb-1">PRIMARY TECH STACK</div>
              <div className="font-mono text-lg font-bold text-[#e2e2e2] mb-1">FLUTTER / JAVAFX / POSTGRES</div>
              <div className="font-sans text-xs text-[#888888]">
                Cross-platform mobile, desktop applications & database schemas.
              </div>
            </div>

            <div className="border border-[#1f1f1f] bg-[#0a0a0a] p-5 relative overflow-hidden group hover:border-[#00ff88]/50 transition-colors">
              <div className="font-mono text-[10px] text-[#555555] tracking-widest mb-1">INSTITUTION</div>
              <div className="font-mono text-base font-bold text-[#00ff88] mb-1">IUT DHAKA</div>
              <div className="font-sans text-xs text-[#888888]">
                B.Sc. in Computer Science & Engineering undergrad student.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Project Detail Modal
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#0c0c0c] border border-[#00ff88] max-w-2xl w-full p-6 sm:p-8 space-y-6 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#666666] hover:text-[#00ff88] font-mono text-sm"
        >
          [ ✕ CLOSE ]
        </button>

        <div>
          <div className="flex items-center gap-3 mb-2">
            <span className="font-mono text-xs text-[#00ff88] border border-[#00ff88]/30 px-2 py-0.5">
              {project.category}
            </span>
            <span className="font-mono text-xs text-[#888888] border border-[#222222] px-2 py-0.5">
              {project.status}
            </span>
          </div>
          <h3 className="font-mono text-2xl font-bold text-white">{project.title}</h3>
        </div>

        <p className="font-sans text-sm text-[#aaaaaa] leading-relaxed">{project.fullDesc}</p>

        <div>
          <h4 className="font-mono text-xs text-[#00ff88] tracking-widest mb-3">KEY TECHNICAL SPECIFICATIONS</h4>
          <ul className="space-y-2">
            {project.features.map((feat, i) => (
              <li key={i} className="flex items-start gap-2.5 font-sans text-xs text-[#cccccc]">
                <span className="text-[#00ff88] font-mono mt-0.5">›</span>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-mono text-xs text-[#666666] tracking-widest mb-3">TECHNOLOGY STACK</h4>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span key={t} className="font-mono text-[11px] text-[#e2e2e2] bg-[#141414] border border-[#262626] px-2.5 py-1">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-4 border-t border-[#1a1a1a] flex justify-end gap-4">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#00ff88] text-[#080808] font-mono text-xs font-bold px-4 py-2 hover:bg-[#00cc6a] transition-colors"
          >
            <GitHubIcon />
            <span>VIEW CODE REPOSITORY</span>
          </a>
        </div>
      </div>
    </div>
  );
}

// Projects Section
function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ["ALL", "FEATURED", "MOBILE", "DESKTOP", "DATABASE"];

  const filteredProjects =
    selectedCategory === "ALL"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 px-6 border-t border-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-12">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest">01</span>
          <span className="flex-1 h-px bg-[#1a1a1a]" />
          <h2 className="font-mono text-xs tracking-widest text-[#666666]">FEATURED WORK & PROJECTS</h2>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-12 border-b border-[#1a1a1a] pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`font-mono text-xs px-4 py-2 border transition-all duration-150 ${
                selectedCategory === cat
                  ? "bg-[#00ff88] text-[#080808] border-[#00ff88] font-bold"
                  : "bg-[#0a0a0a] text-[#888888] border-[#1e1e1e] hover:border-[#00ff88]/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-[#0a0a0a] border border-[#1a1a1a] hover:border-[#00ff88]/60 p-6 flex flex-col justify-between transition-all duration-200 group relative"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="font-mono text-[10px] text-[#00ff88] tracking-wider border border-[#00ff88]/20 px-2 py-0.5">
                    {project.category}
                  </span>
                  <span className="font-mono text-[10px] text-[#666666] border border-[#1e1e1e] px-2 py-0.5">
                    {project.status}
                  </span>
                </div>

                <h3 className="font-mono text-lg font-bold text-[#e2e2e2] group-hover:text-[#00ff88] transition-colors mb-3">
                  {project.title}
                </h3>

                <p className="font-sans text-xs text-[#888888] leading-relaxed mb-6">
                  {project.shortDesc}
                </p>
              </div>

              <div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tech.slice(0, 4).map((t) => (
                    <span key={t} className="font-mono text-[10px] text-[#555555] bg-[#121212] px-2 py-0.5 border border-[#1c1c1c]">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-[#141414]">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="flex-1 font-mono text-xs text-[#cccccc] hover:text-[#00ff88] border border-[#222222] hover:border-[#00ff88] py-2 transition-colors text-center"
                  >
                    VIEW SPECS
                  </button>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-[#666666] hover:text-[#00ff88] border border-[#222222] hover:border-[#00ff88] transition-colors"
                  >
                    <GitHubIcon />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeModalProject && (
        <ProjectModal project={activeModalProject} onClose={() => setActiveModalProject(null)} />
      )}
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <section id="skills" className="py-24 px-6 border-t border-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4 flex-1">
            <span className="font-mono text-xs text-[#00ff88] tracking-widest">02</span>
            <span className="h-px bg-[#1a1a1a] flex-1 max-w-xs" />
            <h2 className="font-mono text-xs tracking-widest text-[#666666]">SKILLS & TECH MATRIX</h2>
          </div>

          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search skill or tool..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0d0d0d] border border-[#222222] focus:border-[#00ff88] px-3 py-2 text-xs font-mono text-[#e2e2e2] focus:outline-none placeholder-[#444444]"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES.map((cat) => {
            const filteredItems = cat.items.filter((item) =>
              item.name.toLowerCase().includes(searchTerm.toLowerCase())
            );

            if (searchTerm && filteredItems.length === 0) return null;

            return (
              <div key={cat.label} className="bg-[#0a0a0a] border border-[#1a1a1a] p-6 hover:border-[#222222] transition-colors">
                <div className="font-mono text-xs tracking-widest text-[#00ff88] mb-6 flex items-center justify-between">
                  <span>{cat.label}</span>
                  <span className="text-[10px] text-[#444444]">({filteredItems.length})</span>
                </div>
                <div className="space-y-3">
                  {filteredItems.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center justify-between border-b border-[#141414] pb-2 text-xs font-mono group"
                    >
                      <span className="text-[#cccccc] group-hover:text-[#00ff88] transition-colors">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-[#555555] border border-[#1c1c1c] px-2 py-0.5 bg-[#0f0f0f]">
                        {item.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Education Section
function EducationSection() {
  return (
    <section id="education" className="py-24 px-6 border-t border-[#111111] bg-[#070707]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest">03</span>
          <span className="flex-1 h-px bg-[#1a1a1a]" />
          <h2 className="font-mono text-xs tracking-widest text-[#666666]">ACADEMIC JOURNEY</h2>
        </div>

        <div className="border border-[#222222] bg-[#0a0a0a] p-8 sm:p-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-block font-mono text-xs text-[#00ff88] border border-[#00ff88]/30 px-3 py-1 bg-[#00ff88]/5">
                UNDERGRADUATE DEGREE PROGRAM
              </div>

              <div>
                <h3 className="font-mono text-2xl sm:text-3xl font-bold text-white mb-2">
                  ISLAMIC UNIVERSITY OF TECHNOLOGY (IUT)
                </h3>
                <p className="font-mono text-sm text-[#00ff88]">
                  Bachelor of Science in Computer Science and Engineering (B.Sc. in CSE)
                </p>
                <p className="font-mono text-xs text-[#666666] mt-1">
                  Dhaka, Bangladesh — Student ID: <span className="text-white">230041225</span>
                </p>
              </div>

              <p className="font-sans text-sm text-[#aaaaaa] leading-relaxed max-w-2xl">
                IUT is a premier technological university operating as a subsidiary organ of the Organisation of Islamic Cooperation (OIC). The CSE curriculum emphasizes algorithmic problem-solving, rigorous mathematical foundations, database engineering, and software system design.
              </p>

              <div>
                <h4 className="font-mono text-xs text-[#666666] tracking-widest mb-3">KEY COURSEWORK & ACADEMIC FOCUS</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Data Structures & Algorithms",
                    "Object-Oriented Programming (Java/C++)",
                    "Database Management Systems (Oracle/Postgres)",
                    "Software Engineering & Architecture",
                    "Discrete Mathematics",
                    "Digital Logic Design & Computer Org"
                  ].map((course) => (
                    <span
                      key={course}
                      className="font-mono text-xs text-[#cccccc] border border-[#222222] bg-[#111111] px-3 py-1.5"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-[#1e1e1e] pt-6 lg:pt-0 lg:pl-8 space-y-6">
              <div>
                <span className="font-mono text-[10px] text-[#555555] block mb-1">AFFILIATION</span>
                <span className="font-mono text-xs text-[#e2e2e2] font-semibold">
                  Organisation of Islamic Cooperation (OIC)
                </span>
              </div>

              <div>
                <span className="font-mono text-[10px] text-[#555555] block mb-1">LOCATION</span>
                <span className="font-mono text-xs text-[#e2e2e2]">Board Bazar, Gazipur, Dhaka</span>
              </div>

              <div>
                <span className="font-mono text-[10px] text-[#555555] block mb-1">DEPARTMENT</span>
                <span className="font-mono text-xs text-[#00ff88]">
                  Computer Science and Engineering (CSE)
                </span>
              </div>

              <div className="pt-4 border-t border-[#1a1a1a]">
                <a
                  href="https://www.iutoic-dhaka.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs text-[#888888] hover:text-[#00ff88] flex items-center gap-2"
                >
                  <span>VISIT IUT OFFICIAL PORTAL</span>
                  <ExternalLinkIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function ContactSection({ onTriggerToast }: { onTriggerToast: (msg: string) => void }) {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSentSuccess(true);
      onTriggerToast("Message simulated successfully! I will reach out soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1200);
  };

  return (
    <section id="contact" className="py-24 px-6 border-t border-[#111111]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest">04</span>
          <span className="flex-1 h-px bg-[#1a1a1a]" />
          <h2 className="font-mono text-xs tracking-widest text-[#666666]">GET IN TOUCH</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Info Column */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h3 className="font-mono text-3xl font-bold text-white mb-4">LET'S CONNECT</h3>
              <p className="font-sans text-sm text-[#aaaaaa] leading-relaxed">
                Whether you have a project in mind, want to discuss software engineering, or just talk about CS at IUT, feel free to drop a message!
              </p>
            </div>

            <div className="space-y-4 font-mono text-xs">
              <div className="border border-[#1e1e1e] p-4 bg-[#0a0a0a] flex items-center justify-between">
                <div>
                  <span className="text-[#555555] block text-[10px]">EMAIL ADDRESS</span>
                  <span className="text-[#00ff88] font-semibold">afraz.tazim@gmail.com</span>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText("afraz.tazim@gmail.com");
                    onTriggerToast("Copied email to clipboard!");
                  }}
                  className="text-[#aaaaaa] hover:text-[#00ff88] p-2 border border-[#222222]"
                >
                  <CopyIcon />
                </button>
              </div>

              <a
                href="https://github.com/afraz-bot"
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#1e1e1e] p-4 bg-[#0a0a0a] flex items-center justify-between hover:border-[#00ff88] transition-colors block"
              >
                <div>
                  <span className="text-[#555555] block text-[10px]">GITHUB REPOSITORY</span>
                  <span className="text-white font-semibold">github.com/afraz-bot</span>
                </div>
                <ExternalLinkIcon />
              </a>

              <div className="border border-[#1e1e1e] p-4 bg-[#0a0a0a]">
                <span className="text-[#555555] block text-[10px]">CURRENT LOCATION</span>
                <span className="text-[#cccccc]">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Right Message Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="bg-[#0a0a0a] border border-[#222222] p-6 sm:p-8 space-y-6">
              <div className="font-mono text-xs text-[#00ff88] tracking-wider mb-2">
                // SEND DIRECT MESSAGE
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block font-mono text-xs text-[#888888] mb-2">YOUR NAME *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="w-full bg-[#111111] border border-[#222222] focus:border-[#00ff88] px-4 py-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs text-[#888888] mb-2">YOUR EMAIL *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@example.com"
                    className="w-full bg-[#111111] border border-[#222222] focus:border-[#00ff88] px-4 py-3 text-xs font-mono text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-mono text-xs text-[#888888] mb-2">SUBJECT</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="Project Collaboration / General Inquiry"
                  className="w-full bg-[#111111] border border-[#222222] focus:border-[#00ff88] px-4 py-3 text-xs font-mono text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-mono text-xs text-[#888888] mb-2">MESSAGE *</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Type your message here..."
                  className="w-full bg-[#111111] border border-[#222222] focus:border-[#00ff88] px-4 py-3 text-xs font-mono text-white focus:outline-none resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="submit"
                  disabled={sending}
                  className="bg-[#00ff88] hover:bg-[#00cc6a] text-[#080808] font-mono text-xs font-bold px-6 py-3 transition-colors disabled:opacity-50"
                >
                  {sending ? "TRANSMITTING..." : "SEND MESSAGE"}
                </button>

                {sentSuccess && (
                  <span className="font-mono text-xs text-[#00ff88] flex items-center gap-1">
                    <CheckIcon /> SENT SUCCESSFULLY
                  </span>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

// AI Stack & Prompt Specs Component
function AISpecsSection({ onTriggerToast }: { onTriggerToast: (msg: string) => void }) {
  const [activePromptIndex, setActivePromptIndex] = useState(0);

  const aiTools = [
    {
      name: "FIGMA",
      role: "Design System & Interface Architecture",
      desc: "Used Figma Make to compose responsive layout components, design tokens, typography, and dark-mode color scales."
    },
    {
      name: "GEMINI AI",
      role: "Core Intelligence & System Logic",
      desc: "Powered by Google Gemini 3.6 Flash model for intelligent prompt reasoning, data structure design, and TypeScript logic."
    },
    {
      name: "ANTIGRAVITY",
      role: "Agentic Engineering & Automation",
      desc: "Google DeepMind's Antigravity agent executed multi-file edits, automated test builds, and GitHub Pages CI/CD workflow deployment."
    }
  ];

  const samplePrompts = [
    {
      title: "PROMPT 01 — FULL PORTFOLIO ARCHITECTURE",
      text: "Develop a high-tech developer portfolio web app for Afraz Ahmed, CS undergraduate at Islamic University of Technology (IUT), Dhaka (ID: 230041225). Use React 19, Tailwind CSS v4, dark cyber-minimalism aesthetic (#080808 background, #00ff88 neon green accents), featuring Green Guardian & IUT DBMS project specs, skills matrix, academic journey, and contact section."
    },
    {
      title: "PROMPT 02 — COMPONENT & TYPOGRAPHY STYLING",
      text: "Style a brutalist UI layout using JetBrains Mono and Outfit typography with crisp border dividers, toast notification system for quick email copying, modal drawers for project technical specifications, and interactive skill search filters."
    },
    {
      title: "PROMPT 03 — CI/CD & GITHUB PAGES DEPLOYMENT",
      text: "Configure relative asset base paths (/portfolio/) in vite.config.ts and set up automated gh-pages deployment scripts and GitHub Actions pipeline for live publishing on GitHub Pages."
    }
  ];

  return (
    <section id="ai-stack" className="py-24 px-6 border-t border-[#111111] bg-[#070707]">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest">05</span>
          <span className="flex-1 h-px bg-[#1a1a1a]" />
          <h2 className="font-mono text-xs tracking-widest text-[#666666]">AI CREATION STACK & SPECIFICATIONS</h2>
        </div>

        {/* AI Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {aiTools.map((tool) => (
            <div
              key={tool.name}
              className="bg-[#0a0a0a] border border-[#1f1f1f] hover:border-[#00ff88]/50 p-6 transition-all duration-200"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff88]" />
                <span className="font-mono text-xs text-[#00ff88] font-bold tracking-widest">{tool.name}</span>
              </div>
              <h3 className="font-mono text-sm font-semibold text-white mb-2">{tool.role}</h3>
              <p className="font-sans text-xs text-[#888888] leading-relaxed">{tool.desc}</p>
            </div>
          ))}
        </div>

        {/* Prompt Showcase Box */}
        <div className="border border-[#222222] bg-[#0a0a0a] p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="font-mono text-[10px] text-[#00ff88] tracking-widest block mb-1">
                // SYSTEM PROMPTS USED FOR GENERATION
              </span>
              <h3 className="font-mono text-lg font-bold text-white">AI GENERATION PROMPTS</h3>
            </div>

            <div className="flex gap-2">
              {samplePrompts.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActivePromptIndex(i)}
                  className={`font-mono text-xs px-3 py-1 border transition-colors ${
                    activePromptIndex === i
                      ? "bg-[#00ff88] text-[#080808] border-[#00ff88] font-bold"
                      : "bg-[#111111] text-[#888888] border-[#222222] hover:text-white"
                  }`}
                >
                  P0{i + 1}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#0d0d0d] border border-[#1e1e1e] p-5 font-mono relative">
            <div className="text-xs text-[#00ff88] mb-2 font-bold">
              {samplePrompts[activePromptIndex].title}
            </div>
            <p className="text-xs text-[#cccccc] leading-relaxed select-all">
              "{samplePrompts[activePromptIndex].text}"
            </p>

            <div className="mt-4 pt-3 border-t border-[#181818] flex justify-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(samplePrompts[activePromptIndex].text);
                  onTriggerToast("Prompt copied to clipboard!");
                }}
                className="flex items-center gap-2 text-xs font-mono text-[#aaaaaa] hover:text-[#00ff88] border border-[#222222] hover:border-[#00ff88] px-3 py-1.5 transition-colors bg-[#080808]"
              >
                <CopyIcon />
                <span>COPY PROMPT</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="border-t border-[#111111] py-12 px-6 bg-[#060606]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <span className="font-mono text-[#00ff88] text-sm font-semibold tracking-widest">
              AA<span className="text-[#444444]">.</span>DEV
            </span>
            <p className="font-sans text-xs text-[#666666] mt-3 leading-relaxed max-w-sm">
              Personal portfolio of Afraz Ahmed, Computer Science undergraduate student at Islamic University of Technology (IUT), Dhaka, Bangladesh.
            </p>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-widest text-[#555555] mb-3">NAVIGATION</div>
            <div className="flex flex-col gap-2 font-mono text-xs text-[#888888]">
              <a href="#about" className="hover:text-[#00ff88] transition-colors">00 // ABOUT</a>
              <a href="#projects" className="hover:text-[#00ff88] transition-colors">01 // PROJECTS</a>
              <a href="#skills" className="hover:text-[#00ff88] transition-colors">02 // SKILLS</a>
              <a href="#education" className="hover:text-[#00ff88] transition-colors">03 // EDUCATION</a>
              <a href="#contact" className="hover:text-[#00ff88] transition-colors">04 // CONTACT</a>
              <a href="#ai-stack" className="hover:text-[#00ff88] transition-colors">05 // AI STACK</a>
            </div>
          </div>

          <div>
            <div className="font-mono text-[10px] tracking-widest text-[#555555] mb-3">CONNECT</div>
            <div className="flex flex-col gap-2 font-mono text-xs text-[#888888]">
              <a href="mailto:afraz.tazim@gmail.com" className="hover:text-[#00ff88] transition-colors flex items-center gap-2">
                <EmailIcon /> afraz.tazim@gmail.com
              </a>
              <a
                href="https://github.com/afraz-bot"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#00ff88] transition-colors flex items-center gap-2"
              >
                <GitHubIcon /> github.com/afraz-bot
              </a>
              <a href="#about" className="hover:text-[#00ff88] transition-colors flex items-center gap-2">
                <LinkedInIcon /> LinkedIn / Afraz Ahmed
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-[#111111] pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[10px] tracking-widest text-[#444444]">
            © 2026 AFRAZ AHMED — ALL RIGHTS RESERVED
          </span>
          <span className="font-mono text-[10px] tracking-widest text-[#333333]">
            BUILT WITH FIGMA, GEMINI & ANTIGRAVITY — REACT 19 + TAILWIND CSS V4
          </span>
        </div>
      </div>
    </footer>
  );
}

// Main App Component
export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-[#080808] text-[#e2e2e2] font-sans">
      <NavBar onTriggerToast={(msg) => setToastMessage(msg)} />
      <HeroSection onTriggerToast={(msg) => setToastMessage(msg)} />
      <ProjectsSection />
      <SkillsSection />
      <EducationSection />
      <ContactSection onTriggerToast={(msg) => setToastMessage(msg)} />
      <AISpecsSection onTriggerToast={(msg) => setToastMessage(msg)} />
      <Footer />

      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </div>
  );
}
