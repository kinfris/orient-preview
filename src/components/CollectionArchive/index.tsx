'use client'

import React, { useState } from 'react'
import styles from './collectionArchive.module.scss'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  initBlogs: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = ({ initBlogs }) => {
  const [blogs, setBlogs] = useState(initBlogs)
  const [loading, setLoading] = useState(false)

  const loadAllBlogs = async () => {
    setLoading(true)

    try {
      const res = await fetch(`/api/blogs`)
      const data = await res.json()

      if (data.docs.length > 0) {
        setBlogs(data.docs)
      }
    } catch (error) {
      console.error('Ошибка при загрузке данных', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.topContent}>
        <h3>Recent Posts</h3>
        <button onClick={loadAllBlogs}>See All</button>
      </div>
      {loading && (
        <div className={styles.spinner}>
          <div></div>
        </div>
      )}
      <div className={styles.postsContainer}>
        {blogs?.map((result, index) => {
          if (typeof result === 'object' && result !== null && index !== 0) {
            return (
              <Card
                key={(result.slug ?? index).toString() + index}
                className="h-full"
                doc={result}
                relationTo="blogs"
                showCategories
              />
            )
          }
          return null
        })}
      </div>
    </div>
  )
}
