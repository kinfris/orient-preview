import { cn } from '@/utilities/ui'
import React from 'react'
import styles from './collectionArchive.module.scss'

import { Card, CardPostData } from '@/components/Card'

export type Props = {
  blogs: CardPostData[]
}

export const CollectionArchive: React.FC<Props> = (props) => {
  const { blogs } = props

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.postsContainer}>
          {blogs?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div className={styles.post} key={index}>
                  <Card className="h-full" doc={result} relationTo="blogs" showCategories />
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    </div>
  )
}
