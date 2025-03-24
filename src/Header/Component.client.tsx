'use client'

import Link from 'next/link'
import React from 'react'
import styles from './header.module.scss'

import type { Service } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Title } from '@/components/Title/Title'
import { usePathname } from 'next/navigation'

interface HeaderClientProps {
  servicesData: Partial<Service>[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ servicesData }) => {
  const pathname = usePathname()
  const hideBg =
    pathname === '/' ||
    pathname === '/cases' ||
    pathname === '/services' ||
    pathname === '/blog' ||
    pathname === '/services' ||
    pathname === '/privacy-policy' ||
    pathname === '/terms-of-use'

  return (
    <header className={`${styles.container} ${hideBg ? styles.transparentBg : ''}`}>
      <div className={styles.wrapper}>
        <Link href="/" className={styles.headerLogo}>
          <Logo loading="eager" priority="high" className={styles.logo} />
          <Title>
            <p className={styles.headerTitle}>Orinix</p>
          </Title>
        </Link>
        <HeaderNav servicesData={servicesData} />
      </div>
    </header>
  )
}
