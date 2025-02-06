import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import styles from './footer.module.scss'
import { FooterLogo } from '@/components/Logo/FooterLogo'
import { Title } from '@/components/Title/Title'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const socials = footerData?.socials || null
  const slogan = footerData?.slogan || 'Innovate. Integrate. Elevate'
  const address = footerData?.address || ''
  const contacts = footerData?.contacts || ''

  return (
    <footer className={styles.container}>
      <div className={styles.leftRow}>
        <Link className={styles.footerLogo} href="/">
          <FooterLogo className={styles.logo} />
          <Title>
            <p className={styles.footerTitle}>Orinix</p>
          </Title>
        </Link>
        <p className={styles.slogan}>{slogan}</p>

        <ul className={styles.socialLinks}>
          <li className={styles.logo}>
            <Link href={socials?.Google || '/'}>
              <SocialLink alt="google" path="/Google_Icon.svg" />
            </Link>
          </li>
          <li className={styles.logo}>
            <Link href={socials?.Facebook || '/'}>
              <SocialLink alt="facebook" path="/Facebook_Icon.svg" />
            </Link>
          </li>
          <li className={styles.logo}>
            <Link href={socials?.Linkedin || '/'}>
              <SocialLink alt="linkedin" path="/LinkedIn_Icon.svg" />
            </Link>
          </li>
          <li className={styles.logo}>
            <Link href={socials?.X || '/'}>
              <SocialLink alt="X" path="/X_Icon.svg" />
            </Link>
          </li>
          <li className={styles.logo}>
            <Link href={socials?.Google || '/'}>
              <SocialLink alt="telegram" path="/TG_Icon.svg" />
            </Link>
          </li>
        </ul>
      </div>
      <div className={styles.rightRow}>
        <div>
          <h3>Address</h3>
          <p dangerouslySetInnerHTML={{ __html: address }} />
        </div>
        <div>
          <h3>Contacts</h3>
          <p>{contacts}</p>
        </div>
      </div>
    </footer>
  )
}

type SocialLinkProps = {
  alt: string
  path: string
}

const SocialLink = ({ alt, path }: SocialLinkProps) => {
  return (
    /* eslint-disable @next/next/no-img-element */
    <img alt={alt} className={styles.socialLinkIcon} src={path} />
  )
}
