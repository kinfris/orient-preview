import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { authenticatedOrPublished } from '../../access/authenticatedOrPublished'
import { generatePreviewPath } from '../../utilities/generatePreviewPath'
import { populateAuthors } from './hooks/populateAuthors'
import { revalidateDelete, revalidatePost } from './hooks/revalidatePost'

export const Home: CollectionConfig<'home'> = {
  slug: 'home',
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    title: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'updatedAt'],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === 'string' ? data.slug : '',
          collection: 'home',
          req,
        })

        return path
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === 'string' ? data.slug : '',
        collection: 'home',
        req,
      }),
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'logos',
      type: 'array',
      fields: [
        {
          name: 'logoImage',
          type: 'upload',
          relationTo: 'media',
        },
        {
          name: 'logoTitle',
          type: 'text',
        },
      ],
      required: true,
    },
    {
      name: 'reviews',
      type: 'array',
      fields: [
        {
          name: 'stars',
          type: 'number',
          required: true,
          min: 1,
          max: 5,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
          maxLength: 220,
        },
        {
          name: 'reviewerName',
          type: 'text',
          required: true,
        },
        {
          name: 'reviewerPosition',
          type: 'text',
          required: true,
        },
        {
          name: 'reviewerCompany',
          type: 'text',
          required: true,
        },
        {
          name: 'projectDescription',
          type: 'textarea',
          required: true,
        },
        {
          name: 'fullCaseLink',
          type: 'text',
        },
      ],
      required: true,
    },
    {
      name: 'showTeamSection',
      type: 'checkbox',
    },
    {
      name: 'team',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'position',
          type: 'text',
          required: true,
        },
        {
          name: 'gmail',
          type: 'email',
        },
        {
          name: 'linkedin',
          type: 'text',
        },
      ],
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
