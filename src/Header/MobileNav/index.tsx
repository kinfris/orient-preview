import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './mobileNav.module.scss'

export const MobileNav = () => {
  const pathname = usePathname()

  console.log('pathname - ', pathname)

  return (
    <nav className={styles.container}>
      <Link
        href="/cases"
        className={`${styles.link} ${pathname.startsWith('/cases') ? styles.active : null}`}
      >
        <span>Cases</span>
      </Link>
      <Link
        href="/blogs"
        className={`${styles.link} ${pathname.startsWith('/blogs') ? styles.active : null}`}
      >
        <span>Blog</span>
      </Link>

      <Link
        className={`${styles.link} ${pathname.startsWith('/services') ? styles.active : null}`}
        href="/services"
      >
        <span>Services</span>
      </Link>

      <Link
        href="/contact"
        className={`${styles.link} ${pathname === '/contact' ? styles.active : null}`}
      >
        <span>Contact Us</span>
      </Link>
    </nav>
  )
}
