

export function StatsSection({sectionData, props}) {
  return (
    <section {...props} className="w-full px-6 py-12 bg-white border-t">
      <div className="max-w-6xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
        {sectionData.stats.map((stat, index) => (
          <div key={index} className="space-y-1">
            <p className="text-2xl font-bold text-primary">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
