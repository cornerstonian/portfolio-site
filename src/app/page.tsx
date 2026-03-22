'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import {
  Mail,
  Github,
  Linkedin,
  ExternalLink,
  Menu,
  X,
  ChevronRight,
  Shield,
  Cloud,
  Server,
  Network,
  Terminal,
  Wrench,
  Award,
  ArrowUpRight,
  MapPin,
} from 'lucide-react'

/* ─────────────────────────── ANIMATION VARIANTS ─────────────────────────── */

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6 } },
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

/* ─────────────────────────────── DATA ───────────────────────────────────── */

const NAV_LINKS = ['About', 'Skills', 'Projects', 'Certifications', 'Contact']

const SKILLS = [
  {
    title: 'Cloud & Infrastructure',
    icon: Cloud,
    tags: ['Microsoft Azure', 'AWS EC2', 'Azure AD', 'Azure Static Web Apps', 'Azure NSGs', 'CI/CD Pipelines'],
  },
  {
    title: 'Systems & Identity',
    icon: Server,
    tags: ['Windows Server 2019/2022', 'Active Directory', 'Group Policy (GPO)', 'DNS', 'DHCP', 'Linux (Ubuntu/Mint)'],
  },
  {
    title: 'Networking',
    icon: Network,
    tags: ['Cisco IOS', 'Wireshark', 'Packet Tracer', 'TCP/IP', 'VLANs', 'Subnetting'],
  },
  {
    title: 'Security & ITSM',
    icon: Shield,
    tags: ['CompTIA Security+', 'ServiceNow PDI', 'osTicket', 'Network Security Groups', 'Incident Management'],
  },
  {
    title: 'Dev & Automation',
    icon: Terminal,
    tags: ['GitHub', 'VS Code', 'PowerShell', 'Bash', 'HTML/CSS/JS', 'GitHub Actions'],
  },
  {
    title: 'Tools & Platforms',
    icon: Wrench,
    tags: ['Cisco Packet Tracer', 'Azure Portal', 'AWS Console', 'Notion', 'Obsidian', 'Loom'],
  },
]

const FEATURED_PROJECTS = [
  {
    num: '01',
    title: 'Active Directory on Azure VMs',
    tags: ['Azure', 'Windows Server', 'Active Directory', 'GPO', 'IAM'],
    status: 'complete',
    github: 'https://github.com/cornerstonian/configure-ad',
    description:
      'Deployed and configured a full Active Directory domain environment on Azure Virtual Machines. Configured OUs, GPOs, user management, and domain joining — replicating enterprise IAM at scale.',
  },
  {
    num: '02',
    title: 'NSGs & Network Protocol Analysis',
    tags: ['Azure', 'NSG', 'Wireshark', 'Security', 'Networking'],
    status: 'complete',
    github: 'https://github.com/cornerstonian/azure-network-protocols',
    description:
      'Built and analyzed Azure Network Security Groups to control inbound/outbound traffic. Used Wireshark to capture and inspect network protocols — ICMP, SSH, RDP, DNS, HTTP — in a live Azure environment.',
  },
  {
    num: '03',
    title: 'osTicket Help Desk (Full Lifecycle)',
    tags: ['osTicket', 'ITSM', 'Help Desk', 'Ticketing', 'Documentation'],
    status: 'complete',
    github: 'https://github.com/cornerstonian',
    description:
      'Installed, configured, and operated a complete osTicket help desk environment. Covers prerequisites & installation, post-installation configuration, and full ticket lifecycle examples — intake to closure.',
  },
]

