import { HomeClient } from '@/components/Home/HomeClient'
import { generateMetadata } from './[slug]/page'

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

  return <HomeClient homeData={homeData.docs} casesData={casesData.docs} />
}

export { generateMetadata }
