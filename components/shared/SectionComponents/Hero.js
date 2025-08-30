
import {Button} from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function Hero({ sectionData, props }) {
  const { headline, subtext, cta_text, image, image_position } = sectionData

  const isBg = image_position === "background"
  const isRight = image_position === "right"
  const isLeft = image_position === "left"
  const showSideImage = isLeft || isRight

  return (
    <section
      {...props}
      className={`w-full ${isBg ? "min-h-screen grid place-items-center px-6 py-0 bg-cover bg-center bg-no-repeat text-white" : "px-6 py-28 bg-white text-gray-900"}`}
      style={isBg ? { backgroundImage: `url(${image})` } : {}}
    >
      <div
        className={`max-w-7xl mx-auto flex ${
          isBg
            ? "flex-col items-center justify-center text-center space-y-6"
            : "flex-col-reverse md:flex-row items-center gap-12"
        } ${isLeft ? "md:flex-row-reverse" : ""}`}
      >
        {showSideImage && (
          <div className="w-full md:w-1/2 h-full">
            <Image
              src={image}
              alt="Hero"
              width={800}
              height={600}
              className="w-full h-full object-cover rounded-2xl shadow-lg"
              priority
            />
          </div>
        )}
        <div className={`w-full ${showSideImage ? "md:w-1/2 text-center md:text-left space-y-6" : "max-w-2xl space-y-6 text-center"}`}>
          <h1 className={`${isBg ? "text-5xl md:text-6xl font-extrabold" : "text-4xl md:text-5xl font-bold tracking-tight"}`}>{headline}</h1>
          <p className={`${isBg ? "text-xl md:text-2xl font-medium" : "text-lg text-gray-600 dark:text-gray-300"}`}>{subtext}</p>
          <Link href={"/courses"}>
            <Button size="lg">{cta_text}</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
