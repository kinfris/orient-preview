import type { Metadata } from 'next/types'

import React from 'react'
import styles from './privacyPolicy.module.scss'

export default async function Page() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.background}></div>
      <div className={styles.container}>
        <h2>Privacy policy</h2>
        <p>
          [Company Name] (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to
          protecting your privacy. This Privacy Policy explains how we collect, use, and protect
          your personal information when you use [Your Website Name] (the &quot;Website&quot;). We
          may collect the following types of information:- **Personal Information**: [Example: Name,
          email address, phone number]- **Technical Information**: [Example: IP address, browser
          type, device information]- **Usage Data**: [Example: Pages visited, time spent on the
          Website]We use your information for the following purposes:- To provide and maintain our
          Website- To improve user experience- To send promotional materials (if you have opted in)-
          To comply with legal obligations## 4. Data SharingWe may share your information with third
          parties in the following circumstances:- With your consent- To comply with legal
          requirements- To protect our rights and property- With service providers who assist us in
          operating the Website## 5. Data SecurityWe take reasonable measures to protect your
          information from unauthorized access, disclosure, or destruction. However, no method of
          transmission over the internet is 100% secure.## 6. Your RightsDepending on your location,
          you may have the following rights regarding your personal data:- The right to access your
          data- The right to request correction or deletion- The right to object to processing- The
          right to withdraw consent## 7. CookiesWe use cookies to enhance your experience on our
          Website. You can manage your cookie preferences through your browser settings.## 8.
          Changes to This PolicyWe may update this Privacy Policy from time to time. Any changes
          will be posted on this page, and your continued use of the Website constitutes acceptance
          of the updated policy.## 9. Contact InformationIf you have any questions about this
          Privacy Policy, please contact us at [Your Email Address].
        </p>
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Privacy Policy`,
  }
}
