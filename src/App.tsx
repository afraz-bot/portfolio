import { useState } from "react";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#222222] bg-[#080808]/95 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-14">
        <span className="font-mono text-[#00ff88] text-sm font-semibold tracking-widest">
          AA<span className="text-[#444444]">.</span>DEV
        </span>
        <div className="hidden md:flex items-center gap-8">
          <a
            href="mailto:afraz.tazim@gmail.com"
            className="font-mono text-xs tracking-widest text-[#666666] hover:text-[#00ff88] transition-colors duration-150"
          >
            CONTACT
          </a>
        </div>
        <button
          className="md:hidden font-mono text-xs text-[#666666] hover:text-[#00ff88]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "CLOSE" : "MENU"}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-[#222222] bg-[#080808]">
          <a
            href="mailto:afraz.tazim@gmail.com"
            onClick={() => setMenuOpen(false)}
            className="block px-6 py-3 font-mono text-xs tracking-widest text-[#666666] hover:text-[#00ff88] border-b border-[#111111]"
          >
            CONTACT
          </a>
        </div>
      )}
    </nav>
  );
}

function IconButton({ label, icon, href }: { label: string; icon: React.ReactNode; href?: string }) {
  if (href) {
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="group flex items-center gap-2 border border-[#2a2a2a] hover:border-[#00ff88] px-4 py-2 transition-all duration-200 hover:bg-[#00ff88]/5"
      >
        <span className="text-[#444444] group-hover:text-[#00ff88] transition-colors">{icon}</span>
        <span className="font-mono text-xs tracking-widest text-[#666666] group-hover:text-[#00ff88] transition-colors">
          {label}
        </span>
      </a>
    );
  }
  return (
    <button className="group flex items-center gap-2 border border-[#2a2a2a] hover:border-[#00ff88] px-4 py-2 transition-all duration-200 hover:bg-[#00ff88]/5">
      <span className="text-[#444444] group-hover:text-[#00ff88] transition-colors">{icon}</span>
      <span className="font-mono text-xs tracking-widest text-[#666666] group-hover:text-[#00ff88] transition-colors">
        {label}
      </span>
    </button>
  );
}

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

