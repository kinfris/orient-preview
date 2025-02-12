import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Service } from '../../../payload-types'

export const revalidateService: CollectionAfterChangeHook<Service> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/services/${doc.slug}`

      payload.logger.info(`Revalidating Service at path: ${path}`)

      revalidatePath(path)
      revalidateTag('service-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/services/${previousDoc.slug}`

      payload.logger.info(`Revalidating old service at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('service-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Service> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/services/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('service-sitemap')
  }

  return doc
}
