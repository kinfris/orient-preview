'use client'

import { useState, useEffect } from 'react'
import { Case } from '@/payload-types'
import { CaseComponent } from '@/components/Case/Case'
import styles from './otherCases.module.scss'

type Props = {
  currentPostId: string
}

export default function OtherCases({ currentPostId }: Props) {
  const [cases, setCases] = useState<Case[] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchMoreCases = async () => {
      setLoading(true)

      try {
        const res = await fetch(`/api/cases?limit=2&where[id][not_equals]=${currentPostId}`)
        const data = await res.json()

        if (data.docs.length > 0) {
          setCases(data.docs)
        }
      } catch (error) {
        console.error('Ошибка при загрузке данных', error)
      } finally {
        setLoading(false)
      }
    }
    fetchMoreCases()
  }, [])

  return (
    <div className={styles.container}>
      <h3>Other cases</h3>

      {loading && (
        <div className={styles.spinner}>
          <div></div>
        </div>
      )}
      <div className={styles.caseContainer}>
        {cases &&
          cases.map((el: Case, i) => (
            <div key={el.id} className={styles.case}>
              <CaseComponent caseData={el} index={i} reverse={i % 2 == 0} />
            </div>
          ))}
      </div>
    </div>
  )
}
