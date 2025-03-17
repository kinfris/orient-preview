import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import styles from './termsOfUse.module.scss'
import RichText from '@/components/RichText'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.find({
    collection: 'legalSection',
    overrideAccess: false,
    select: {
      termsOfUse: true,
    },
  })

  const termsOfUsePolicyData = data.docs[0]
  return (
    <div className={styles.wrapper}>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <h2>Terms of use</h2>
        {termsOfUsePolicyData && (
          <RichText
            className={styles.richtext}
            data={termsOfUsePolicyData.termsOfUse}
            enableGutter={false}
          />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Terms of use`,
  }
}
