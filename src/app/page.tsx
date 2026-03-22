'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { 
  Server, Shield, Cloud, Terminal, GitBranch, 
  Network, ExternalLink, Mail, Linkedin, 
  Github, ChevronDown, Menu, X, CheckCircle
} from 'lucide-react'

// ── DATA ────────────────────────────────────────────────────────────────────

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Certifications', 'Contact']

const SKILLS = [
  { category: 'Cloud & Infrastructure', icon: Cloud, items: ['Microsoft Azure', 'AWS EC2', 'Azure AD', 'Azure Static Web Apps', 'Azure NSGs', 'CI/CD Pipelines'] },
  { category: 'Systems & Identity', icon: Server, items: ['Windows Server 2019/2022', 'Active Directory', 'Group Policy (GPO)', 'DNS', 'DHCP', 'Linux (Ubuntu/Mint)'] },
  { category: 'Networking', icon: Network, items: ['Cisco IOS', 'Wireshark', 'Packet Tracer', 'TCP/IP', 'VLANs', 'Subnetting'] },
  { category: 'Security & ITSM', icon: Shield, items: ['CompTIA Security+', 'ServiceNow PDI', 'osTicket', 'Network Security Groups', 'Incident Management'] },
  { category: 'Dev & Automation', icon: GitBranch, items: ['GitHub', 'VS Code', 'PowerShell', 'Bash', 'HTML/CSS/JS', 'GitHub Actions'] },
  { category: 'Tools & Platforms', icon: Terminal, items: ['Cisco Packet Tracer', 'Azure Portal', 'AWS Console', 'Notion', 'Obsidian', 'Loom'] },
]

const PROJECTS = [
  {
    title: 'Active Directory on Azure VMs',
    description: 'Deployed and configured a full Active Directory domain environment on Azure Virtual Machines. Configured OUs, GPOs, user management, and domain joining — replicating enterprise IAM at scale.',
    tags: ['Azure', 'Windows Server', 'Active Directory', 'GPO', 'IAM'],
    status: 'complete',
    github: 'https://github.com/cornerstonian/configure-ad',
    highlight: true,
  },
  {
    title: 'NSGs & Network Protocol Analysis',
    description: 'Built and analyzed Azure Network Security Groups to control inbound/outbound traffic. Used Wireshark to capture and inspect network protocols — ICMP, SSH, RDP, DNS, HTTP — in a live Azure environment.',
    tags: ['Azure', 'NSG', 'Wireshark', 'Security', 'Networking'],
    status: 'complete',
    github: 'https://github.com/cornerstonian/azure-network-protocols',
    highlight: true,
  },
  {
    title: 'osTicket Help Desk (Full Lifecycle)',
    description: 'Installed, configured, and operated a complete osTicket help desk environment. Covers prerequisites & installation, post-installation configuration, and full ticket lifecycle examples — intake to closure.',
    tags: ['osTicket', 'ITSM', 'Help Desk', 'Ticketing', 'Documentation'],
    status: 'complete',
    github: 'https://github.com/cornerstonian',
    highlight: true,
  },
  {
    title: 'Cloud Website Deployment — Azure & GitHub',
    description: 'Deployed a responsive static website using Azure Static Web Apps with GitHub Actions CI/CD. Every push to main triggers an automatic deployment — no manual steps. Live and running.',
    tags: ['Azure', 'GitHub Actions', 'CI/CD', 'HTML/CSS/JS', 'DevOps'],
    status: 'complete',
    github: 'https://github.com/cornerstonian/portfolio-website',
    live: 'https://kind-island-058855e1e.4.azurestaticapps.net/',
    highlight: false,
  },
  {
    title: 'ServiceNow PDI — Ticket Environment',
    description: 'Building out a ServiceNow Personal Developer Instance to simulate a full enterprise IT environment. Demonstrating incident management, service requests, and complete ticket lifecycle workflows.',
    tags: ['ServiceNow', 'ITSM', 'Incident Management', 'Enterprise IT'],
    status: 'in-progress',
    github: 'https://github.com/cornerstonian',
    highlight: false,
  },
  {
    title: 'NetOps CCNA Homelab (Physical)',
    description: 'Physical homelab built for CCNA preparation — Cisco 2600/1700 routers, Catalyst 3500 XL switch, network-isolated via Linksys E2500 safety buffer. Configured static routing, VTY lines, and planning IOS upgrade via TFTP.',
    tags: ['Cisco IOS', 'CCNA', 'Routing', 'Switching', 'Physical Lab'],
    status: 'in-progress',
    github: 'https://github.com/cornerstonian/netops-ccna-homelab',
    highlight: false,
  },
]

