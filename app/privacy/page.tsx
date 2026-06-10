"use client"

import React, { useState } from "react"
import Link from "next/link"
import {
  Shield,
  Eye,
  Lock,
  Database,
  Share2,
  Bell,
  Users,
  RefreshCw,
  ArrowLeft,
  Mail,
  ChevronDown,
  CheckCircle2,
} from "lucide-react"
import { PageFooter } from "@/components/contactUs/page-footer"

export default function PrivacyPage() {
  const [openSection, setOpenSection] = useState<number | null>(null)

  const sections = [
    {
      icon: Database,
      title: "Information We Collect",
      color: "from-primary/20 to-primary/5",
      borderColor: "border-primary/30",
      iconBg: "bg-primary/15",
      items: [
        "Name and email address",
        "Billing and shipping address",
        "Payment information (processed securely via our payment provider)",
        "Communication preferences",
        "Any other information you choose to provide",
      ],
      description:
        "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.",
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      color: "from-blue-500/20 to-blue-500/5",
      borderColor: "border-blue-500/30",
      iconBg: "bg-blue-500/15",
      items: [
        "Provide, maintain, and improve our services",
        "Process transactions and send related information",
        "Send you technical notices, updates, and security alerts",
        "Respond to your comments, questions, and support requests",
        "Communicate about products, services, offers, and events",
        "Monitor and analyze trends, usage, and activities",
      ],
      description: "We use the information we collect to deliver a better, safer experience for every user on our platform.",
    },
    {
      icon: Share2,
      title: "Information Sharing",
      color: "from-purple-500/20 to-purple-500/5",
      borderColor: "border-purple-500/30",
      iconBg: "bg-purple-500/15",
      items: [
        "With your consent or at your direction",
        "With service providers who assist in our operations",
        "To comply with legal obligations",
        "To protect our rights, privacy, safety, or property",
        "In connection with a merger, acquisition, or sale of assets",
      ],
      description:
        "We do not sell, trade, or otherwise transfer your personal information to outside parties except in specific, transparent circumstances.",
    },
    {
      icon: Lock,
      title: "Data Security",
      color: "from-emerald-500/20 to-emerald-500/5",
      borderColor: "border-emerald-500/30",
      iconBg: "bg-emerald-500/15",
      items: [
        "SSL / TLS encryption for all data in transit",
        "AES-256 encryption for data at rest",
        "Regular third-party security audits",
        "Strict employee access controls and MFA",
        "24/7 anomaly detection and intrusion prevention",
      ],
      description:
        "We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access using industry-standard protocols.",
    },
    {
      icon: Shield,
      title: "Your Rights",
      color: "from-amber-500/20 to-amber-500/5",
      borderColor: "border-amber-500/30",
      iconBg: "bg-amber-500/15",
      items: [
        "Access — Request a copy of your personal data",
        "Rectification — Correct inaccurate or incomplete data",
        "Erasure — Request deletion of your personal data",
        "Portability — Transfer your data to another service",
        "Restriction — Limit how we process your data",
        "Objection — Object to certain processing activities",
      ],
      description:
        "You are in control. Our platform respects and upholds every right granted to you under applicable data protection laws.",
    },
    {
      icon: Bell,
      title: "Cookies & Tracking",
      color: "from-pink-500/20 to-pink-500/5",
      borderColor: "border-pink-500/30",
      iconBg: "bg-pink-500/15",
      items: [
        "Essential cookies for core functionality",
        "Analytics cookies to understand usage patterns",
        "Preference cookies to remember your settings",
        "You can manage or disable cookies in your browser",
      ],
      description:
        "We use cookies and similar tracking technologies to improve your experience and understand how our platform is used.",
    },
    {
      icon: Users,
      title: "Children's Privacy",
      color: "from-cyan-500/20 to-cyan-500/5",
      borderColor: "border-cyan-500/30",
      iconBg: "bg-cyan-500/15",
      items: [
        "Our Service is not directed to anyone under the age of 13",
        "We do not knowingly collect data from children under 13",
        "Parents/guardians should contact us if they have concerns",
        "We will promptly delete any inadvertently collected child data",
      ],
      description:
        "Protecting children online is a priority. We are committed to complying with all applicable laws regarding minors' privacy.",
    },
    {
      icon: RefreshCw,
      title: "Policy Updates",
      color: "from-orange-500/20 to-orange-500/5",
      borderColor: "border-orange-500/30",
      iconBg: "bg-orange-500/15",
      items: [
        "We may update this policy from time to time",
        "Material changes will be communicated via email or in-app notice",
        "The effective date at the top will always reflect the latest revision",
        "Continued use constitutes acceptance of the updated policy",
      ],
      description:
        "We will notify you of any significant changes by posting the new Privacy Policy on this page and updating the effective date.",
    },
  ]

  const stats = [
    { value: "256-bit", label: "AES Encryption" },
    { value: "GDPR", label: "Compliant" },
    { value: "0", label: "Data Sold" },
    { value: "24/7", label: "Monitoring" },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background overflow-x-hidden">
      {/* ── Hero Section ───────────────────────────────── */}
      <div className="relative border-b border-border/50 overflow-hidden">
        {/* Animated background orbs */}
        <div
          aria-hidden
          className="pointer-events-none absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.88 0.19 127 / 0.12) 0%, transparent 70%)",
            animation: "pulse 6s ease-in-out infinite",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, oklch(0.65 0.22 250 / 0.1) 0%, transparent 70%)",
            animation: "pulse 8s ease-in-out infinite 2s",
          }}
        />

        {/* Grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(oklch(0.98 0 0) 1px, transparent 1px),
              linear-gradient(90deg, oklch(0.98 0 0) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        <div className="mx-auto max-w-5xl px-6 py-14 relative z-10">
          {/* Back link */}
          <Link
            href="/"
            id="privacy-back-home"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all duration-200 mb-8 group"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform duration-200" />
            Back to Home
          </Link>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 mb-6">
            <Shield className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary tracking-wider uppercase">
              Privacy First
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 leading-tight">
            Your Privacy,{" "}
            <span
              className="relative inline-block"
              style={{
                background:
                  "linear-gradient(135deg, oklch(0.88 0.19 127), oklch(0.8 0.18 180))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Our Priority
            </span>
          </h1>

          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed mb-2">
            We believe privacy is a fundamental right. Read how we collect, use,
            and safeguard your personal information with full transparency.
          </p>

          <p className="text-xs text-muted-foreground/60 mt-4">
            Effective date:{" "}
            <span className="text-primary font-medium">January 1, 2025</span>
          </p>

          {/* Stats row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl border border-border/50 bg-card/40 backdrop-blur-sm p-4 text-center hover:border-primary/40 hover:bg-card/60 transition-all duration-300"
              >
                <div className="text-2xl font-extrabold text-primary leading-none mb-1">
                  {s.value}
                </div>
                <div className="text-xs text-muted-foreground font-medium">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Content ────────────────────────────────────── */}
      <main className="flex-1 py-14">
        <div className="mx-auto max-w-5xl px-6">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-10">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-border to-transparent" />
            <span className="text-xs text-muted-foreground font-semibold uppercase tracking-widest">
              Policy Details
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent via-border to-transparent" />
          </div>

          {/* Accordion sections */}
          <div className="space-y-4">
            {sections.map((sec, idx) => {
              const Icon = sec.icon
              const isOpen = openSection === idx

              return (
                <div
                  key={sec.title}
                  id={`privacy-section-${idx}`}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? `${sec.borderColor} bg-gradient-to-br ${sec.color}`
                      : "border-border/50 bg-card/30 hover:border-border hover:bg-card/50"
                  } backdrop-blur-sm`}
                >
                  {/* Header / toggle */}
                  <button
                    id={`privacy-toggle-${idx}`}
                    onClick={() =>
                      setOpenSection(isOpen ? null : idx)
                    }
                    className="w-full flex items-center justify-between px-6 py-5 text-left group"
                  >
                    <div className="flex items-center gap-4">
                      {/* Step number */}
                      <span className="hidden sm:flex h-7 w-7 items-center justify-center rounded-full border border-border/60 text-xs font-bold text-muted-foreground group-hover:border-primary/50 group-hover:text-primary transition-colors">
                        {String(idx + 1).padStart(2, "0")}
                      </span>

                      {/* Icon */}
                      <span
                        className={`flex h-10 w-10 items-center justify-center rounded-xl ${sec.iconBg} transition-transform duration-300 group-hover:scale-110`}
                      >
                        <Icon className="h-5 w-5 text-foreground/80" />
                      </span>

                      <div>
                        <h2 className="text-base font-semibold text-foreground">
                          {sec.title}
                        </h2>
                        {!isOpen && (
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1 max-w-sm">
                            {sec.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform duration-300 shrink-0 ml-4 ${
                        isOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {/* Expandable content */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen
                        ? "max-h-[600px] opacity-100"
                        : "max-h-0 opacity-0"
                    } overflow-hidden`}
                  >
                    <div className="px-6 pb-6 pt-0">
                      <div className="ml-0 sm:ml-11 border-l-2 border-border/40 pl-6">
                        <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                          {sec.description}
                        </p>
                        <ul className="space-y-3">
                          {sec.items.map((item) => (
                            <li
                              key={item}
                              className="flex items-start gap-3 text-sm text-foreground/80"
                            >
                              <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* ── CTA / Contact ──────────────────────────── */}
          <div className="mt-16 relative overflow-hidden rounded-3xl border border-primary/25 bg-gradient-to-br from-primary/10 via-card/40 to-blue-500/10 backdrop-blur-md p-10 text-center">
            {/* Glow blob */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div
                className="w-64 h-64 rounded-full opacity-20"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.88 0.19 127), transparent 70%)",
                  filter: "blur(60px)",
                }}
              />
            </div>

            <div className="relative z-10">
              <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 border border-primary/30 mb-5">
                <Mail className="h-7 w-7 text-primary" />
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                Still have questions?
              </h2>
              <p className="text-muted-foreground text-base max-w-md mx-auto leading-relaxed mb-8">
                Our dedicated privacy team is ready to help you understand how
                your data is handled. Reach out anytime.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                <a
                  id="privacy-contact-btn"
                  href="mailto:privacy@company.com"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/85 active:scale-95 transition-all duration-200 shadow-lg shadow-primary/20"
                >
                  <Mail className="h-4 w-4" />
                  Contact Privacy Team
                </a>
                <Link
                  id="privacy-terms-link"
                  href="/terms"
                  className="inline-flex items-center gap-2 rounded-xl border border-border/60 bg-card/40 px-7 py-3 text-sm font-semibold text-foreground hover:border-primary/50 hover:text-primary transition-all duration-200"
                >
                  <Shield className="h-4 w-4" />
                  View Terms of Service
                </Link>
              </div>
            </div>
          </div>

          {/* Last updated footer note */}
          <p className="text-center text-xs text-muted-foreground/50 mt-10">
            Last updated:{" "}
            <span className="text-muted-foreground font-medium">
              January 1, 2025
            </span>{" "}
            · Effective immediately upon publication
          </p>
        </div>
      </main>

      <PageFooter />

      {/* keyframe for orb pulse */}
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.7; }
        }
      `}</style>
    </div>
  )
}
