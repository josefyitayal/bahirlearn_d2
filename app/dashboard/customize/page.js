import { DashboardNav } from "@/components/shared/DashboardNav";
import { Button } from "@/components/ui/button";
import { getCurrentUserWebsite } from "@/features/website/actions/get-current-user-website";
import { CurrentTemplate } from "@/features/website/components/CurrentTemplate";
import { TemplateSelector } from "@/features/website/components/TemplateSelector";
import { WarningBanner } from "@/features/website/components/WarningBanner";
import { WebsiteStatusToggle } from "@/features/website/components/WebsiteStatusToggle";
import { protocol, rootDomain } from "@/lib/utils";
import Link from "next/link";

async function CustomizePage() {
  const { errors, data } = await getCurrentUserWebsite()
  if (errors) {
    return (<div>{errors.message}</div>)
  }
  return (
    <div className="flex flex-col gap-5">
      <DashboardNav title={"Website"}>
        <WebsiteStatusToggle status={data.website.is_published} />
        <Button asChild>
          <Link
            href={`${protocol}://${data.website.subdomain}.${rootDomain}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View your site
          </Link>
        </Button>
      </DashboardNav>
      {!data.is_payed && (
        <WarningBanner />
      )}
      <CurrentTemplate template={data.website.template} />
      <TemplateSelector />
    </div>
  )
}

export default CustomizePage
