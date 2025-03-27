'use client'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'
import styles from './card.module.scss'
import type { Post } from '@/payload-types'
import { Media } from '../Media'

export type CardPostData = Pick<Post, 'slug' | 'categories' | 'meta' | 'title' | 'previewImage'>

export const Card: React.FC<{
  alignItems?: 'center'
  className?: string
  doc?: CardPostData
  relationTo?: 'blogs'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { card, link } = useClickableCard({})
  const { doc, relationTo } = props

  const { slug, title, previewImage } = doc || {}

  const href = `/${relationTo}/${slug}`

  return (
    <Link href={href} ref={link.ref} className={styles.container}>
      <article ref={card.ref}>
        <div className={styles.imageContainer}>
          {previewImage && typeof previewImage == 'object' && previewImage.url && (
            <Media resource={previewImage} />
          )}
        </div>
        <div className={styles.contentContainer}>
          <p className={styles.category}>Category</p>
          {title && <p className={styles.title}>{title}</p>}
        </div>
      </article>
    </Link>
  )
}
