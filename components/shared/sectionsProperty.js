import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox"
import useWebsiteBuilder from "@/features/editor/store/websiteStore";


export function NavbarProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const handleChange = (field, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        [field]: value,
      },
    })
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div>
        <Label htmlFor="navbar-position">Navbar Position</Label>
        <Select
          id="navbar-position"
          value={section.data.is_sticky ? "sticky" : "scrollable"}
          onValueChange={(val) => handleChange("is_sticky", val === "sticky")}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="sticky">Sticky</SelectItem>
            <SelectItem value="scrollable">Scrollable</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="link-alignment">Link Alignment</Label>
        <Select
          id="link-alignment"
          value={section.data.links_alignment}
          onValueChange={(val) => handleChange("links_alignment", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Link Alignment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="start">Start</SelectItem>
            <SelectItem value="center">Center</SelectItem>
            <SelectItem value="end">End</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export function FooterProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const handleChange = (field, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        [field]: value,
      },
    })
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div>
        <Label htmlFor="copyright_text">Copyright Text</Label>
        <Input
          id="copyright_text"
          value={section.data?.copyright_text || ""}
          onChange={(e) => handleChange("copyright_text", e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label>Show Social Links</Label>
        <Switch
          checked={section.data?.show_social_links}
          onCheckedChange={(val) => handleChange("show_social_links", val)}
        />
      </div>
    </div>
  )
}