const CERTS = [
  { name: 'CompTIA Security+', issuer: 'CompTIA', date: 'Dec 2024', color: 'bg-red-100 text-red-700 border-red-200' },
  { name: 'Azure Fundamentals AZ-900', issuer: 'Microsoft', date: 'Apr 2025', color: 'bg-blue-100 text-blue-700 border-blue-200' },
  { name: 'Google IT Support Professional', issuer: 'Google', date: 'May 2024', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' },
  { name: 'CCNA 200-301', issuer: 'Cisco', date: 'In Progress', color: 'bg-hunter-pale text-hunter border-green-200', inProgress: true },
]

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  
  return { ref, inView }
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="font-display text-xl font-bold text-hunter tracking-tight">
          LC<span className="text-gray-300">.</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-gray-600 hover:text-hunter transition-colors">
              {link}
            </a>
          ))}
          <a href="mailto:netcloudsec@proton.me" className="text-sm font-medium bg-hunter text-white px-4 py-2 rounded-lg hover:bg-hunter-dark transition-colors">
            Hire Me
          </a>
        </div>

        <button className="md:hidden text-gray-600" onClick={() => setOpen(!open)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-medium text-gray-700" onClick={() => setOpen(false)}>
              {link}
            </a>
          ))}
          <a href="mailto:netcloudsec@proton.me" className="text-sm font-medium bg-hunter text-white px-4 py-2 rounded-lg text-center">
            Hire Me
          </a>
        </div>
      )}
    </nav>
  )
}

