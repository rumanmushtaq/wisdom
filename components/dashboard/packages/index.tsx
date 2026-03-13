import { Button } from "@/components/ui/button"


const Index = ({ packages, handleToChosePlan }: { packages: any; handleToChosePlan: any }) => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
          Investment Packages
        </h2>
        <p className="text-muted-foreground text-lg">
          Choose a package that fits your investment goals
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {packages?.map((pkg: any, index: number) => (
          <div
            key={index}
            className={`relative p-6 rounded-xl border transition-all duration-300 ease-in-out text-center ${pkg.featured
              ? "bg-card/70 border-primary/60 scale-105 shadow-lg shadow-primary/20"
              : "bg-card/30 border-border/40 hover:border-primary/50"
              }`}
          >
            {pkg.featured && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-xs font-bold rounded-full">
                Most Popular
              </div>
            )}
            <h3 className="font-bold text-lg mb-4 text-foreground">
              {pkg.name}
            </h3>
            <div className="mb-4">
              <div className="text-3xl font-bold text-primary mb-1">
                {pkg.credits} credits
              </div>
              <div className="text-sm text-muted-foreground">
                Monthly Return
              </div>
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              Investment: ${pkg.price}
            </div>
            <Button
              className={`w-full rounded-lg ${pkg.featured
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "bg-transparent border-border hover:border-primary/50"
                }`}
              variant={pkg.featured ? "default" : "outline"}
              size="sm"
              onClick={() => pkg?._id && handleToChosePlan(pkg._id)}
            >
              Choose Plan
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Index
