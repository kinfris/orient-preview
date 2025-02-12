import type { Metadata } from 'next/types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import styles from './cases.module.scss'
import { Title } from '@/components/Title/Title'
import Image from 'next/image'
import { CaseComponent } from '@/components/Case/Case'
import { CaseHeader } from '@/components/CaseHeader/CaseHeader'
import { Case } from '@/payload-types'
import Link from 'next/link'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Cases() {
  const payload = await getPayload({ config: configPromise })

  const caseData = await payload.find({
    collection: 'cases',
    overrideAccess: false,
  })

  const cases = caseData.docs

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <CaseHeader />
        <div className={styles.casesContainer}>
          {cases &&
            cases.length > 0 &&
            cases.map((el: Case) => {
              return (
                <Link href={`/cases/${el.slug}`} key={el.id} className={styles.case}>
                  <CaseComponent caseData={el} />
                </Link>
              )
            })}
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
