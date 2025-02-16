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
// import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

import { Media } from '@/components/Media'
import { NavigateBtn } from '@/components/NavigateBtn/NavigateBtn'

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
  const { isEnabled: draft } = await draftMode()
  const { slug = '' } = await paramsPromise
  const url = '/blogs/' + slug
  const blog = await queryBlogBySlug({ slug })

  if (!blog) return <PayloadRedirects url={url} />

  return (
    <>
      <article className={styles.container}>
        {/* <PageClient /> */}
        <PayloadRedirects disableNotFound url={url} />
        {draft && <LivePreviewListener />}
        <div className={styles.topContainer}>
          <div className={styles.titleContainer}>
            <h1>{blog.title}</h1>
            <p>{blog.timeToRead}</p>
          </div>

          {blog.heroImage && typeof blog.heroImage == 'object' && blog.heroImage.url && (
            <div className={styles.imageContainer}>
              <Media resource={blog.heroImage} />
            </div>
          )}
        </div>

        <div className={styles.richTextContainer}>
          <RichText className={`${styles.richText} `} data={blog.content} enableGutter={false} />
        </div>
      </article>
      <NavigateBtn />
    </>
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
