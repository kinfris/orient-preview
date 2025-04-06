import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './mobileNav.module.scss'
import { Service } from '@/payload-types'
import { Media } from '@/components/Media'
import { useState } from 'react'

type Props = {
  onClick: () => void
  servicesData: Partial<Service>[]
}

export const MobileNav = ({ onClick, servicesData }: Props) => {
  const [isShowMenu, setIsShowMenu] = useState(false)
  const pathname = usePathname()
  const isSubServicePage = /^\/services\/[^/]+$/.test(pathname)

  return (
    <nav className={styles.container}>
      {isSubServicePage && (
        <div className={styles.topNav}>
          <p onClick={() => setIsShowMenu(true)} className={isShowMenu ? styles.activeTop : ''}>
            Menu
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
          >
            <path
              d="M8 17L14 10.985L8 5"
              stroke="white"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <p onClick={() => setIsShowMenu(false)} className={!isShowMenu ? styles.activeTop : ''}>
            Services
          </p>
        </div>
      )}
      {!isSubServicePage || isShowMenu ? (
        <>
          <Link
            href="/cases"
            className={`${styles.link} ${pathname.startsWith('/cases') ? styles.active : null}`}
            onClick={onClick}
          >
            <span>Cases</span>
          </Link>
          <Link
            href="/blogs"
            className={`${styles.link} ${pathname.startsWith('/blogs') ? styles.active : null}`}
            onClick={onClick}
          >
            <span>Blog</span>
          </Link>

          <Link
            className={`${styles.link} ${pathname.startsWith('/services') ? styles.active : null}`}
            href="/services"
            onClick={onClick}
          >
            <span>Services</span>
          </Link>

          <Link
            href="/contact"
            className={`${styles.link} ${pathname === '/contact' ? styles.active : null}`}
            onClick={onClick}
          >
            <span>Contact Us</span>
          </Link>
        </>
      ) : (
        <div className={styles.subLinks}>
          {servicesData.map((service) => {
            const slug = service.slug || ''
            const servicePath = `/services/${slug}`

            return (
              <Link
                key={slug}
                href={servicePath}
                className={`${styles.subLink} ${pathname === `/services/${service.slug}` ? styles.active : null}`}
                onClick={onClick}
              >
                <Media resource={service.serviceIcon ?? ''} />
                <span>{service.serviceName}</span>
              </Link>
            )
          })}
        </div>
      )}
    </nav>
  )
}
