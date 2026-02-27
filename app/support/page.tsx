
import { PageFooter } from "@/components/contactUs/page-footer"
import { PageHeader } from "@/components/contactUs/page-header"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { HelpCircle, MessageSquare, FileText, Zap, Mail, Clock } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Support",
  description: "Get help and find answers to your questions",
}

const faqs = [
  {
    question: "How do I create an account?",
    answer:
      "To create an account, click the 'Sign Up' button in the top right corner of the page. Fill in your email address and create a password. You'll receive a confirmation email to verify your account.",
  },
  {
    question: "How can I reset my password?",
    answer:
      "Click on 'Forgot Password' on the login page. Enter your email address and we'll send you a link to reset your password. The link expires after 24 hours for security reasons.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers for annual subscriptions. All payments are processed securely through our payment provider.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period. We don't offer partial refunds for unused time.",
  },
  {
    question: "How do I update my billing information?",
    answer:
      "Go to your Account Settings, then click on 'Billing'. Here you can update your payment method, view invoices, and manage your subscription plan.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes, we take security very seriously. We use industry-standard SSL encryption for all data transfers, and your information is stored in secure, encrypted databases. We never share your personal information with third parties.",
  },
]

const supportChannels = [
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "Live Chat",
    description: "Chat with our support team in real-time",
    availability: "Mon-Fri, 9am-6pm EST",
    action: "Start Chat",
    href: "#",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Support",
    description: "Send us a detailed message",
    availability: "Response within 24 hours",
    action: "Send Email",
    href: "mailto:support@company.com",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Documentation",
    description: "Browse our comprehensive guides",
    availability: "Available 24/7",
    action: "View Docs",
    href: "#",
  },
]

export default function SupportPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PageHeader
        title="Support Center"
        description="We're here to help. Find answers or reach out to our team."
      />
      
      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-6">
          {/* Support Channels */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Get Help
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {supportChannels.map((channel) => (
                <Link
                  key={channel.title}
                  href={channel.href}
                  className="glass rounded-lg p-5 hover:bg-card/50 transition-colors group"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                    {channel.icon}
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">{channel.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{channel.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {channel.availability}
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* FAQ Section */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
              <HelpCircle className="h-5 w-5 text-primary" />
              Frequently Asked Questions
            </h2>
            <div className="glass rounded-lg p-6">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
                    <AccordionTrigger className="text-left text-foreground hover:text-primary hover:no-underline">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>

          {/* Quick Links */}
          <section className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-6">Quick Links</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              <QuickLink title="Getting Started Guide" description="New to our platform? Start here" />
              <QuickLink title="API Documentation" description="Integrate with our services" />
              <QuickLink title="System Status" description="Check our current uptime and performance" />
              <QuickLink title="Release Notes" description="See what's new in our latest updates" />
            </div>
          </section>

          {/* Contact CTA */}
          <section className="glass rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-foreground mb-2">
              Still need help?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Can't find what you're looking for? Our support team is ready to assist you.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              Contact Us
            </Link>
          </section>
        </div>
      </main>

      <PageFooter />
    </div>
  )
}

function QuickLink({ title, description }: { title: string; description: string }) {
  return (
    <Link
      href="#"
      className="flex items-center gap-4 rounded-lg bg-secondary/30 p-4 hover:bg-secondary/50 transition-colors group"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary/10 text-primary">
        <FileText className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-medium text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </Link>
  )
}