function HeroSection() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center pt-14 px-6">
      <div className="max-w-6xl mx-auto w-full py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <div className="font-mono text-xs text-[#00ff88] tracking-widest mb-6 flex items-center gap-3">
              <span className="inline-block w-8 h-px bg-[#00ff88]" />
              PORTFOLIO — CS UNDERGRADUATE
            </div>
            <h1 className="font-mono font-bold text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight text-[#e2e2e2] mb-2">
              AFRAZ
            </h1>
            <h1 className="font-mono font-bold text-[clamp(3rem,8vw,7rem)] leading-[0.9] tracking-tight text-[#00ff88] mb-8">
              AHMED
            </h1>
            <div className="font-mono text-sm tracking-[0.2em] text-[#444444] mb-10 flex flex-wrap items-center gap-4">
              <span>COMPUTER SCIENCE STUDENT</span>
              <span className="text-[#222222]">/</span>
              <span>ISLAMIC UNIVERSITY OF TECHNOLOGY, DHAKA, BANGLADESH</span>
              <span className="text-[#222222]">/</span>
              <span>230041225</span>
            </div>
            <p className="font-sans text-[#666666] text-base leading-relaxed max-w-xl mb-10">
              Islamic University of Technology (IUT) is a premier educational and research institution located in Dhaka, Bangladesh. Operating as a subsidiary organ of the Organisation of Islamic Cooperation (OIC), IUT specializes in engineering, computer science, and cutting-edge technological innovation.
            </p>
            <div className="flex flex-wrap gap-3">
              <IconButton label="EMAIL" icon={<EmailIcon />} href="mailto:afraz.tazim@gmail.com" />
              <IconButton label="GITHUB" icon={<GitHubIcon />} href="https://github.com/afraz-bot" />
              <IconButton label="LINKEDIN" icon={<LinkedInIcon />} />
            </div>
          </div>
          <div className="md:col-span-4 flex flex-col gap-3">
            <div className="border border-[#1a1a1a] p-4">
              <div className="font-mono text-xs text-[#2a2a2a] mb-1">STAT_01</div>
              <div className="font-mono text-lg font-bold text-[#00ff88]">GREEN GUARDIAN</div>
              <div className="font-mono text-xs text-[#444444] mt-1">PROJECTS CURRENTLY WORKING ON</div>
            </div>
            <div className="border border-[#1a1a1a] p-4">
              <div className="font-mono text-xs text-[#2a2a2a] mb-1">STAT_02</div>
              <div className="font-mono text-lg font-bold text-[#e2e2e2]">GAMING</div>
              <div className="font-mono text-xs text-[#444444] mt-1">HOBBIES</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const skillCategories = [
  {
    label: "LANGUAGES",
    items: ["ENGLISH", "BANGLA", "HINDI"],
  },
  {
    label: "SYSTEMS",
    items: ["WINDOWS", "LINUX"],
  },
  {
    label: "FRAMEWORKS",
    items: ["JAVAFX", "FLUTTER"],
  },
  {
    label: "DATABASES",
    items: ["POSTGRES", "ORACLE"],
  },
  {
    label: "INTERESTS",
    items: ["READING", "GAMING"],
  },
];

function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 border-t border-[#111111]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <span className="font-mono text-xs text-[#00ff88] tracking-widest">02</span>
          <span className="flex-1 h-px bg-[#1a1a1a]" />
          <h2 className="font-mono text-xs tracking-widest text-[#444444]">SKILLS & INTERESTS</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#111111]">
          {skillCategories.map((cat) => (
            <div key={cat.label} className="bg-[#080808] p-8 hover:bg-[#0d0d0d] transition-colors">
              <div className="font-mono text-xs tracking-widest text-[#00ff88] mb-5">{cat.label}</div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-xs text-[#e2e2e2] border border-[#1e1e1e] px-2.5 py-1 hover:border-[#00ff88]/50 hover:text-[#00ff88] transition-all"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-[#111111] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <div>
            <span className="font-mono text-[#00ff88] text-sm font-semibold tracking-widest">
              AA<span className="text-[#444444]">.</span>DEV
            </span>
            <p className="font-sans text-xs text-[#333333] mt-2 leading-relaxed">
              Lorem ipsum portfolio description placeholder text. Lorem ipsum repeating text.
            </p>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-widest text-[#444444] mb-3">NAVIGATION</div>
            <div className="flex flex-col gap-1">
              <a
                href="mailto:afraz.tazim@gmail.com"
                className="font-mono text-xs text-[#333333] hover:text-[#00ff88] transition-colors tracking-wider"
              >
                CONTACT
              </a>
            </div>
          </div>
          <div>
            <div className="font-mono text-[10px] tracking-widest text-[#444444] mb-3">CONTACT</div>
            <div className="flex flex-col gap-2">
              <a
                href="mailto:afraz.tazim@gmail.com"
                className="font-mono text-xs text-[#333333] hover:text-[#00ff88] transition-colors flex items-center gap-2"
              >
                <EmailIcon /> afraz.tazim@gmail.com
              </a>
              <a
                href="https://github.com/afraz-bot"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-xs text-[#333333] hover:text-[#00ff88] transition-colors flex items-center gap-2"
              >
                <GitHubIcon /> github.com/afraz-bot
              </a>
              <a href="#" className="font-mono text-xs text-[#333333] hover:text-[#00ff88] transition-colors flex items-center gap-2">
                <LinkedInIcon /> LINKEDIN PLACEHOLDER
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-[#111111] pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <span className="font-mono text-[10px] tracking-widest text-[#2a2a2a]">
            © 20XX AFRAZ AHMED — ALL RIGHTS RESERVED — PLACEHOLDER
          </span>
          <span className="font-mono text-[10px] tracking-widest text-[#1e1e1e]">
            LOREM IPSUM BUILT WITH PLACEHOLDER STACK
          </span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-[#080808] text-[#e2e2e2]" style={{ fontFamily: "'Outfit', sans-serif" }}>
      <NavBar />
      <HeroSection />
      <SkillsSection />
      <Footer />
    </div>
  );
}
