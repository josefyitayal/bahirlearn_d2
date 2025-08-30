
import {Button} from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import {Twitter, Linkedin, Github, Youtube, Instagram} from "lucide-react"


export function AboutInstructor({sectionData, props}) {
  const { heading, name, title, bio_text, image_url, social_links } = sectionData

  return (
    <section {...props} className="w-full px-6 py-12 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center">{heading}</h2>
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-shrink-0">
            <Image
              src={image_url}
              alt={name}
              width={300}
              height={300}
              className="rounded-xl shadow-lg object-cover"
            />
          </div>
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-semibold">{name}</h3>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-base text-gray-700">{bio_text}</p>
            <div className="flex gap-4 justify-center md:justify-start mt-4">
              {social_links.twitter && (
                <a href={social_links.twitter} target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5 text-blue-500 hover:text-blue-600" />
                </a>
              )}
              {social_links.linkedin && (
                <a href={social_links.linkedin} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="h-5 w-5 text-blue-700 hover:text-blue-800" />
                </a>
              )}
              {social_links.github && (
                <a href={social_links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-5 w-5 text-gray-800 hover:text-black" />
                </a>
              )}
              {social_links.instagram && (
                <a href={social_links.github} target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5 text-pink-500 hover:text-black" />
                </a>
              )}
              {social_links.youtube && (
                <a href={social_links.github} target="_blank" rel="noopener noreferrer">
                  <Youtube className="h-5 w-5 text-red-600 hover:text-black" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