const OTHER_PROJECTS = [
  {
    num: '04',
    title: 'Cloud Website Deployment — Azure & GitHub',
    tags: ['Azure', 'GitHub Actions', 'CI/CD', 'HTML/CSS/JS', 'DevOps'],
    status: 'complete',
    github: 'https://github.com/cornerstonian/portfolio-website',
    live: 'https://kind-island-058855e1e.4.azurestaticapps.net/',
    description:
      'Deployed a responsive static website using Azure Static Web Apps with GitHub Actions CI/CD. Every push to main triggers an automatic deployment — no manual steps. Live and running.',
  },
  {
    num: '05',
    title: 'ServiceNow PDI — Ticket Environment',
    tags: ['ServiceNow', 'ITSM', 'Incident Management', 'Enterprise IT'],
    status: 'in-progress',
    github: 'https://github.com/cornerstonian',
    description:
      'Building out a ServiceNow Personal Developer Instance to simulate a full enterprise IT environment. Demonstrating incident management, service requests, and complete ticket lifecycle workflows.',
  },
  {
    num: '06',
    title: 'NetOps CCNA Homelab (Physical)',
    tags: ['Cisco IOS', 'CCNA', 'Routing', 'Switching', 'Physical Lab'],
    status: 'in-progress',
    github: 'https://github.com/cornerstonian/netops-ccna-homelab',
    description:
      'Physical homelab built for CCNA preparation — Cisco 2600/1700 routers, Catalyst 3500 XL switch, network-isolated via Linksys E2500 safety buffer. Configured static routing, VTY lines, and planning IOS upgrade via TFTP.',
  },
]

const CERTS = [
  { name: 'Azure Fundamentals AZ-900', issuer: 'Microsoft', date: '', status: 'complete' },
  { name: 'CompTIA Security+', issuer: 'CompTIA', date: '', status: 'complete' },
  { name: 'CCNA 200-301', issuer: 'Cisco', date: 'In Progress', status: 'inProgress' },
]

const STATS = [
  { label: 'Projects Completed', value: '6+' },
  { label: 'Certifications', value: '2 + CCNA' },
  { label: 'Cloud Platforms', value: 'Azure' },
  { label: 'Focus Area', value: 'IT & Network' },
]

/* ──────────────────────── DOT GRID COMPONENT ────────────────────────────── */

function DotGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="w-full h-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="dotgrid" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#355E3B" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dotgrid)" />
      </svg>
    </div>
  )
}

