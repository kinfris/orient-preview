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
import localFont from 'next/font/local'
import { Media } from '@/components/Media'

const NimbusSanL = localFont({
  src: '../../../../../public/fonts/NimbusSanL-Bol.otf',
})

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
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
  const url = '/posts/' + slug
  const post = await queryPostBySlug({ slug })

  if (!post) return <PayloadRedirects url={url} />
  console.log('post - ', post)
  return (
    <article className={styles.container}>
      {/* <PageClient /> */}
      <PayloadRedirects disableNotFound url={url} />
      {draft && <LivePreviewListener />}
      <div className={styles.topContainer}>
        <div className={styles.titleContainer}>
          <h1>{post.title}</h1>
          <p>5 min read</p>
        </div>

        {post.heroImage && typeof post.heroImage == 'object' && post.heroImage.url && (
          <div className={styles.imageContainer}>
            <Media resource={post.heroImage} />
          </div>
        )}
      </div>

      <div className={styles.richTextContainer}>
        <RichText className={`${styles.richText} `} data={post.content} enableGutter={false} />
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'posts',
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
