'use client'

import { useState, useEffect } from 'react'
import { Service } from '@/payload-types'
import styles from './otherServices.module.scss'
import Link from 'next/link'
import { Media } from '../Media'

type Props = {
  currentServiceId: string
}

export default function OtherServices({ currentServiceId }: Props) {
  const [services, setServices] = useState<Service[] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchMoreCases = async () => {
      setLoading(true)

      try {
        const res = await fetch(`/api/services?limit=4&where[id][not_equals]=${currentServiceId}`)
        const data = await res.json()

        if (data.docs.length > 0) {
          setServices(data.docs)
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
      <div className={styles.topContent}>
        <h3>Other Services</h3>
        <Link href={'/services'}>See all</Link>
      </div>

      {loading && (
        <div className={styles.spinner}>
          <div></div>
        </div>
      )}
      <div className={styles.servicesContainer}>
        {services &&
          services.map((el: Service) => {
            const url = `${el.slug}`

            return (
              <Link key={el.id} href={el.slug ? url : ''} className={styles.service}>
                <Media resource={el.serviceIcon ?? ''} />
                <h4>{el.title}</h4>
                <p>{el.shortDescription}</p>
              </Link>
            )
          })}
      </div>
    </div>
  )
}
