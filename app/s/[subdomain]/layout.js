import { getWebsiteBySubdomain } from '@/features/website/actions/no-security/get-website-by-subdomain';
import React from 'react'

import { protocol, rootDomain } from '@/lib/utils';
import { ComponentSwitcher } from '@/lib/componentSwitcher';

export async function generateMetadata({params}) {
  const { subdomain } = await params;
  const {errors, data} = await getWebsiteBySubdomain(subdomain);

  if (!data) {
    return {
      title: rootDomain
    };
  }

  return {
    title: `${subdomain}.${rootDomain}`,
    description: `${data.description}`
  };
}

async function Layout({children, params}) {
  const { subdomain } = await params;
  const {errors, data} = await getWebsiteBySubdomain(subdomain);
  return (
    <div>
      {data.layer_section?.header.map((sec) => ( 
        <ComponentSwitcher key={sec.id} section={sec} subdomain={subdomain}/>
      ))}
      <main>
        {React.cloneElement(children, { websiteData: data })}
      </main>
      {data.layer_section.footer.map((sec) => (
        <ComponentSwitcher key={sec.id} section={sec} subdomain={subdomain}/>
      ))}
    </div>
  );
}

export default Layout
