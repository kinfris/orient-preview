import Link from 'next/link'
import styles from './navigateBtn.module.scss'

export const NavigateBtn = () => {
  return (
    <Link href={'/contact'} className={styles.goToContactBtn}>
      <img src="/contact_icon.svg" alt="" />
    </Link>
  )
}
