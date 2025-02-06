import Link from 'next/link'
import React from 'react'
import styles from './header.module.scss'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { Title } from '@/components/Title/Title'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  return (
    <header className={styles.container}>
      <Link href="/" className={styles.headerLogo}>
        <Logo loading="eager" priority="high" className={styles.logo} />
        <Title>
          <p className={styles.headerTitle}>Orinix</p>
        </Title>
      </Link>
      <HeaderNav data={data} />
    </header>
  )
}
