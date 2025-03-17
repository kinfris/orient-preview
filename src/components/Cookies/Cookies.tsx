'use client'

import Link from 'next/link'
import styles from './cookies.module.scss'
import { useState, useEffect } from 'react'

const COOKIE_STORAGE_KEY = 'cookieConsent'

export const Cookies = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_STORAGE_KEY)
    if (!consent) {
      setIsVisible(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, 'accepted')
    setIsVisible(false)
  }

  const handleDecline = () => {
    localStorage.setItem(COOKIE_STORAGE_KEY, 'declined')
    setIsVisible(false)
  }

  const handleClose = () => {
    setIsVisible(false)
  }

  if (!isVisible) return null

  return (
    <div className={styles.container}>
      <div className={styles.start}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
        >
          <path
            d="M11.5051 8.0742C11.0741 8.0742 10.7088 7.92352 10.409 7.62217C10.1093 7.32083 9.95946 6.95491 9.95946 6.5244C9.95946 6.0939 10.1103 5.72896 10.412 5.42957C10.7136 5.13018 11.08 4.98048 11.5109 4.98048C11.9419 4.98048 12.3072 5.13116 12.607 5.43251C12.9067 5.73385 13.0565 6.09978 13.0565 6.53029C13.0565 6.96078 12.9057 7.32572 12.604 7.62511C12.3023 7.92451 11.936 8.0742 11.5051 8.0742ZM13.5032 13.0641C13.0722 13.0641 12.7069 12.9134 12.4072 12.612C12.1074 12.3107 11.9576 11.9448 11.9576 11.5143C11.9576 11.0838 12.1084 10.7188 12.4101 10.4194C12.7118 10.1201 13.0781 9.97036 13.5091 9.97036C13.94 9.97036 14.3054 10.121 14.6051 10.4224C14.9048 10.7237 15.0547 11.0896 15.0547 11.5202C15.0547 11.9507 14.9038 12.3156 14.6021 12.615C14.3005 12.9144 13.9341 13.0641 13.5032 13.0641ZM7.01223 14.0122C6.72917 14.0122 6.49189 13.9165 6.3004 13.7252C6.10892 13.534 6.01317 13.2969 6.01317 13.0142C6.01317 12.7314 6.10892 12.4944 6.3004 12.3031C6.49189 12.1118 6.72917 12.0162 7.01223 12.0162C7.2953 12.0162 7.53258 12.1118 7.72406 12.3031C7.91555 12.4944 8.01129 12.7314 8.01129 13.0142C8.01129 13.2969 7.91555 13.534 7.72406 13.7252C7.53258 13.9165 7.2953 14.0122 7.01223 14.0122ZM10.0036 20C11.3728 20 12.6652 19.738 13.8808 19.2141C15.0963 18.6902 16.1578 17.9749 17.0653 17.0684C17.9727 16.162 18.6887 15.1016 19.2132 13.8874C19.7377 12.6732 20 11.3842 20 10.0203C20 8.49003 19.6753 7.0596 19.0259 5.72896C18.3765 4.39833 17.5065 3.27145 16.4159 2.34832C15.3252 1.4252 14.0681 0.759879 12.6444 0.352373C11.2208 -0.0551332 9.74299 -0.10919 8.2111 0.190202C8.31101 0.938683 8.2444 1.64558 8.01129 2.3109C7.77818 2.97621 7.42434 3.54173 6.94979 4.00746C6.47524 4.47318 5.90494 4.81415 5.2389 5.03038C4.57286 5.24661 3.87352 5.29651 3.14088 5.18008C3.4739 6.19468 3.29074 7.10534 2.5914 7.91203C1.89205 8.71873 1.04285 9.16366 0.0437946 9.24682C-0.0894127 10.6939 0.0812588 12.0661 0.555813 13.3635C1.03036 14.6608 1.72554 15.8002 2.64135 16.7815C3.55715 17.7629 4.64608 18.5446 5.90812 19.1268C7.17017 19.7089 8.53531 20 10.0036 20Z"
            fill="#7959B6"
          />
        </svg>
        <p>
          By using our site, you agree to our <Link href="/cookies">use of cookies</Link>.
        </p>
      </div>

      <div className={styles.btnGroup}>
        <button onClick={handleAccept} className={styles.acceptBtn}>
          OK
        </button>
        <button onClick={handleDecline}>REJECT ALL</button>
        <button onClick={handleClose} className={styles.closeBtn}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M18 6L6 18"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 6L18 18"
              stroke="white"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