function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-gradient-to-br from-white via-hunter-pale/40 to-white pt-16">
      {/* Background geometric accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 border-2 border-hunter rounded-full" />
        <div className="absolute top-40 right-40 w-64 h-64 border border-hunter rounded-full" />
        <div className="absolute bottom-40 right-10 w-48 h-48 border border-hunter rotate-45" />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-hunter-pale border border-green-200 text-hunter text-xs font-semibold px-3 py-1.5 rounded-full mb-8 animate-fade-in">
            <span className="w-2 h-2 bg-hunter rounded-full animate-pulse" />
            Available for Sysadmin / IT Roles — Houston · Dallas · Austin · Waco
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold text-gray-900 leading-[1.05] mb-6 animate-slide-up">
            Lavoisier<br />
            <span className="text-hunter">Cornerstone</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed mb-4 animate-slide-up delay-100">
            Systems & Infrastructure Professional
          </p>

          <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-10 max-w-xl animate-slide-up delay-200">
            I&apos;m known for clear communication and precise documentation of systems and procedures. I take building infrastructure that organizations can rely on very seriously — and I&apos;m always actively adding to my technical toolkit.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 animate-slide-up delay-300">
            <a href="#projects" className="inline-flex items-center justify-center gap-2 bg-hunter text-white px-6 py-3 rounded-lg font-medium hover:bg-hunter-dark transition-colors">
              View Projects <ExternalLink size={16} />
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:border-hunter hover:text-hunter transition-colors">
              Get in Touch <Mail size={16} />
            </a>
          </div>

          <div className="flex items-center gap-6 mt-10 animate-fade-in delay-400">
            <a href="https://github.com/cornerstonian" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-hunter transition-colors">
              <Github size={22} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-hunter transition-colors">
              <Linkedin size={22} />
            </a>
            <a href="mailto:netcloudsec@proton.me" className="text-gray-400 hover:text-hunter transition-colors">
              <Mail size={22} />
            </a>
          </div>
        </div>
      </div>

      <a href="#about" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-400 animate-bounce">
        <ChevronDown size={24} />
      </a>
    </section>
  )
}

function About() {
  const { ref, inView } = useInView()
  return (
    <section id="about" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className={`transition-all duration-700 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            <div className="relative">
              <div className="w-full aspect-square max-w-sm rounded-2xl overflow-hidden border-4 border-hunter/20 shadow-xl relative">
                <Image
                  src="/headshot.jpg"
                  alt="Lavoisier Cornerstone"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-hunter text-white rounded-xl px-4 py-3 text-xs font-semibold shadow-lg">
                Security+ · AZ-900 · Google IT
              </div>
            </div>
          </div>

          <div className={`transition-all duration-700 delay-200 ${inView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <p className="text-hunter text-sm font-semibold tracking-widest uppercase mb-3">About</p>
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-6">Built for the lab.<br />Ready for production.</h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                I&apos;m an IT professional with a background in education and a deep passion for systems, infrastructure, and the intersection of networking and cloud technology.
              </p>
              <p>
                What sets me apart isn&apos;t just the technical work — it&apos;s how I document it. Every project on my GitHub is built to be understood, repeated, and built upon. Precision and clarity are non-negotiable.
              </p>
              <p>
                Currently pursuing my CCNA, I&apos;m hands-on daily — building labs, configuring systems, and closing the gap between certification knowledge and real-world implementation.
              </p>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-4">
              {[
                { label: 'Projects Completed', value: '6+' },
                { label: 'Certifications', value: '3 + CCNA' },
                { label: 'Cloud Platforms', value: 'Azure + AWS' },
                { label: 'Focus Area', value: 'Sysadmin / IT' },
              ].map(stat => (
                <div key={stat.label} className="bg-hunter-pale/60 rounded-lg p-4 border border-green-100">
                  <div className="font-display font-bold text-2xl text-hunter">{stat.value}</div>
                  <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Skills() {
  const { ref, inView } = useInView()
  return (
    <section id="skills" className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-hunter text-sm font-semibold tracking-widest uppercase mb-3">Skills</p>
          <h2 className="font-display text-4xl font-bold text-gray-900">Tools, not concepts.</h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">Every item on this list has been configured, broken, and fixed in a real lab or cloud environment.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILLS.map((skill, i) => (
            <div
              key={skill.category}
              className={`bg-white rounded-xl p-6 border border-gray-200 hover:border-hunter/40 hover:shadow-md transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-hunter-pale rounded-lg flex items-center justify-center">
                  <skill.icon size={18} className="text-hunter" />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{skill.category}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {skill.items.map(item => (
                  <span key={item} className="text-xs bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md font-medium">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Projects() {
  const { ref, inView } = useInView()
  return (
    <section id="projects" className="py-24 bg-white" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-hunter text-sm font-semibold tracking-widest uppercase mb-3">Projects</p>
          <h2 className="font-display text-4xl font-bold text-gray-900">Built, documented, deployed.</h2>
          <p className="text-gray-500 mt-4 max-w-lg mx-auto">Every project is fully documented on GitHub — structured as if someone else needs to follow it.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <div
              key={project.title}
              className={`group relative bg-white rounded-xl border ${project.highlight ? 'border-hunter/30' : 'border-gray-200'} p-6 hover:shadow-lg hover:border-hunter/50 transition-all duration-300 flex flex-col ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {project.highlight && (
                <div className="absolute top-4 right-4">
                  <span className="text-xs bg-hunter text-white px-2 py-0.5 rounded-full font-semibold">Featured</span>
                </div>
              )}
              {project.status === 'in-progress' && (
                <div className="absolute top-4 right-4">
                  <span className="text-xs bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-semibold">In Progress</span>
                </div>
              )}

              <h3 className="font-semibold text-gray-900 text-base mb-3 pr-16 leading-snug">{project.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed flex-1 mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.tags.map(tag => (
                  <span key={tag} className="text-xs bg-hunter-pale text-hunter px-2 py-0.5 rounded font-medium">{tag}</span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-hunter transition-colors font-medium">
                  <Github size={14} /> GitHub
                </a>
                {project.live && (
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-hunter hover:text-hunter-dark transition-colors font-medium">
                    <ExternalLink size={14} /> Live Demo
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="https://github.com/cornerstonian" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-hunter font-medium hover:text-hunter-dark transition-colors text-sm">
            View all on GitHub <ExternalLink size={14} />
          </a>
        </div>
      </div>
    </section>
  )
}

function Certifications() {
  const { ref, inView } = useInView()
  return (
    <section id="certifications" className="py-24 bg-gray-50" ref={ref}>
      <div className="max-w-6xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-hunter text-sm font-semibold tracking-widest uppercase mb-3">Certifications</p>
          <h2 className="font-display text-4xl font-bold text-gray-900">Verified. Tested. Ongoing.</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {CERTS.map((cert, i) => (
            <div
              key={cert.name}
              className={`bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-md transition-all duration-300 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full ${cert.color} mb-4 border`}>
                {cert.inProgress ? (
                  <span className="text-lg font-bold">~</span>
                ) : (
                  <CheckCircle size={22} />
                )}
              </div>
              <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-2">{cert.name}</h3>
              <p className="text-xs text-gray-500">{cert.issuer}</p>
              <p className={`text-xs font-semibold mt-2 ${cert.inProgress ? 'text-amber-600' : 'text-hunter'}`}>{cert.date}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const { ref, inView } = useInView()
  return (
    <section id="contact" className="py-24 bg-hunter-dark relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 border border-white rounded-full" />
        <div className="absolute bottom-10 right-10 w-48 h-48 border border-white rotate-45" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className={`text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <p className="text-green-300 text-sm font-semibold tracking-widest uppercase mb-4">Contact</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">Let&apos;s work together.</h2>
          <p className="text-green-200/80 text-lg max-w-lg mx-auto mb-10">
            Open to sysadmin, IT operations, and cloud infrastructure roles in the Houston, Dallas, Austin, or Waco area.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:netcloudsec@proton.me"
              className="inline-flex items-center justify-center gap-2 bg-white text-hunter-dark px-8 py-4 rounded-xl font-semibold hover:bg-hunter-pale transition-colors"
            >
              <Mail size={18} /> netcloudsec@proton.me
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              <Linkedin size={18} /> LinkedIn
            </a>
            <a
              href="https://github.com/cornerstonian"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-colors"
            >
              <Github size={18} /> GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-hunter-dark border-t border-white/10 py-6">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-green-300/60 text-xs">© 2026 Lavoisier Cornerstone. All rights reserved.</p>
        <a href="https://github.com/cornerstonian" target="_blank" rel="noopener noreferrer" className="text-green-300/60 hover:text-white transition-colors text-xs flex items-center gap-1">
          <Github size={12} /> cornerstonian
        </a>
      </div>
    </footer>
  )
}

// ── PAGE ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}
