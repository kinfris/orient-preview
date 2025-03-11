import type { Metadata } from 'next/types'

import React from 'react'
import styles from './contact.module.scss'
import ContactForm from '@/components/ContactForm/ContactForm'

export default async function Page() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.background}></div>
      <ContactForm showTitle />
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Contact`,
  }
}
