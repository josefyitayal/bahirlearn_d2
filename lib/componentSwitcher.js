import { Navbar, Footer, Hero, AboutInstructor, CourseFeatures, Testimonials, FeaturedCourse, FAQ, CallToAction, MultiColumnInfo, CountdownTimer, CurriculumOverview, StatsSection } from "@/components/shared/SectionComponents";

export const ComponentSwitcher = ({ section, subdomain }) => {
  // const section = sections.find((s) => s.id === id);
  if (!section) return null;

  switch (section.id) {
    case "navbar":
      return <Navbar sectionData={section.content} />;
    case "footer":
      return <Footer sectionData={section.content} />;
    case "hero-section":
      return <Hero sectionData={section.content} />;
    case "about-instractor":
    	return <AboutInstructor sectionData={section.content} />;
    case "course-features":
    	return <CourseFeatures sectionData={section.content} />;
    case "testimonials":
    	return <Testimonials sectionData={section.content} />;
    case "course-list":
    	return <CourseList sectionData={section.data} subdomain={subdomain}/>;
    case "featured-course":
    	return <FeaturedCourse sectionData={section.content} />;
    case "faq":
    	return <FAQ sectionData={section.content} />;
    case "call-to-action":
    	return <CallToAction sectionData={section.content} />;
    case "multi-column-info":
    	return <MultiColumnInfo sectionData={section.content} />;
    case "countdown-timer":
    	return <CountdownTimer sectionData={section.content} />;
    case "curriculum-overview":
    	return <CurriculumOverview sectionData={section.content} />;
    case "stats-section":
    	return <StatsSection sectionData={section.content} />;

    // Add more cases as needed
    default:
      return null;
  }
};
