import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import styles from './case.module.scss'

import { generateMeta } from '@/utilities/generateMeta'
// import PageClient from './page.client'

import { Media } from '@/components/Media'
import { CaseHeader } from '@/components/CaseHeader/CaseHeader'
import { Title } from '@/components/Title/Title'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const cases = await payload.find({
    collection: 'cases',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = cases.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Case({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const url = '/cases/' + slug
  const caseData = await queryCaseBySlug({ slug })

  if (!caseData) return <PayloadRedirects url={url} />

  const {
    tags,
    projectName,
    heroImage,
    clientDescription,
    clientImage,
    challengeDescription,
    challengeImage,
    solutionDescription,
    solutionImage,
  } = caseData

  return (
    <article className={styles.container}>
      <CaseHeader />
      <div className={styles.caseContainer}>
        {tags && tags.length > 0 && (
          <div className={styles.tagsContainer}>
            {tags.map((tag) => {
              return (
                <div key={tag.id} className={styles.tag}>
                  {tag.tagName}
                </div>
              )
            })}
          </div>
        )}
        <Title>
          <h1 className={styles.projectName}>{projectName}</h1>
        </Title>
        <div className={styles.heroImage}>
          {heroImage && typeof heroImage == 'object' && heroImage.url && (
            <Media resource={heroImage} />
          )}
        </div>
        <div className={styles.clientContainer}>
          <div className={styles.textContainer}>
            <Title>
              <h3 className={styles.heading}>The CLient</h3>
            </Title>
            <p>{clientDescription}</p>
          </div>
          {clientImage && typeof clientImage == 'object' && clientImage.url && (
            <div className={styles.imageContainer}>
              <Media resource={clientImage} />
            </div>
          )}
        </div>
        <div className={styles.clientContainer}>
          {challengeImage && typeof challengeImage == 'object' && challengeImage.url && (
            <div className={styles.imageContainer}>
              <Media resource={challengeImage} />
            </div>
          )}
          <div className={styles.textContainer}>
            <Title>
              <h3 className={styles.heading}>The Challenge</h3>
            </Title>
            <p>{challengeDescription}</p>
          </div>
        </div>
        <div className={styles.solutionContainer}>
          <div className={styles.textContainer}>
            <Title>
              <h3 className={styles.heading}>Our Solution</h3>
            </Title>
            <div className={styles.richTextContainer}>
              <RichText
                className={styles.richText}
                data={solutionDescription}
                enableGutter={false}
              />
            </div>
          </div>
          {solutionImage && typeof solutionImage == 'object' && solutionImage.url && (
            <div className={styles.imageContainer}>
              <Media resource={solutionImage} />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const caseData = await queryCaseBySlug({ slug })

  return generateMeta({ doc: caseData })
}

const queryCaseBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'cases',
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
