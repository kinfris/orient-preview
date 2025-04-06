import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React, { cache } from 'react'
import styles from './service.module.scss'
import { draftMode } from 'next/headers'
import { generateMeta } from '@/utilities/generateMeta'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import RichText from '@/components/RichText'
import Link from 'next/link'
import OtherServices from '@/components/OtherServices/OtherServices'
import { ButtonLink } from '@/components/ButtonLink/ButtonLink'
import { Media } from '@/components/Media'

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

  const { serviceName, fullDescription, benefits, heroImage } = caseData

  return (
    <div className={styles.wrapper}>
      <div className={styles.gradientContainer}></div>
      <div className={styles.container}>
        <div className={styles.breadcrumbs}>
          <Link href={'/services'}>Services</Link>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path d="M9 19L15 12L9 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p>{serviceName}</p>
        </div>
        <div className={styles.topContent}>
          <div className={styles.descriptionContainer}>
            <h1>{serviceName}</h1>
            <div className={styles.shortDescription}>
              <RichText data={fullDescription} enableGutter={false} />
            </div>
            {heroImage && (
              <div className={styles.topContentImgMobile}>
                <Media resource={heroImage} alt="" className={styles.topContentImg} />
              </div>
            )}
            <div className={styles.benefits}>
              {benefits &&
                benefits.map((el) => {
                  return (
                    <div key={el.id}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="17"
                        height="13"
                        viewBox="0 0 17 13"
                        fill="none"
                      >
                        <path
                          d="M5.86106 12.5219C5.72395 12.5214 5.58838 12.4928 5.4628 12.4378C5.33722 12.3827 5.2243 12.3024 5.13106 12.2019L0.271062 7.03188C0.0893891 6.83828 -0.00793272 6.58043 0.000506415 6.31506C0.00894555 6.0497 0.122454 5.79856 0.316062 5.61688C0.50967 5.43521 0.767518 5.33789 1.03288 5.34633C1.29825 5.35477 1.54939 5.46828 1.73106 5.66188L5.85106 10.0519L14.2611 0.851883C14.3464 0.745606 14.4526 0.657898 14.5731 0.594146C14.6935 0.530395 14.8258 0.491947 14.9617 0.481162C15.0975 0.470378 15.2342 0.487486 15.3632 0.531434C15.4922 0.575383 15.6109 0.645245 15.7119 0.736729C15.813 0.828213 15.8943 0.939388 15.9508 1.06343C16.0073 1.18746 16.0378 1.32174 16.0406 1.45802C16.0433 1.5943 16.0181 1.72969 15.9666 1.85589C15.9151 1.98209 15.8384 2.09643 15.7411 2.19188L6.60106 12.1919C6.5087 12.2942 6.39618 12.3764 6.27055 12.4332C6.14493 12.49 6.00892 12.5202 5.87106 12.5219H5.86106Z"
                          fill="#AC69FD"
                        />
                      </svg>
                      <p>{el.benefit}</p>
                    </div>
                  )
                })}
            </div>
            <div className={styles.btnWrapper}>
              <ButtonLink href={'/contact'} title="Get A Quote" />
            </div>
          </div>
          {heroImage && (
            <div className={styles.topContentImgDesktop}>
              <Media resource={heroImage} alt="" className={styles.topContentImg} />
            </div>
          )}
        </div>

        <OtherServices currentServiceId={caseData.id} />
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  // const { slug = '' } = await paramsPromise
  // const serviceData = await queryServiceBySlug({ slug })

  return generateMeta({ doc: { title: 'Orinix' } })
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
