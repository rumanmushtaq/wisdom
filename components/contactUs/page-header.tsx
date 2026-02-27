import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface PageHeaderProps {
  title: string
  description?: string
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <header className="border-b border-border/50 bg-card/20 backdrop-blur-sm">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
          {title}
        </h1>
        {description && (
          <p className="mt-3 text-muted-foreground text-lg">{description}</p>
        )}
      </div>
    </header>
  )
}
