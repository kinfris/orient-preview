import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'
import styles from './case.module.scss'

import { generateMeta } from '@/utilities/generateMeta'

import { Media } from '@/components/Media'
import { Title } from '@/components/Title/Title'
import Link from 'next/link'
import OtherCases from '@/components/Case/OtherCases'
import { ButtonLink } from '@/components/ButtonLink/ButtonLink'

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
    taskDescription,
    taskImage,
    resultDescription,
    resultImage,
    afterTaskResultDescription,
    carouselImage1,
    carouselImage2Vertical,
    carouselImage3,
    endDescription,
  } = caseData

  return (
    <article className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.breadcrumbs}>
          <div className={styles.breadcrumbsStart}>
            <Link href={'/cases'}>Cases</Link>
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
          <p>{projectName}</p>
        </div>
        <div className={styles.caseContainer}>
          <div className={styles.topContent}>
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
            <div className={styles.btnContainer}>
              <ButtonLink href={'/contact'} title="Get A Quote" />
            </div>
          </div>

          <Title>
            <h1 className={styles.projectName}>{projectName}</h1>
          </Title>
          <div className={styles.imageContainer}>
            {heroImage && typeof heroImage == 'object' && heroImage.url && (
              <Media resource={heroImage} />
            )}
          </div>
          <div className={styles.firstSection}>
            {taskDescription && (
              <div className={styles.fsBlockContainer}>
                <h4>Task</h4>
                <RichText className={styles.richText} data={taskDescription} enableGutter={false} />
              </div>
            )}
            {taskImage && (
              <div className={`${styles.fsImageContainer} ${styles.fsImageMobileContainer}`}>
                <Media resource={taskImage} />
                <img src="/case_task.png" alt="" />
              </div>
            )}
            {resultDescription && (
              <div className={styles.fsBlockContainer}>
                <h4>Result</h4>
                <RichText
                  className={styles.richText}
                  data={resultDescription}
                  enableGutter={false}
                />
              </div>
            )}
            {resultImage && (
              <div className={`${styles.fsImageContainer} ${styles.fsImageMobileContainer}`}>
                <Media resource={resultImage} />
              </div>
            )}
            {taskImage && (
              <div className={`${styles.fsImageContainer} ${styles.fsImageDesktopContainer}`}>
                <Media resource={taskImage} />
                <img src="/case_task.png" alt="" />
              </div>
            )}
            {resultImage && (
              <div className={`${styles.fsImageContainer} ${styles.fsImageDesktopContainer}`}>
                <Media resource={resultImage} />
              </div>
            )}
          </div>
          <div className={styles.secondSection}>
            {afterTaskResultDescription && (
              <RichText
                className={styles.richText}
                data={afterTaskResultDescription}
                enableGutter={false}
              />
            )}
            {carouselImage1 && carouselImage2Vertical && carouselImage3 && (
              <div className={styles.imageGallery}>
                <div className={styles.ssImageContainer}>
                  <Media resource={carouselImage1} />
                </div>
                <div className={`${styles.ssImageContainer} ${styles.ssBigImage}`}>
                  <Media resource={carouselImage2Vertical} />
                </div>
                <div className={styles.ssImageContainer}>
                  <Media resource={carouselImage3} />
                </div>
              </div>
            )}
          </div>
          {endDescription && (
            <div className={styles.lastSection}>
              <div className={styles.richTextContainer}>
                <RichText
                  className={`${styles.richText} `}
                  data={endDescription}
                  enableGutter={false}
                />
              </div>
            </div>
          )}
        </div>
        <OtherCases currentPostId={caseData.id} />
      </div>
      <div className={styles.backgroundContainer}></div>
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
