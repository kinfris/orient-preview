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
import { CaseHeader } from '@/components/CaseHeader/CaseHeader'
import { Title } from '@/components/Title/Title'
import Link from 'next/link'
import OtherCases from '@/components/Case/OtherCases'

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
      <div className={styles.wrapper}>
        <div className={styles.breadcrumbs}>
          <Link href={'/cases'}>Cases</Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M9 19L15 12L9 5" stroke="white" stroke-width="1.5" stroke-linecap="round" />
          </svg>
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
            <Link href={'/contact'} className={styles.goToContactBtn}>
              <span>Get A Quote</span>
              <img src="/arrow-icon.svg" alt="" />
            </Link>
          </div>

          <Title>
            <h1 className={styles.projectName}>{projectName}</h1>
          </Title>
          {/* <div className={styles.heroImage}>
            {heroImage && typeof heroImage == 'object' && heroImage.url && (
              <Media resource={heroImage} />
            )}
          </div> */}
          <div className={styles.mainImage}>
            <img src="/case_image_1.png" alt="" />
          </div>
          <div className={styles.firstSection}>
            <div className={styles.fsBlockContainer}>
              <h4>Task</h4>
              <p>
                It’s necessary to analyze the existing design of the Getir app, identifying its
                strengths and weaknesses. Then you should perform a similar analysis of competitors
                apps. It’s imprortant to update the overall design of the Getir app, making it more
                modern and attractive. In addition, it’s necessary to improve the user experience
                (UX) and simplify the navigation of the app.
              </p>
            </div>
            <div className={styles.fsBlockContainer}>
              <h4>Result</h4>
              <p>
                The visual style of the Getir app has become more modern and minimalistic, with an
                emphasis on user-friendliness and aethetic appeal. Thanks to the redesign,
                navigation through the app has become intuitive. Key functions such as restaurant
                selection, checkout and delivery tracking are now available in a few clicks,
                significantly reducing task completion time.
              </p>
            </div>
            <div className={styles.fsImageContainer}>
              <img src="/case_task.png" alt="" />
            </div>
            <div className={styles.fsImageContainer}>
              <img src="/case_result.png" alt="" />
            </div>
          </div>
          <div className={styles.secondSection}>
            <p>
              The visual style of the Getir app has become more modern and minimalistic, with an
              emphasis on user-friendliness and aethetic appeal. Thanks to the redesign, navigation
              through the app has become intuitive. Key functions such as restaurant selection,
              checkout and delivery tracking are now available in a few clicks, significantly
              reducing task completion time.
            </p>
            <div className={styles.imageGallery}>
              <div className={styles.ssImageContainer}>
                <img src="/case_gallery_1.png" alt="" />
              </div>
              <div className={`${styles.ssImageContainer} ${styles.ssBigImage}`}>
                <img src="/case_gallery_3.png" alt="" />
              </div>
              <div className={styles.ssImageContainer}>
                <img src="/case_gallery_2.png" alt="" />
              </div>
            </div>
          </div>
          <div className={styles.lastSection}>
            <p>
              The visual style of the Getir app has become more modern and minimalistic, with an
              emphasis on user-friendliness and aethetic appeal. Thanks to the redesign, navigation
              through the app has become intuitive. Key functions such as restaurant selection,
              checkout and delivery tracking are now available in a few clicks, significantly
              reducing task completion time.
            </p>
            <div className={styles.lsImageContainer}>
              <img src="/case_big_desc.png" alt="" />
            </div>
          </div>
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