export function HeroProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const handleChange = (field, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        [field]: value,
      },
    })
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div>
        <Label htmlFor="headline">Headline</Label>
        <Input
          id="headline"
          value={section.data?.headline || ""}
          onChange={(e) => handleChange("headline", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="subtext">Subtext</Label>
        <Input
          id="subtext"
          value={section.data?.subtext || ""}
          onChange={(e) => handleChange("subtext", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="cta_text">CTA Text</Label>
        <Input
          id="cta_text"
          value={section.data?.cta_text || ""}
          onChange={(e) => handleChange("cta_text", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="cta_link">CTA Link</Label>
        <Input
          id="cta_link"
          value={section.data?.cta_link || ""}
          onChange={(e) => handleChange("cta_link", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="image">Image Path</Label>
        <Input
          id="image"
          value={section.data?.image || ""}
          onChange={(e) => handleChange("image", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="image_position">Image Position</Label>
        <Select
          id="image_position"
          value={section.data?.image_position}
          onValueChange={(val) => handleChange("image_position", val)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select image position" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="left">Left</SelectItem>
            <SelectItem value="right">Right</SelectItem>
            <SelectItem value="background">Background</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export function CourseDetailsProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const handleChange = (field, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        [field]: value,
      },
    })
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div>
        <Label htmlFor="duration">Duration</Label>
        <Input
          id="duration"
          value={section.data?.duration || ""}
          onChange={(e) => handleChange("duration", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="level">Level</Label>
        <Input
          id="level"
          value={section.data?.level || ""}
          onChange={(e) => handleChange("level", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="language">Language</Label>
        <Input
          id="language"
          value={section.data?.language || ""}
          onChange={(e) => handleChange("language", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="last_updated">Last Updated</Label>
        <Input
          id="last_updated"
          value={section.data?.last_updated || ""}
          onChange={(e) => handleChange("last_updated", e.target.value)}
        />
      </div>
    </div>
  )
}


export function WhatYouWillLearnProperty({ section }) {
  const updateProperty = useTemplateBuilder((state) => state.updateProperty)

  const handleItemChange = (index, value) => {
    const updatedItems = [...section.data.items]
    updatedItems[index] = value

    updateProperty(section.id, {
      data: {
        ...section.data,
        items: updatedItems,
      },
    })
  }

  const addItem = () => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        items: [...section.data.items, ""],
      },
    })
  }

  const removeItem = (index) => {
    const updatedItems = section.data.items.filter((_, i) => i !== index)
    updateProperty(section.id, {
      data: {
        ...section.data,
        items: updatedItems,
      },
    })
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <Label>What You Will Learn</Label>
        <Button size="sm" variant="outline" onClick={addItem}>
          + Add
        </Button>
      </div>

      {section.data.items.map((item, index) => (
        <div key={index} className="flex gap-2 items-center">
          <Input
            value={item}
            onChange={(e) => handleItemChange(index, e.target.value)}
          />
          <Button
            size="icon"
            variant="ghost"
            onClick={() => removeItem(index)}
          >
            ✕
          </Button>
        </div>
      ))}
    </div>
  )
}

export function FAQProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const handleChange = (index, key, value) => {
    const updated = [...section.data.items]
    updated[index][key] = value
    updateProperty(section.id, {
      data: {
        ...section.data,
        items: updated,
      },
    })
  }

  const addFAQ = () => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        items: [...section.data.items, { question: "", answer: "" }],
      },
    })
  }

  const removeFAQ = (index) => {
    const updated = section.data.items.filter((_, i) => i !== index)
    updateProperty(section.id, {
      data: {
        ...section.data,
        items: updated,
      },
    })
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <Label>FAQs</Label>
        <Button size="sm" variant="outline" onClick={addFAQ}>
          + Add FAQ
        </Button>
      </div>

      {section.data.items.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 border p-3 rounded-md">
          <div>
            <Label>Question</Label>
            <Input
              value={item.question}
              onChange={(e) => handleChange(index, "question", e.target.value)}
            />
          </div>
          <div>
            <Label>Answer</Label>
            <Input
              value={item.answer}
              onChange={(e) => handleChange(index, "answer", e.target.value)}
            />
          </div>
          <div className="text-right">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeFAQ(index)}
            >
              ✕ Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}


export function CallToActionProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const handleChange = (field, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        [field]: value,
      },
    })
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div>
        <Label htmlFor="headline">Headline</Label>
        <Input
          id="headline"
          value={section.data?.headline || ""}
          onChange={(e) => handleChange("headline", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="button_text">Button Text</Label>
        <Input
          id="button_text"
          value={section.data?.button_text || ""}
          onChange={(e) => handleChange("button_text", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="button_link">Button Link</Label>
        <Input
          id="button_link"
          value={section.data?.button_link || ""}
          onChange={(e) => handleChange("button_link", e.target.value)}
        />
      </div>
    </div>
  )
}

export function FeaturedCoursesProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const updateHeading = (value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        heading: value,
      },
    })
  }

  const updateCourseId = (index, value) => {
    const updated = [...section.data.courseIds]
    updated[index] = value
    updateProperty(section.id, {
      data: {
        ...section.data,
        courseIds: updated,
      },
    })
  }

  const addCourseId = () => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        courseIds: [...section.data.courseIds, ""],
      },
    })
  }

  const removeCourseId = (index) => {
    const updated = section.data.courseIds.filter((_, i) => i !== index)
    updateProperty(section.id, {
      data: {
        ...section.data,
        courseIds: updated,
      },
    })
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={section.data.heading}
          onChange={(e) => updateHeading(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <Label>Course IDs</Label>
        <Button variant="outline" size="sm" onClick={addCourseId}>
          + Add
        </Button>
      </div>

      {section.data.courseIds.map((id, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            value={id}
            onChange={(e) => updateCourseId(index, e.target.value)}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeCourseId(index)}
          >
            ✕
          </Button>
        </div>
      ))}
    </div>
  )
}

