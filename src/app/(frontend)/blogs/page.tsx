import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import styles from './blogs.module.scss'
import { Title } from '@/components/Title/Title'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const blogs = await payload.find({
    collection: 'blogs',
    limit: 7,
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
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <Title className={styles.title}>Blog</Title>
          <Link href={'/contact'}>
            <span>Get A Quote</span>
            <img src="/arrow-icon.svg" alt="" />
          </Link>
        </div>
        <div className={styles.featuredPostContainer}>
          <h3>Featured Posts</h3>
          <div className={styles.featuredPost}>
            <div className={styles.content}>
              <div className={styles.category}>Category</div>
              <h4 className={styles.title}>5 Signs It’s Time to Expand Your Tech Team</h4>
              <p className={styles.publishedDate}>July 28, 2022 · 6 min read</p>
            </div>
            <div className={styles.featureImg}>
              <img src="/feature_post.png" alt="" />
            </div>
          </div>
        </div>

        <CollectionArchive initBlogs={blogs.docs} />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Blog`,
  }
}
