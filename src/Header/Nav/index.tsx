'use client'

import React, { useState } from 'react'

import type { Service } from '@/payload-types'

import Link from 'next/link'
import styles from './nav.module.scss'
import { Popup } from '@/components/Popup/Popup'
import { usePathname } from 'next/navigation'

export const HeaderNav: React.FC<{ servicesData: Partial<Service>[] }> = ({ servicesData }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className={styles.navigation}>
      <Link
        href="/cases"
        className={`${styles.link} ${pathname === '/cases' ? styles.active : null}`}
      >
        <span>Cases</span>
      </Link>
      <Link
        href="/blogs"
        className={`${styles.link} ${pathname === '/blogs' ? styles.active : null}`}
      >
        <span>Blog</span>
      </Link>
      <div className={styles.link} onClick={() => setIsPopupOpen(true)}>
        <span>Services</span>
      </div>
      <Link
        href="/contact"
        className={`${styles.link} ${pathname === '/contact' ? styles.active : null}`}
      >
        <span>Contact Us</span>
      </Link>
      <Popup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} servicesData={servicesData} />
    </nav>
  )
}