export function CategoryGridProperty({ section }) {
  const updateProperty = useTemplateBuilder((state) => state.updateProperty)

  const updateCategory = (index, key, value) => {
    const updated = [...section.data.categories]
    updated[index][key] = value
    updateProperty(section.id, {
      data: {
        ...section.data,
        categories: updated,
      },
    })
  }

  const addCategory = () => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        categories: [...section.data.categories, { name: "", image: "" }],
      },
    })
  }

  const removeCategory = (index) => {
    const updated = section.data.categories.filter((_, i) => i !== index)
    updateProperty(section.id, {
      data: {
        ...section.data,
        categories: updated,
      },
    })
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <Label>Course Categories</Label>
        <Button size="sm" variant="outline" onClick={addCategory}>
          + Add
        </Button>
      </div>

      {section.data.categories.map((cat, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 border border-border p-3 rounded-md"
        >
          <Input
            placeholder="Category Name"
            value={cat.name}
            onChange={(e) => updateCategory(index, "name", e.target.value)}
          />
          <Input
            placeholder="Image URL"
            value={cat.image}
            onChange={(e) => updateCategory(index, "image", e.target.value)}
          />
          <div className="text-right">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => removeCategory(index)}
            >
              ✕ Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export function TestimonialsProperty({ section }) {
  const updateProperty = useWebsiteBuilder((state) => state.updateProperty)

  const handleChange = (index, key, value) => {
    const updated = [...section.data.items]
    updated[index][key] = value
    updateProperty(section.id, {
      data: {
        ...section.data,
        items: updated,
      },
    })
  }

  const addTestimonial = () => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        items: [...section.data.items, { author: "", quote: "" }],
      },
    })
  }

  const removeTestimonial = (index) => {
    const updated = section.data.items.filter((_, i) => i !== index)
    updateProperty(section.id, {
      data: {
        ...section.data,
        items: updated,
      },
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <Label>Testimonials</Label>
        <Button variant="outline" size="sm" onClick={addTestimonial}>
          + Add
        </Button>
      </div>

      {section.data.items.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 border p-3 rounded-md">
          <Input
            placeholder="Author"
            value={item.author}
            onChange={(e) => handleChange(index, "author", e.target.value)}
          />
          <Input
            placeholder="Quote"
            value={item.quote}
            onChange={(e) => handleChange(index, "quote", e.target.value)}
          />
          <div className="text-right">
            <Button variant="ghost" size="sm" onClick={() => removeTestimonial(index)}>
              ✕ Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ContactUsProperty({ section }) {
  const updateProperty = useTemplateBuilder((state) => state.updateProperty)

  const handleChange = (index, key, value) => {
    const updated = [...section.data.contacts]
    updated[index][key] = value
    updateProperty(section.id, {
      data: {
        ...section.data,
        contacts: updated,
      },
    })
  }

  const updateText = (key, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        [key]: value,
      },
    })
  }

  const addContact = () => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        contacts: [...section.data.contacts, { type: "", value: "", link: "" }],
      },
    })
  }

  const removeContact = (index) => {
    const updated = section.data.contacts.filter((_, i) => i !== index)
    updateProperty(section.id, {
      data: {
        ...section.data,
        contacts: updated,
      },
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={section.data.heading}
          onChange={(e) => updateText("heading", e.target.value)}
        />
      </div>
      <div>
        <Label>Subtext</Label>
        <Input
          value={section.data.subtext}
          onChange={(e) => updateText("subtext", e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between mt-2">
        <Label>Contact Items</Label>
        <Button variant="outline" size="sm" onClick={addContact}>
          + Add
        </Button>
      </div>

      {section.data.contacts.map((item, index) => (
        <div key={index} className="flex flex-col gap-2 border p-3 rounded-md">
          <Input
            placeholder="Type (e.g., Email, Telegram)"
            value={item.type}
            onChange={(e) => handleChange(index, "type", e.target.value)}
          />
          <Input
            placeholder="Value (e.g., support@domain.com)"
            value={item.value}
            onChange={(e) => handleChange(index, "value", e.target.value)}
          />
          <Input
            placeholder="Link (e.g., mailto:support@...)"
            value={item.link}
            onChange={(e) => handleChange(index, "link", e.target.value)}
          />
          <div className="text-right">
            <Button variant="ghost" size="sm" onClick={() => removeContact(index)}>
              ✕ Remove
            </Button>
          </div>
        </div>
      ))}
    </div>
  )
}


export function InstructorBioProperty({ section }) {
  const updateProperty = useTemplateBuilder((s) => s.updateProperty)

  const update = (key, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        [key]: value,
      },
    })
  }

  const updateSocial = (key, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        social_links: {
          ...section.data.social_links,
          [key]: value,
        },
      },
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <Label>Heading</Label>
        <Input value={section.data.heading} onChange={(e) => update("heading", e.target.value)} />
      </div>
      <div>
        <Label>Name</Label>
        <Input value={section.data.name} onChange={(e) => update("name", e.target.value)} />
      </div>
      <div>
        <Label>Title</Label>
        <Input value={section.data.title} onChange={(e) => update("title", e.target.value)} />
      </div>
      <div>
        <Label>Bio Text</Label>
        <Input value={section.data.bio_text} onChange={(e) => update("bio_text", e.target.value)} />
      </div>
      <div>
        <Label>Image URL</Label>
        <Input value={section.data.image_url} onChange={(e) => update("image_url", e.target.value)} />
      </div>

      <div className="pt-4">
        <Label className="text-muted-foreground">Social Links</Label>
        <Input
          placeholder="Twitter"
          value={section.data.social_links?.twitter || ""}
          onChange={(e) => updateSocial("twitter", e.target.value)}
        />
        <Input
          placeholder="LinkedIn"
          value={section.data.social_links?.linkedin || ""}
          onChange={(e) => updateSocial("linkedin", e.target.value)}
        />
        <Input
          placeholder="GitHub"
          value={section.data.social_links?.github || ""}
          onChange={(e) => updateSocial("github", e.target.value)}
        />
      </div>
    </div>
  )
}

