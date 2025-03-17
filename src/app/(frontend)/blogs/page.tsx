import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import styles from './blogs.module.scss'
import { Title } from '@/components/Title/Title'
import Link from 'next/link'
import { Media } from '@/components/Media'
import { ButtonLink } from '@/components/ButtonLink/ButtonLink'

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
      timeToRead: true,
      publishedAt: true,
      category: true,
    },
  })

  const firstPost = blogs.docs[0]

  if (!firstPost) return <div>Load posts</div>

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  const dateStr = yesterday.toISOString()
  const date = new Date(firstPost.publishedAt ?? dateStr)

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className={styles.wrapper}>
      <PageClient />
      <div className={styles.container}>
        <div className={styles.titleContainer}>
          <Title className={styles.title}>Blog</Title>
          <ButtonLink href={'/contact'} title="Get A Quote" />
        </div>
        <div className={styles.featuredPostContainer}>
          <h3>Featured Posts</h3>
          <Link href={`/blogs/${firstPost.slug}`} className={styles.featuredPost}>
            <div className={styles.content}>
              <div className={styles.category}>{firstPost.category ?? 'category'}</div>
              <h4 className={styles.title}>{firstPost.title}</h4>
              <p className={styles.publishedDate}>
                {formattedDate} · {firstPost.timeToRead}
              </p>
            </div>
            <div className={styles.featureImg}>
              <Media resource={firstPost.previewImage ?? ''} />
            </div>
          </Link>
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
