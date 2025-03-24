import { HeaderClient } from './Component.client'
import React from 'react'

import type { Header } from '@/payload-types'
import { getPayload } from 'payload'

export const revalidate = 600

import configPromise from '@payload-config'

export async function Header() {
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

  return <HeaderClient servicesData={servicesData.docs} />
}
