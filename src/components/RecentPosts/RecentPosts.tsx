'use client'

import { useEffect, useState } from 'react'
import styles from './recentPosts.module.scss'
import { Card, CardPostData } from '../Card'

type Props = {
  currentBlogId: string
}

export const RecentPosts = ({ currentBlogId }: Props) => {
  const [blogs, setBlogs] = useState<CardPostData[] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const loadRecentBlogs = async () => {
      setLoading(true)

      try {
        const res = await fetch(`/api/blogs?limit=3&where[id][not_equals]=${currentBlogId}`)
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
    loadRecentBlogs()
  }, [])

  return (
    <div className={styles.container}>
      <h3>Recent Posts</h3>
      <div className={styles.blogsContainer}>
        {loading ? (
          <div className={styles.spinner}>
            <div></div>
          </div>
        ) : (
          blogs?.map((result) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <Card
                  key={result.slug}
                  className="h-full"
                  doc={result}
                  relationTo="blogs"
                  showCategories
                />
              )
            }
            return null
          })
        )}
      </div>
    </div>
  )
}
