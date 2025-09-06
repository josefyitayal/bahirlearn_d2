// components/property/SectionPropertySwitcher.tsx
import {
  AboutInstructorProperty,
  CallToActionProperty,
  CountdownTimerProperty,
  CourseFeaturesProperty,
  CurriculumOverviewProperty,
  FaqProperty,
  HeroProperty,
  FeaturedCourseProperty,
  MultiColumnInfoProperty,
  StatsSectionProperty,
  TestimonialsProperty,
} from "@/components/shared/SectionProperty"

export function PropertySwitcher({ section }) {
  switch (section.id) {
    case "hero-section":
      return <HeroProperty section={section} />
    case "about-instractor":
      return <AboutInstructorProperty section={section} />
    case "course-features":
      return <CourseFeaturesProperty section={section} />
    case "curriculum-overview":
      return <CurriculumOverviewProperty section={section} />
    case "faq":
      return <FaqProperty section={section} />
    case "call-to-action":
      return <CallToActionProperty section={section} />
    case "featured-course":
      return <FeaturedCourseProperty section={section} />
    case "multi-column-info":
      return <MultiColumnInfoProperty section={section} />
    case "stats-section":
      return <StatsSectionProperty section={section} />
    case "testimonials":
      return <TestimonialsProperty section={section} />
    case "countdown-timer":
      return <CountdownTimerProperty section={section} />
    default:
      return (
        <div className="p-4 text-sm text-muted-foreground">
          No property panel for "{section.id}"
        </div>
      )
  }
}
