import { getWebsiteBySubdomain } from "@/features/website/actions/no-security/get-website-by-subdomain";
import { ComponentSwitcher } from "@/lib/componentSwitcher";
import { notFound } from "next/navigation";

export default async function page({params}) {
  const { subdomain } = await params;
  const {errors, data} = await getWebsiteBySubdomain(subdomain);

  if (!data) {
    notFound();
  }

  return (
    <div className="">
		{data.section.map((sec) => (
			<ComponentSwitcher key={sec.id} section={sec} subdomain={subdomain}/>
		))}
    </div>
  );
}