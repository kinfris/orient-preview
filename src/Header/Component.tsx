import { HeaderClient } from './Component.client'
import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import type { Header } from '@/payload-types'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function Header() {
  const headerData: Header = await getCachedGlobal('header', 1)()
  const payload = await getPayload({ config: configPromise })

  const servicesData = await payload.find({
    collection: 'services',
    overrideAccess: false,
    select: {
      slug: true,
      serviceName: true,
      serviceIcon: true,
    },
  })

  return <HeaderClient data={headerData} servicesData={servicesData.docs} />
}
