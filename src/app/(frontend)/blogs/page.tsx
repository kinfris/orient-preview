import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import styles from './blogs.module.scss'
import { Title } from '@/components/Title/Title'
import { NavigateBtn } from '@/components/NavigateBtn/NavigateBtn'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const blogs = await payload.find({
    collection: 'blogs',
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      heroImage: true,
      content: true,
      previewImage: true,
    },
  })

  return (
    <div className={styles.wrapper}>
      <PageClient />
      <div className={styles.titleContainer}>
        <div>
          <Title>Blog</Title>
        </div>
      </div>

      <CollectionArchive blogs={blogs.docs} />
      <NavigateBtn />
      <div className={styles.backgroundContainer}></div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Blog`,
  }
}
