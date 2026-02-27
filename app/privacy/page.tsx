import React from "react"

import { Shield, Eye, Lock, Database, Share2, Bell } from "lucide-react"
import { PageHeader } from "@/components/contactUs/page-header"
import { PageFooter } from "@/components/contactUs/page-footer"

export const metadata = {
  title: "Privacy Policy",
  description: "How we collect, use, and protect your personal information",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageHeader
        title="Privacy Policy"
        description="Your privacy is important to us. Learn how we handle your data."
      />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-10">
            <Section
              icon={<Database className="h-5 w-5" />}
              title="Information We Collect"
            >
              <p className="mb-4">
                We collect information you provide directly to us, such as when you create an
                account, make a purchase, or contact us for support. This may include:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Name and email address</li>
                <li>Billing and shipping address</li>
                <li>Payment information (processed securely through our payment provider)</li>
                <li>Communication preferences</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </Section>

            <Section
              icon={<Eye className="h-5 w-5" />}
              title="How We Use Your Information"
            >
              <p className="mb-4">We use the information we collect to:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and customer service requests</li>
                <li>Communicate with you about products, services, offers, and events</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
              </ul>
            </Section>

            <Section
              icon={<Share2 className="h-5 w-5" />}
              title="Information Sharing"
            >
              <p>
                We do not sell, trade, or otherwise transfer your personal information to outside
                parties except in the following circumstances:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                <li>With your consent or at your direction</li>
                <li>With service providers who assist in our operations</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights, privacy, safety, or property</li>
                <li>In connection with a merger, acquisition, or sale of assets</li>
              </ul>
            </Section>

            <Section
              icon={<Lock className="h-5 w-5" />}
              title="Data Security"
            >
              <p>
                We take reasonable measures to help protect your personal information from loss,
                theft, misuse, unauthorized access, disclosure, alteration, and destruction. We use
                industry-standard encryption protocols to protect sensitive data transmitted online
                and also protect your information offline.
              </p>
              <div className="mt-4 p-4 rounded-md bg-primary/10 border border-primary/20">
                <p className="text-sm text-foreground">
                  <strong>Security Measures Include:</strong> SSL encryption, secure data centers,
                  regular security audits, and employee access controls.
                </p>
              </div>
            </Section>

            <Section
              icon={<Shield className="h-5 w-5" />}
              title="Your Rights"
            >
              <p className="mb-4">You have the right to:</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <RightItem title="Access" description="Request a copy of your personal data" />
                <RightItem title="Rectification" description="Correct inaccurate or incomplete data" />
                <RightItem title="Erasure" description="Request deletion of your personal data" />
                <RightItem title="Portability" description="Transfer your data to another service" />
                <RightItem title="Restriction" description="Limit how we process your data" />
                <RightItem title="Objection" description="Object to certain processing activities" />
              </div>
            </Section>

            <Section
              icon={<Bell className="h-5 w-5" />}
              title="Cookies and Tracking"
            >
              <p>
                We use cookies and similar tracking technologies to track activity on our service
                and hold certain information. Cookies are files with a small amount of data which
                may include an anonymous unique identifier. You can instruct your browser to refuse
                all cookies or to indicate when a cookie is being sent.
              </p>
            </Section>

            <Section
              icon={<Shield className="h-5 w-5" />}
              title="Children's Privacy"
            >
              <p>
                Our Service is not directed to anyone under the age of 13. We do not knowingly
                collect personally identifiable information from children under 13. If you are a
                parent or guardian and you are aware that your child has provided us with personal
                data, please contact us.
              </p>
            </Section>

            <Section
              icon={<Bell className="h-5 w-5" />}
              title="Changes to This Policy"
            >
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any
                changes by posting the new Privacy Policy on this page and updating the
                {"Last updated"} date at the top of this policy.
              </p>
            </Section>

            <div className="glass rounded-lg p-6 text-center">
              <h2 className="text-lg font-semibold text-foreground mb-2">Questions?</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy, please contact us.
              </p>
              <a
                href="mailto:privacy@company.com"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Contact Privacy Team
              </a>
            </div>
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  )
}

function Section({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="glass rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
          {icon}
        </span>
        {title}
      </h2>
      <div className="text-muted-foreground leading-relaxed">{children}</div>
    </section>
  )
}

function RightItem({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-md bg-secondary/50 p-3">
      <h4 className="font-medium text-foreground text-sm">{title}</h4>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
    </div>
  )
}
