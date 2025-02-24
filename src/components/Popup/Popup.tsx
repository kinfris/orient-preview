import { useEffect, useRef } from 'react'
import styles from './popup.module.scss'
import { Service } from '@/payload-types'
import { Media } from '../Media'
import Link from 'next/link'

type Props = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  servicesData: Partial<Service>[]
}

export const Popup = ({ isOpen, setIsOpen, servicesData }: Props) => {
  const popupRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, setIsOpen])

  return (
    <>
      {isOpen && (
        <div className={styles.overlay}>
          <div ref={popupRef} className={styles.popup}>
            {servicesData &&
              servicesData.length > 0 &&
              servicesData.map((el) => {
                return (
                  <Link
                    href={`/services/${el.slug}`}
                    className={styles.service}
                    key={el.id}
                    onClick={() => setIsOpen(false)}
                  >
                    {el.serviceIcon && typeof el.serviceIcon == 'object' && el.serviceIcon.url && (
                      <Media resource={el.serviceIcon} loading="eager" />
                    )}
                    <p>{el.serviceName}</p>
                  </Link>
                )
              })}
          </div>
        </div>
      )}
    </>
  )
}
