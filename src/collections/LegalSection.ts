import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'

export const LegalSection: CollectionConfig = {
  slug: 'legalSection',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'termsOfUse',
      type: 'richText',
      required: true,
    },
    {
      name: 'privacyPolicy',
      type: 'richText',
      required: true,
    },
    ...slugField(),
  ],
}
