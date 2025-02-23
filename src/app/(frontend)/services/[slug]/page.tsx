import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import styles from './service.module.scss'
import { draftMode } from 'next/headers'
import { generateMeta } from '@/utilities/generateMeta'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'

type Args = {
  params: Promise<{
    slug?: string
  }>
}

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

export default async function Service({ params: paramsPromise }: Args) {
  const { slug = '' } = await paramsPromise
  const caseData = await queryServiceBySlug({ slug })

  if (!caseData) return <PayloadRedirects url={'/'} />

  const { serviceIcon, serviceName, shortDescription, fullDescription, count, countName } = caseData

  const [firstWord, ...remainingWords] = serviceName?.split(' ') || []
  const restOfName = remainingWords.join(' ')

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.topContent}>
          <div className={styles.titleContainer}>
            <div className={styles.iconContainer}>
              <h1>
                <div className={styles.firstRow}>
                  {serviceIcon && typeof serviceIcon == 'object' && serviceIcon.url && (
                    <Media resource={serviceIcon} />
                  )}
                  <p>{firstWord}</p>
                </div>
                <p>{restOfName}</p>
              </h1>
            </div>
            <div className={styles.buttonContainer}>
              <button>Order Now</button>
              <button>Get a Quote</button>
            </div>
          </div>
          <p className={styles.shortDescription}>{shortDescription}</p>
        </div>

        <div className={styles.bottomContainer}>
          {/* @ts-ignore */}
          <RichText className={styles.richText} data={fullDescription} enableGutter={false} />
          <div className={styles.extraContainer}>
            <p className={styles.extraContainerCount}>{count}</p>
            <p className={styles.extraContainerName}>{countName}</p>
          </div>
        </div>
      </div>
      <div className={styles.backgroundContainer}></div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '' } = await paramsPromise
  const serviceData = await queryServiceBySlug({ slug })

  return generateMeta({ doc: serviceData })
}

const queryServiceBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'services',
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
