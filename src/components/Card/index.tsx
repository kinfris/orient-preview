'use client'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'
import styles from './card.module.scss'
import Image from 'next/image'

import type { Post } from '@/payload-types'

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
            <Image src={previewImage.url} width={597} height={279} alt={previewImage.alt ?? ''} />
          )}
        </div>

        {title && <p className={styles.title}>{title}</p>}
      </article>
    </Link>
  )
}
