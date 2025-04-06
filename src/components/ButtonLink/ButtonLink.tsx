'use client'

import Link from 'next/link'
import styles from './buttonLink.module.scss'
import { useEffect, useState } from 'react'

type Props = {
  href: string
  title: string
}

export const ButtonLink = ({ href, title }: Props) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <Link href={href} className={styles.link}>
      <span>{title}</span>
      {!isMobile && (
        <div className={styles.imageContainer}>
          <img src="/arrow-icon.svg" alt="" />
        </div>
      )}
    </Link>
  )
}
