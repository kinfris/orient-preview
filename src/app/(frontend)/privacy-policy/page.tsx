import type { Metadata } from 'next/types'
import configPromise from '@payload-config'
import { getPayload } from 'payload'

import React from 'react'
import styles from './privacyPolicy.module.scss'
import RichText from '@/components/RichText'

export default async function Page() {
  const payload = await getPayload({ config: configPromise })
  const data = await payload.find({
    collection: 'legalSection',
    overrideAccess: false,
    select: {
      privacyPolicy: true,
    },
  })

  const privacyPolicyData = data.docs[0]

  return (
    <div className={styles.wrapper}>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <h2>Privacy policy</h2>

        {privacyPolicyData && (
          <RichText
            className={styles.richtext}
            data={privacyPolicyData.privacyPolicy}
            enableGutter={false}
          />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Privacy Policy`,
  }
}
