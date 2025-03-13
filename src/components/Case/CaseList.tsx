'use client'

import { useState, useEffect, useRef } from 'react'
import { Case } from '@/payload-types'
import { CaseComponent } from '@/components/Case/Case'
import styles from './caseList.module.scss'

export default function CasesList({ initialCases }: { initialCases: Case[] }) {
  const [cases, setCases] = useState<Case[]>(initialCases)
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(2)
  const [hasMore, setHasMore] = useState(true) // Флаг, можно ли загружать ещё
  const observerRef = useRef<HTMLDivElement | null>(null)

  // Функция загрузки данных
  const fetchMoreCases = async () => {
    if (loading || !hasMore) return // Если уже загружаем или достигли конца, не вызываем запрос
    setLoading(true)

    try {
      const res = await fetch(`/api/cases?page=${page}&limit=3`)
      const data = await res.json()

      if (data.docs.length > 0) {
        setCases((prev) => [...prev, ...data.docs])
        setPage((prevPage) => prevPage + 1)
      } else {
        setHasMore(false) // Если новых постов нет, выключаем подгрузку
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target?.isIntersecting && !loading && hasMore) {
          setTimeout(() => {
            fetchMoreCases()
          }, 500) // Задержка перед загрузкой
        }
      },
      { threshold: 0.8 },
    )

    if (observerRef.current) observer.observe(observerRef.current)

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current)
    }
  }, [loading, hasMore])

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {cases.map((el: Case, i) => (
          <div key={el.id} className={styles.case}>
            <CaseComponent caseData={el} reverse={i % 2 === 0} />
          </div>
        ))}
        {hasMore && <div ref={observerRef} style={{ height: 100 }}></div>}
        {loading && (
          <div className={styles.spinner}>
            <div></div>
          </div>
        )}
      </div>
    </div>
  )
}
