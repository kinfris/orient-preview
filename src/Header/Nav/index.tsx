'use client'

import React, { useState } from 'react'

import type { Header as HeaderType, Service } from '@/payload-types'

import Link from 'next/link'
import styles from './nav.module.scss'
import { Popup } from '@/components/Popup/Popup'

export const HeaderNav: React.FC<{ servicesData: Partial<Service>[] }> = ({ servicesData }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false)

  return (
    <nav className={styles.navigation}>
      <Link href="/cases" className={styles.link}>
        <span>Cases</span>
      </Link>
      <Link href="/blogs" className={styles.link}>
        <span>Blog</span>
      </Link>
      <div className={styles.link} onClick={() => setIsPopupOpen(true)}>
        <span>Services</span>
      </div>
      <Link href="/contact" className={styles.link}>
        <span>Contact Us</span>
      </Link>
      <Popup isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} servicesData={servicesData} />
    </nav>
  )
}