export function CourseCurriculumProperty({ section }) {
  const updateProperty = useTemplateBuilder((s) => s.updateProperty)

  const updateField = (key, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        [key]: value,
      },
    })
  }

  const updateModule = (index, key, value) => {
    const modules = [...section.data.modules]
    modules[index][key] = value
    updateProperty(section.id, {
      data: {
        ...section.data,
        modules,
      },
    })
  }

  const updateLesson = (moduleIndex, lessonIndex, value) => {
    const modules = [...section.data.modules]
    modules[moduleIndex].lessons[lessonIndex] = value
    updateProperty(section.id, {
      data: {
        ...section.data,
        modules,
      },
    })
  }

  const addModule = () => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        modules: [...section.data.modules, { title: "", lessons: [] }],
      },
    })
  }

  const removeModule = (index) => {
    const modules = [...section.data.modules]
    modules.splice(index, 1)
    updateProperty(section.id, {
      data: {
        ...section.data,
        modules,
      },
    })
  }

  const addLesson = (moduleIndex) => {
    const modules = [...section.data.modules]
    modules[moduleIndex].lessons.push("")
    updateProperty(section.id, {
      data: {
        ...section.data,
        modules,
      },
    })
  }

  const removeLesson = (moduleIndex, lessonIndex) => {
    const modules = [...section.data.modules]
    modules[moduleIndex].lessons.splice(lessonIndex, 1)
    updateProperty(section.id, {
      data: {
        ...section.data,
        modules,
      },
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <Label>Heading</Label>
        <Input value={section.data.heading} onChange={(e) => updateField("heading", e.target.value)} />
      </div>
      <div>
        <Label>Description</Label>
        <Input value={section.data.description} onChange={(e) => updateField("description", e.target.value)} />
      </div>

      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between">
          <Label>Modules</Label>
          <Button size="sm" variant="outline" onClick={addModule}>+ Add Module</Button>
        </div>

        {section.data.modules.map((mod, index) => (
          <div key={index} className="border rounded-md p-3 space-y-2">
            <Input
              placeholder="Module title"
              value={mod.title}
              onChange={(e) => updateModule(index, "title", e.target.value)}
            />

            {mod.lessons.map((lesson, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={lesson}
                  onChange={(e) => updateLesson(index, i, e.target.value)}
                  placeholder={`Lesson ${i + 1}`}
                />
                <Button variant="ghost" size="sm" onClick={() => removeLesson(index, i)}>✕</Button>
              </div>
            ))}

            <div className="flex justify-between">
              <Button variant="outline" size="sm" onClick={() => addLesson(index)}>+ Add Lesson</Button>
              <Button variant="ghost" size="sm" onClick={() => removeModule(index)}>Remove Module</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PricingTableProperty({ section }) {
  const updateProperty = useTemplateBuilder((s) => s.updateProperty)

  const updateMain = (key, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        [key]: value,
      },
    })
  }

  const updatePlan = (index, key, value) => {
    const plans = [...section.data.plans]
    plans[index][key] = value
    updateProperty(section.id, {
      data: {
        ...section.data,
        plans,
      },
    })
  }

  const updateFeature = (planIndex, featureIndex, value) => {
    const plans = [...section.data.plans]
    plans[planIndex].features[featureIndex] = value
    updateProperty(section.id, {
      data: {
        ...section.data,
        plans,
      },
    })
  }

  const addPlan = () => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        plans: [
          ...section.data.plans,
          {
            name: "",
            price: "",
            frequency: "",
            features: [],
            cta_text: "",
            is_featured: false,
          },
        ],
      },
    })
  }

  const removePlan = (index) => {
    const plans = [...section.data.plans]
    plans.splice(index, 1)
    updateProperty(section.id, {
      data: { ...section.data, plans },
    })
  }

  const addFeature = (planIndex) => {
    const plans = [...section.data.plans]
    plans[planIndex].features.push("")
    updateProperty(section.id, {
      data: { ...section.data, plans },
    })
  }

  const removeFeature = (planIndex, featureIndex) => {
    const plans = [...section.data.plans]
    plans[planIndex].features.splice(featureIndex, 1)
    updateProperty(section.id, {
      data: { ...section.data, plans },
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={section.data.heading}
          onChange={(e) => updateMain("heading", e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center">
        <Label>Plans</Label>
        <Button size="sm" variant="outline" onClick={addPlan}>
          + Add Plan
        </Button>
      </div>

      {section.data.plans.map((plan, i) => (
        <div key={i} className="border p-3 rounded space-y-2">
          <Input
            placeholder="Plan Name"
            value={plan.name}
            onChange={(e) => updatePlan(i, "name", e.target.value)}
          />
          <Input
            placeholder="Price"
            value={plan.price}
            onChange={(e) => updatePlan(i, "price", e.target.value)}
          />
          <Input
            placeholder="Frequency"
            value={plan.frequency}
            onChange={(e) => updatePlan(i, "frequency", e.target.value)}
          />
          <Input
            placeholder="CTA Text"
            value={plan.cta_text}
            onChange={(e) => updatePlan(i, "cta_text", e.target.value)}
          />
          <div className="flex items-center gap-2">
            <Checkbox
              checked={plan.is_featured}
              onCheckedChange={(val) => updatePlan(i, "is_featured", val)}
            />
            <Label>Is Featured</Label>
          </div>

          <div>
            <Label className="mb-1">Features</Label>
            {plan.features.map((feat, j) => (
              <div key={j} className="flex gap-2 mt-1">
                <Input
                  value={feat}
                  onChange={(e) => updateFeature(i, j, e.target.value)}
                  placeholder={`Feature ${j + 1}`}
                />
                <Button size="sm" variant="ghost" onClick={() => removeFeature(i, j)}>✕</Button>
              </div>
            ))}
            <Button size="sm" variant="outline" onClick={() => addFeature(i)}>
              + Add Feature
            </Button>
          </div>

          <Button size="sm" variant="ghost" onClick={() => removePlan(i)}>
            Remove Plan
          </Button>
        </div>
      ))}
    </div>
  )
}

export function GuaranteeProperty({ section }) {
  const updateProperty = useTemplateBuilder((s) => s.updateProperty)

  const update = (key, value) => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        [key]: value,
      },
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={section.data.heading}
          onChange={(e) => update("heading", e.target.value)}
        />
      </div>
      <div>
        <Label>Text</Label>
        <Input
          value={section.data.text}
          onChange={(e) => update("text", e.target.value)}
        />
      </div>
      <div>
        <Label>Image URL</Label>
        <Input
          value={section.data.image_url}
          onChange={(e) => update("image_url", e.target.value)}
        />
      </div>
    </div>
  )
}

export function StudentProjectsProperty({ section }) {
  const updateProperty = useTemplateBuilder((s) => s.updateProperty)

  const updateMain = (key, value) => {
    updateProperty(section.id, {
      data: { ...section.data, [key]: value },
    })
  }

  const updateProject = (index, key, value) => {
    const updated = [...section.data.projects]
    updated[index][key] = value
    updateProperty(section.id, {
      data: { ...section.data, projects: updated },
    })
  }

  const addProject = () => {
    const newProject = {
      title: "",
      description: "",
      image_url: "",
      student_name: "",
    }
    updateProperty(section.id, {
      data: {
        ...section.data,
        projects: [...section.data.projects, newProject],
      },
    })
  }

  const removeProject = (index) => {
    const filtered = section.data.projects.filter((_, i) => i !== index)
    updateProperty(section.id, {
      data: { ...section.data, projects: filtered },
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={section.data.heading}
          onChange={(e) => updateMain("heading", e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center">
        <Label>Projects</Label>
        <Button size="sm" onClick={addProject}>+ Add</Button>
      </div>

      {section.data.projects.map((proj, i) => (
        <div key={i} className="border p-3 rounded space-y-2">
          <Input
            placeholder="Title"
            value={proj.title}
            onChange={(e) => updateProject(i, "title", e.target.value)}
          />
          <Input
            placeholder="Description"
            value={proj.description}
            onChange={(e) => updateProject(i, "description", e.target.value)}
          />
          <Input
            placeholder="Image URL"
            value={proj.image_url}
            onChange={(e) => updateProject(i, "image_url", e.target.value)}
          />
          <Input
            placeholder="Student Name"
            value={proj.student_name}
            onChange={(e) => updateProject(i, "student_name", e.target.value)}
          />
          <Button size="sm" variant="ghost" onClick={() => removeProject(i)}>Remove</Button>
        </div>
      ))}
    </div>
  )
}

export function LogoCloudProperty({ section }) {
  const updateProperty = useTemplateBuilder((s) => s.updateProperty)

  const updateMain = (key, value) => {
    updateProperty(section.id, {
      data: { ...section.data, [key]: value },
    })
  }

  const updateLogo = (index, key, value) => {
    const logos = [...section.data.logos]
    logos[index][key] = value
    updateProperty(section.id, {
      data: { ...section.data, logos },
    })
  }

  const addLogo = () => {
    const newLogo = { name: "", image_url: "" }
    updateProperty(section.id, {
      data: {
        ...section.data,
        logos: [...section.data.logos, newLogo],
      },
    })
  }

  const removeLogo = (index) => {
    const filtered = section.data.logos.filter((_, i) => i !== index)
    updateProperty(section.id, {
      data: { ...section.data, logos: filtered },
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={section.data.heading}
          onChange={(e) => updateMain("heading", e.target.value)}
        />
      </div>

      <div className="flex justify-between items-center">
        <Label>Logos</Label>
        <Button size="sm" onClick={addLogo}>+ Add</Button>
      </div>

      {section.data.logos.map((logo, i) => (
        <div key={i} className="border p-3 rounded space-y-2">
          <Input
            placeholder="Company Name"
            value={logo.name}
            onChange={(e) => updateLogo(i, "name", e.target.value)}
          />
          <Input
            placeholder="Image URL"
            value={logo.image_url}
            onChange={(e) => updateLogo(i, "image_url", e.target.value)}
          />
          <Button size="sm" variant="ghost" onClick={() => removeLogo(i)}>Remove</Button>
        </div>
      ))}
    </div>
  )
}

export function NewsletterSignupProperty({ section }) {
  const updateProperty = useTemplateBuilder((s) => s.updateProperty)

  const updateMain = (key, value) => {
    updateProperty(section.id, {
      data: { ...section.data, [key]: value },
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <Label>Heading</Label>
        <Input
          value={section.data.heading}
          onChange={(e) => updateMain("heading", e.target.value)}
        />
      </div>
      <div>
        <Label>Subtext</Label>
        <Input
          value={section.data.subtext}
          onChange={(e) => updateMain("subtext", e.target.value)}
        />
      </div>
      <div>
        <Label>Button Text</Label>
        <Input
          value={section.data.button_text}
          onChange={(e) => updateMain("button_text", e.target.value)}
        />
      </div>
      <div>
        <Label>Placeholder Text</Label>
        <Input
          value={section.data.placeholder_text}
          onChange={(e) => updateMain("placeholder_text", e.target.value)}
        />
      </div>
    </div>
  )
}

export function StatsBannerProperty({ section }) {
  const updateProperty = useTemplateBuilder((s) => s.updateProperty)

  const updateStat = (index, key, value) => {
    const stats = [...section.data.stats]
    stats[index][key] = value
    updateProperty(section.id, {
      data: { ...section.data, stats },
    })
  }

  const addStat = () => {
    updateProperty(section.id, {
      data: {
        ...section.data,
        stats: [...section.data.stats, { value: "", label: "" }],
      },
    })
  }

  const removeStat = (index) => {
    const filtered = section.data.stats.filter((_, i) => i !== index)
    updateProperty(section.id, {
      data: { ...section.data, stats: filtered },
    })
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex justify-between items-center">
        <Label>Stats</Label>
        <Button size="sm" onClick={addStat}>+ Add Stat</Button>
      </div>

      {section.data.stats.map((stat, i) => (
        <div key={i} className="border p-3 rounded space-y-2">
          <Input
            placeholder="Value"
            value={stat.value}
            onChange={(e) => updateStat(i, "value", e.target.value)}
          />
          <Input
            placeholder="Label"
            value={stat.label}
            onChange={(e) => updateStat(i, "label", e.target.value)}
          />
          <Button size="sm" variant="ghost" onClick={() => removeStat(i)}>Remove</Button>
        </div>
      ))}
    </div>
  )
}
