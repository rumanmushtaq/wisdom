import { PageFooter } from "@/components/contactUs/page-footer";
import { PageHeader } from "@/components/contactUs/page-header";
import React from "react"


export const metadata = {
  title: "Terms of Use",
  description: "Terms and conditions for using our services",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageHeader
        title="Terms of Use"
        description="Last updated: January 2026"
      />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="space-y-10">
            <Section title="1. Acceptance of Terms">
              <p>
                By accessing and using this website, you accept and agree to be bound by the terms
                and provision of this agreement. If you do not agree to abide by the above, please
                do not use this service.
              </p>
            </Section>

            <Section title="2. Use License">
              <p>
                Permission is granted to temporarily download one copy of the materials on our
                website for personal, non-commercial transitory viewing only. This is the grant of
                a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to reverse engineer any software contained on our website</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or mirror the materials on any other server</li>
              </ul>
            </Section>

            <Section title="3. User Account">
              <p>
                If you create an account on our website, you are responsible for maintaining the
                security of your account and you are fully responsible for all activities that occur
                under the account. You must immediately notify us of any unauthorized uses of your
                account or any other breaches of security.
              </p>
            </Section>

            <Section title="4. Intellectual Property">
              <p>
                The Service and its original content, features and functionality are and will remain
                the exclusive property of the Company and its licensors. The Service is protected by
                copyright, trademark, and other laws of both the United States and foreign countries.
                Our trademarks may not be used in connection with any product or service without prior
                written consent.
              </p>
            </Section>

            <Section title="5. Termination">
              <p>
                We may terminate or suspend your account and bar access to the Service immediately,
                without prior notice or liability, under our sole discretion, for any reason whatsoever
                and without limitation, including but not limited to a breach of the Terms.
              </p>
            </Section>

            <Section title="6. Limitation of Liability">
              <p>
                In no event shall the Company, nor its directors, employees, partners, agents,
                suppliers, or affiliates, be liable for any indirect, incidental, special,
                consequential or punitive damages, including without limitation, loss of profits,
                data, use, goodwill, or other intangible losses, resulting from your access to or
                use of or inability to access or use the Service.
              </p>
            </Section>

            <Section title="7. Governing Law">
              <p>
                These Terms shall be governed and construed in accordance with the laws of the
                United States, without regard to its conflict of law provisions. Our failure to
                enforce any right or provision of these Terms will not be considered a waiver of
                those rights.
              </p>
            </Section>

            <Section title="8. Changes to Terms">
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at
                any time. If a revision is material we will provide at least 30 days notice prior
                to any new terms taking effect. What constitutes a material change will be determined
                at our sole discretion.
              </p>
            </Section>

            <Section title="9. Contact Information">
              <p>
                If you have any questions about these Terms, please contact us at{" "}
                <a href="mailto:wisdomworksofficial@gmail.com" className="text-primary hover:underline">
                  wisdomworksofficial@gmail.com
                </a>
              </p>
            </Section>
          </div>
        </div>
      </main>

      <PageFooter />
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-3">
        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
        {title}
      </h2>
      <div className="text-muted-foreground leading-relaxed">{children}</div>
    </section>
  )
}
