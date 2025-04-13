import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import styles from './blog.module.scss'
import type { Post } from '@/payload-types'

import { generateMeta } from '@/utilities/generateMeta'
import { Media } from '@/components/Media'
import Link from 'next/link'
import { RecentPosts } from '@/components/RecentPosts/RecentPosts'
import { ButtonLink } from '@/components/ButtonLink/ButtonLink'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const blogs = await payload.find({
    collection: 'blogs',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = blogs.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/blogs/' + slug
  const blog = await queryBlogBySlug({ slug })

  if (!blog) return <PayloadRedirects url={url} />

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  const dateStr = yesterday.toISOString()
  const date = new Date(blog.publishedAt ?? dateStr)
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className={styles.wrapper}>
      <div className={styles.gradientContainer}></div>
      <article className={styles.container}>
        <PayloadRedirects disableNotFound url={url} />

        <div className={styles.breadcrumbs}>
          <div className={styles.breadcrumbsStart}>
            <Link href={'/blogs'}>Blog</Link>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path d="M9 19L15 12L9 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>

          <p>{blog.title}</p>
        </div>

        <div className={styles.contentContainer}>
          <div className={styles.topContainer}>
            <div className={styles.mobileTag}>{blog.category}</div>
            <div className={styles.titleContainer}>
              <h1>{blog.title}</h1>
              <div className={styles.btnContainer}>
                <ButtonLink href={'/contact'} title="Get A Quote" />
              </div>
            </div>

            <div className={styles.infoBloc}>
              <p>
                {formattedDate} · {blog.timeToRead}
              </p>
              <div className={styles.tag}>{blog.category}</div>
            </div>

            {blog.heroImage && typeof blog.heroImage == 'object' && blog.heroImage.url && (
              <div className={styles.imageContainer}>
                {/* <Media resource={blog.heroImage} /> */}
              </div>
            )}
          </div>

          <div className={styles.richTextContainer}>
            <RichText className={`${styles.richText}`} data={blog.content} enableGutter={false} />
          </div>
        </div>

        <RecentPosts currentBlogId={blog.id} />
      </article>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const blog = await queryBlogBySlug({ slug })

  return generateMeta({ doc: blog })
}

const queryBlogBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'blogs',
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
