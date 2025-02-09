'use client'

import React from 'react'

import type { Header as HeaderType } from '@/payload-types'

import Link from 'next/link'
import styles from './nav.module.scss'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  return (
    <nav className={styles.navigation}>
      <Link href="/cases" className={styles.link}>
        <span>Cases</span>
      </Link>
      <Link href="/blogs" className={styles.link}>
        <span>Blog</span>
      </Link>
      <div className={styles.link}>
        <span>Services</span>
      </div>
      <Link href="/contact" className={styles.link}>
        <span>Contact Us</span>
      </Link>
    </nav>
  )
}
