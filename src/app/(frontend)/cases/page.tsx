import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import styles from './cases.module.scss'
import { CaseHeader } from '@/components/CaseHeader/CaseHeader'
import CasesList from '@/components/Case/CaseList'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Cases() {
  const payload = await getPayload({ config: configPromise })

  const caseData = await payload.find({
    collection: 'cases',
    limit: 3,
    overrideAccess: false,
  })

  const cases = caseData.docs

  return (
    <div className={styles.wrapper}>
      <div className={styles.backgroundContainer}></div>
      <div className={styles.casesBackgroundContainer}></div>
      <div className={styles.container}>
        <CaseHeader />
        <div className={styles.casesContainer}>
          {cases && cases.length > 0 && <CasesList initialCases={caseData.docs} />}
        </div>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Cases`,
  }
}
