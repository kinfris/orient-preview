import type { GlobalConfig } from 'payload'

import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    { name: 'slogan', type: 'text' },
    {
      name: 'socials',
      type: 'group',
      fields: [
        {
          name: 'Google',
          type: 'text',
          validate: (value: any) => Boolean(value) || 'This field is required',
        },
        {
          name: 'Instagram',
          type: 'text',
          validate: (value: any) => Boolean(value) || 'This field is required',
        },
        {
          name: 'Linkedin',
          type: 'text',
          validate: (value: any) => Boolean(value) || 'This field is required',
        },
      ],
    },
    { name: 'address', type: 'text' },
    { name: 'contacts', type: 'email' },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
