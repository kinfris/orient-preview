'use client'

import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import styles from './header.module.scss'

import type { Service } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Title } from '@/components/Title/Title'
import { usePathname } from 'next/navigation'
import { MobileNav } from './MobileNav'

interface HeaderClientProps {
  servicesData: Partial<Service>[]
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ servicesData }) => {
  const [menuOpen, setMenuOpen] = useState(true)
  const pathname = usePathname()
  const hideBg =
    pathname === '/' ||
    pathname === '/cases' ||
    pathname === '/services' ||
    pathname === '/blog' ||
    pathname === '/services' ||
    pathname === '/privacy-policy' ||
    pathname === '/terms-of-use'

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev)
  }

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const onNavClickHandler = () => {
    setMenuOpen(false)
  }

  return (
    <>
      <header className={`${styles.container} ${hideBg ? styles.transparentBg : ''}`}>
        <div className={styles.wrapper}>
          <Link href="/" className={styles.headerLogo}>
            <Logo loading="eager" priority="high" className={styles.logo} />
            <Title>
              <p className={styles.headerTitle}>Orinix</p>
            </Title>
          </Link>
          <div className={styles.serviceDataContainer}>
            <HeaderNav servicesData={servicesData} />
          </div>
          <div className={styles.burgerIconContainer} onClick={toggleMenu}>
            <img src="/burger_icon.svg" alt="" />
          </div>
        </div>
      </header>
      {menuOpen && (
        <div className={styles.fullscreenModal}>
          <div className={styles.modalContent}>
            <div className={styles.backgroundImage}></div>
            <div className={styles.backgroundGradient}></div>
            <div className={styles.modalContentContainer}>
              <div className={styles.modalTopContent}>
                <Link href="/" className={styles.headerLogo} onClick={onNavClickHandler}>
                  <Logo loading="eager" priority="high" className={styles.logo} />
                  <Title>
                    <p className={styles.headerTitle}>Orinix</p>
                  </Title>
                </Link>
                <button className={styles.closeButton} onClick={toggleMenu}>
                  ✕
                </button>
              </div>

              <MobileNav onClick={onNavClickHandler} servicesData={servicesData} />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
