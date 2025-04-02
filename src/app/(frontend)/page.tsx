import type { Metadata } from 'next/types'

import { HomeClient } from '@/components/Home/HomeClient'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
export default async function Home() {
  const payload = await getPayload({ config: configPromise })

  const homeData = await payload.find({
    collection: 'home',
    overrideAccess: false,
  })

  const casesData = await payload.find({
    collection: 'cases',
    overrideAccess: false,
  })

  const servicesData = await payload.find({
    collection: 'services',
    overrideAccess: false,
  })

  return (
    <HomeClient
      homeData={homeData.docs}
      casesData={casesData.docs}
      servicesData={servicesData.docs}
    />
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Orinix`,
  }
}