/* ──────────────────────────── MAIN PAGE ─────────────────────────────────── */

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <main className="font-body text-[#1a1a1a] bg-[#faf9f6] overflow-x-hidden">
      {/* ═══════════════════ NAVIGATION ═══════════════════ */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#faf9f6]/70 backdrop-blur-xl shadow-[0_1px_0_rgba(53,94,59,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-10 h-20 flex items-center justify-between">
          <a href="#" className="font-display text-2xl text-hunter-dark tracking-tight">
            L<span className="text-hunter">C</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="relative text-sm font-medium text-[#6b7280] hover:text-hunter transition-colors duration-300 group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-hunter transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
            <a
              href="mailto:vois.cornerstone@gmail.com"
              className="ml-2 px-6 py-2.5 bg-hunter text-white text-sm font-semibold rounded-full hover:bg-hunter-dark transition-all duration-300 hover:shadow-lg hover:shadow-hunter/20 hover:-translate-y-0.5"
            >
              Hire Me
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden absolute inset-x-0 top-20 bg-[#faf9f6]/95 backdrop-blur-xl border-b border-hunter/10 shadow-xl"
            >
              <div className="px-6 py-8 flex flex-col gap-6">
                {NAV_LINKS.map((link) => (
                  <a
                    key={link}
                    href={`#${link.toLowerCase()}`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-[#1a1a1a] hover:text-hunter transition-colors"
                  >
                    {link}
                  </a>
                ))}
                <a
                  href="mailto:vois.cornerstone@gmail.com"
                  className="mt-2 w-full text-center px-6 py-3 bg-hunter text-white font-semibold rounded-full"
                >
                  Hire Me
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ═══════════════════ HERO ═══════════════════ */}
      <section className="relative min-h-screen flex items-center pt-20">
        <DotGrid />

        {/* Availability banner */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="absolute top-24 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex items-center gap-2 px-5 py-2 bg-hunter-pale/60 backdrop-blur-sm rounded-full border border-hunter/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-hunter opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-hunter" />
            </span>
            <span className="text-xs md:text-sm font-medium text-hunter-dark tracking-wide">
              Available for IT & Network Roles — Houston · Dallas · Austin · Waco
            </span>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 lg:gap-16 items-center min-h-[80vh]">
            {/* ── Text side ── */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="relative z-10 order-2 lg:order-1"
            >
              <motion.p
                variants={staggerItem}
                className="font-mono text-sm text-hunter tracking-[0.2em] uppercase mb-4"
              >
                IT & Network Professional
              </motion.p>

              <motion.h1
                variants={staggerItem}
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem] leading-[0.92] tracking-tight text-[#1a1a1a] mb-8"
              >
                Lavoisier
                <br />
                <span className="text-hunter">Cornerstone</span>
              </motion.h1>

              <motion.p
                variants={staggerItem}
                className="max-w-xl text-lg md:text-xl leading-relaxed text-[#6b7280] mb-10"
              >
                I&apos;m known for clear communication and precise documentation of systems and
                procedures. I take building infrastructure that organizations can rely on very
                seriously — and I&apos;m always actively adding to my technical toolkit.
              </motion.p>

              <motion.div variants={staggerItem} className="flex flex-wrap items-center gap-4 mb-10">
                <a
                  href="mailto:vois.cornerstone@gmail.com"
                  className="group inline-flex items-center gap-2 px-8 py-4 bg-hunter text-white font-semibold rounded-full hover:bg-hunter-dark transition-all duration-300 hover:shadow-xl hover:shadow-hunter/25 hover:-translate-y-0.5"
                >
                  <Mail size={18} />
                  Get in Touch
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <a
                  href="https://github.com/cornerstonian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#1a1a1a]/10 text-[#1a1a1a] font-semibold rounded-full hover:border-hunter hover:text-hunter transition-all duration-300 hover:-translate-y-0.5"
                >
                  <Github size={18} />
                  GitHub
                </a>
              </motion.div>

              <motion.div variants={staggerItem} className="flex items-center gap-5">
                <a
                  href="https://github.com/cornerstonian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6b7280] hover:text-hunter transition-colors duration-300"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/voiscornerstone/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6b7280] hover:text-hunter transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:vois.cornerstone@gmail.com"
                  className="text-[#6b7280] hover:text-hunter transition-colors duration-300"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </motion.div>
            </motion.div>

            {/* ── Photo side ── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, x: 40 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="relative flex justify-center lg:justify-end order-1 lg:order-2"
            >
              <div className="relative">
                {/* Asymmetric frame decoration */}
                <div className="absolute -top-4 -right-4 w-full h-full border-2 border-hunter/20 rounded-2xl" />
                <div className="absolute -bottom-4 -left-4 w-2/3 h-2/3 bg-hunter-pale/40 rounded-2xl" />

                {/* Headshot */}
                <div className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[400px] md:w-[360px] md:h-[450px] rounded-2xl overflow-hidden shadow-2xl shadow-hunter/10">
                  <Image
                    src="/headshot.jpg"
                    alt="Lavoisier Cornerstone"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>

                {/* Floating credential badge — AZ-900 bottom-left */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.6 }}
                  className="absolute -bottom-6 -left-8 sm:-left-12 bg-white rounded-xl shadow-xl shadow-hunter/10 px-5 py-3.5 border border-hunter/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: '#c8a96e' }}>
                      <Cloud size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1a1a1a]">AZ-900 Certified</p>
                      <p className="text-[11px] text-[#6b7280]">Microsoft Azure</p>
                    </div>
                  </div>
                </motion.div>

                {/* Second floating badge — Security+ top-right */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute -top-3 -right-8 sm:-right-10 bg-white rounded-xl shadow-xl shadow-hunter/10 px-4 py-3 border border-hunter/5"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-hunter-pale flex items-center justify-center">
                      <Shield size={16} className="text-hunter" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1a1a1a]">Security+</p>
                      <p className="text-[11px] text-[#6b7280]">CompTIA</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-6 h-10 border-2 border-hunter/20 rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2.5 bg-hunter/40 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* ═══════════════════ ABOUT ═══════════════════ */}
      <section id="about" className="relative py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            {/* Section label */}
            <motion.div variants={staggerItem} className="flex items-center gap-4 mb-16">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-hunter">About</span>
              <div className="h-px flex-1 bg-hunter/10" />
            </motion.div>

            {/* Editorial layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
              {/* Photo – offset */}
              <motion.div variants={staggerItem} className="lg:col-span-4 lg:row-span-2">
                <div className="relative lg:-mt-8">
                  <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl shadow-hunter/5">
                    <Image
                      src="/homelab.jpg"
                      alt="NetOps CCNA Homelab — Cisco router, Catalyst switch, Raspberry Pi, MacBook terminal"
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  {/* Decorative element */}
                  <div className="absolute -z-10 -bottom-6 -right-6 w-full h-full bg-hunter-pale rounded-2xl" />
                </div>
              </motion.div>

              {/* Text content */}
              <motion.div variants={staggerItem} className="lg:col-span-8">
                {/* Pull quote */}
                <blockquote className="relative mb-10 pl-6 border-l-4 border-hunter">
                  <p className="font-display text-2xl md:text-3xl lg:text-4xl leading-snug text-[#1a1a1a] italic">
                    &ldquo;Precision and clarity are non-negotiable.&rdquo;
                  </p>
                </blockquote>

                <div className="space-y-6 text-lg leading-relaxed text-[#6b7280]">
                  <p>
                    I&apos;m an IT professional with a background in education and a deep passion for
                    systems, infrastructure, and the intersection of networking and cloud technology.
                  </p>
                  <p>
                    What sets me apart isn&apos;t just the technical work — it&apos;s how I document
                    it. Every project on my GitHub is built to be understood, repeated, and built
                    upon. Precision and clarity are non-negotiable.
                  </p>
                  <p>
                    Currently pursuing my CCNA, I&apos;m hands-on daily — building labs, configuring
                    systems, and closing the gap between certification knowledge and real-world
                    implementation.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Stats strip */}
            <motion.div
              variants={staggerItem}
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-px bg-hunter/10 rounded-2xl overflow-hidden"
            >
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-[#faf9f6] px-6 py-8 md:px-8 md:py-10 text-center hover:bg-hunter-pale/30 transition-colors duration-300"
                >
                  <p className="font-display text-2xl md:text-3xl text-hunter mb-1">{stat.value}</p>
                  <p className="text-sm text-[#6b7280] font-medium">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ SKILLS ═══════════════════ */}
      <section id="skills" className="relative py-28 md:py-36 bg-hunter-dark overflow-hidden">
        {/* Background texture */}
        <div className="absolute inset-0 opacity-[0.03]">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="skillgrid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                <path d="M60 0L0 60" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#skillgrid)" />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem} className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-hunter-light">
                Skills
              </span>
              <div className="h-px flex-1 bg-white/10" />
            </motion.div>

            <motion.h2
              variants={staggerItem}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-white mb-16"
            >
              Technical
              <br />
              <span className="text-hunter-light">Toolkit</span>
            </motion.h2>

            {/* Skills masonry */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {SKILLS.map((skill, i) => {
                const Icon = skill.icon
                return (
                  <motion.div
                    key={skill.title}
                    variants={staggerItem}
                    className="group relative bg-white/[0.04] backdrop-blur-sm border border-white/[0.06] rounded-2xl p-7 hover:bg-white/[0.08] transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 mb-5">
                      <div className="w-10 h-10 rounded-xl bg-hunter/20 flex items-center justify-center group-hover:bg-hunter/30 transition-colors duration-300">
                        <Icon size={20} className="text-hunter-light" />
                      </div>
                      <h3 className="font-display text-lg text-white">{skill.title}</h3>
                    </div>

                    {/* Tags – horizontal scroll on mobile */}
                    <div className="flex flex-wrap gap-2 md:gap-2.5">
                      {skill.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-block px-3 py-1.5 text-xs font-medium text-hunter-pale/80 bg-white/[0.06] rounded-full border border-white/[0.04] hover:bg-hunter/30 hover:text-white hover:border-hunter/40 transition-all duration-300 cursor-default whitespace-nowrap"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ PROJECTS ═══════════════════ */}
      <section id="projects" className="relative py-28 md:py-36">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem} className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-hunter">
                Projects
              </span>
              <div className="h-px flex-1 bg-hunter/10" />
            </motion.div>

            <motion.h2
              variants={staggerItem}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-6"
            >
              Featured <span className="text-hunter">Work</span>
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="text-lg text-[#6b7280] max-w-2xl mb-16"
            >
              Each project is documented end-to-end on GitHub — built to be understood, repeated, and built upon.
            </motion.p>

            {/* Featured projects */}
            <div className="space-y-8 mb-16">
              {FEATURED_PROJECTS.map((project) => (
                <motion.div
                  key={project.num}
                  variants={staggerItem}
                  className="group relative bg-white rounded-3xl border border-hunter/5 overflow-hidden shadow-sm hover:shadow-xl hover:shadow-hunter/5 transition-all duration-500"
                >
                  <div className="relative p-8 md:p-10 lg:p-12">
                    {/* Giant number */}
                    <span className="font-display text-[120px] md:text-[180px] leading-none opacity-[0.04] absolute top-0 right-4 md:right-10 select-none pointer-events-none">
                      {project.num}
                    </span>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <span className="inline-block font-mono text-xs tracking-wider text-hunter uppercase mb-3">
                            Project {project.num}
                          </span>
                          <h3 className="font-display text-2xl md:text-3xl text-[#1a1a1a] group-hover:text-hunter transition-colors duration-300">
                            {project.title}
                          </h3>
                        </div>
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 w-12 h-12 rounded-full border-2 border-hunter/10 flex items-center justify-center group-hover:bg-hunter group-hover:border-hunter transition-all duration-300"
                          aria-label={`View ${project.title} on GitHub`}
                        >
                          <ArrowUpRight
                            size={20}
                            className="text-hunter group-hover:text-white transition-colors duration-300"
                          />
                        </a>
                      </div>

                      <p className="text-[#6b7280] leading-relaxed max-w-3xl mb-6">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 text-xs font-medium text-hunter bg-hunter-pale/50 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                        <span className="px-3 py-1.5 text-xs font-semibold rounded-full" style={{ color: '#c8a96e', backgroundColor: 'rgba(200,169,110,0.1)' }}>
                          ✓ Complete
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Other projects – compact */}
            <motion.div variants={staggerItem}>
              <h3 className="font-display text-xl text-[#6b7280] mb-6">More Projects</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {OTHER_PROJECTS.map((project) => (
                  <motion.a
                    key={project.num}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    variants={staggerItem}
                    className="group relative bg-white rounded-2xl border border-hunter/5 p-6 hover:shadow-lg hover:shadow-hunter/5 hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-display text-3xl text-hunter/10">{project.num}</span>
                      <div className="flex items-center gap-2">
                        {project.status === 'in-progress' && (
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 rounded-full">
                            In Progress
                          </span>
                        )}
                        <ArrowUpRight
                          size={16}
                          className="text-[#6b7280] group-hover:text-hunter transition-colors duration-300"
                        />
                      </div>
                    </div>
                    <h4 className="font-display text-base text-[#1a1a1a] mb-2 group-hover:text-hunter transition-colors duration-300">
                      {project.title}
                    </h4>
                    <p className="text-sm text-[#6b7280] leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    {project.live && (
                      <div className="mt-3 flex items-center gap-1 text-xs font-medium text-hunter">
                        <ExternalLink size={12} />
                        Live Demo
                      </div>
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ CERTIFICATIONS ═══════════════════ */}
      <section id="certifications" className="relative py-28 md:py-36 bg-hunter-pale/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
          >
            <motion.div variants={staggerItem} className="flex items-center gap-4 mb-4">
              <span className="font-mono text-xs tracking-[0.3em] uppercase text-hunter">
                Certifications
              </span>
              <div className="h-px flex-1 bg-hunter/10" />
            </motion.div>

            <motion.h2
              variants={staggerItem}
              className="font-display text-4xl md:text-5xl lg:text-6xl text-[#1a1a1a] mb-16"
            >
              Credentials <span className="text-hunter">&</span> Growth
            </motion.h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {CERTS.map((cert) => {
                const isComplete = cert.status === 'complete'
                return (
                  <motion.div
                    key={cert.name}
                    variants={scaleIn}
                    className="group relative bg-white rounded-2xl border border-hunter/5 p-7 hover:shadow-xl hover:shadow-hunter/5 hover:-translate-y-1 transition-all duration-500 overflow-hidden"
                  >
                    {/* Accent bar */}
                    <div
                      className="absolute top-0 left-0 right-0 h-1"
                      style={{
                        backgroundColor: isComplete ? '#c8a96e' : '#f59e0b',
                      }}
                    />

                    <div className="mb-5">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center"
                        style={{
                          backgroundColor: isComplete
                            ? 'rgba(200,169,110,0.12)'
                            : 'rgba(245,158,11,0.12)',
                        }}
                      >
                        <Award
                          size={28}
                          style={{
                            color: isComplete ? '#c8a96e' : '#f59e0b',
                          }}
                        />
                      </div>
                    </div>

                    <h3 className="font-display text-lg text-[#1a1a1a] mb-1 leading-snug">
                      {cert.name}
                    </h3>
                    <p className="text-sm text-[#6b7280] mb-3">{cert.issuer}</p>

                    <div className="flex items-center gap-2">
                      <span
                        className="text-xs font-bold uppercase tracking-wider"
                        style={{
                          color: isComplete ? '#c8a96e' : '#f59e0b',
                        }}
                      >
                        {isComplete ? '✓ Earned' : '◎ In Progress'}
                      </span>
                      {cert.status === 'inProgress' && <span className="text-xs text-[#6b7280]">· {cert.date}</span>}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ CONTACT ═══════════════════ */}
      <section id="contact" className="relative py-28 md:py-40 bg-hunter-dark overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-hunter/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-hunter-light/10 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="text-center"
          >
            <motion.span
              variants={staggerItem}
              className="inline-block font-mono text-xs tracking-[0.3em] uppercase text-hunter-light mb-6"
            >
              Get in Touch
            </motion.span>

            <motion.h2
              variants={staggerItem}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
            >
              Let&apos;s Build
              <br />
              <span className="italic" style={{ color: '#c8a96e' }}>
                Something Reliable
              </span>
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-4"
            >
              Open to IT & Network, systems administration, and cloud infrastructure roles in the Houston,
              Dallas, Austin, or Waco area.
            </motion.p>

            <motion.div
              variants={staggerItem}
              className="flex items-center justify-center gap-2 text-white/40 mb-12"
            >
              <MapPin size={16} />
              <span className="text-sm font-medium">Houston · Dallas · Austin · Waco</span>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="mailto:vois.cornerstone@gmail.com"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-hunter-dark font-bold rounded-full hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                <Mail size={20} />
                vois.cornerstone@gmail.com
                <ArrowUpRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </a>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/voiscornerstone/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={22} />
                </a>
                <a
                  href="https://github.com/cornerstonian"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300"
                  aria-label="GitHub"
                >
                  <Github size={22} />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════════════ FOOTER ═══════════════════ */}
      <footer className="py-8 bg-[#111] text-center">
        <p className="text-sm text-white/30">
          © {new Date().getFullYear()} Lavoisier Cornerstone. Built with intention.
        </p>
      </footer>
    </main>
  )
}
