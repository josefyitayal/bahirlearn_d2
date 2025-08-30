
import { Button } from "@/components/ui/button";

export function Footer({ sectionData, ...props }) {
  return (
    <footer {...props} className="w-full px-6 py-8 bg-gray-100 border-t border-gray-200">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">{sectionData.copyright_text}</p>
        {sectionData.show_social_links && (
          <div className="flex gap-4">
            <Button variant="link" className="text-gray-600 hover:text-black">TikTok</Button>
            <Button variant="link" className="text-gray-600 hover:text-black">Facebook</Button>
            <Button variant="link" className="text-gray-600 hover:text-black">YouTube</Button>
          </div>
        )}
      </div>
    </footer>
  )
}
