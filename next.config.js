import { withPayload } from '@payloadcms/next/withPayload'
import redirects from './redirects.js'

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // URL твоего сайта (где изображения идут через Payload API, если нужно)
      ...[NEXT_PUBLIC_SERVER_URL].map((item) => {
        const url = new URL(item)

        return {
          hostname: url.hostname,
          protocol: url.protocol.replace(':', ''),
        }
      }),
      // URL прямого доступа к S3 изображениям
      {
        protocol: 'https',
        hostname: `idrQpOuyUi/McbygkN+JhgPggAjo683enLTrWeAp.eu-north-1.amazonaws.com`,
      },
    ],
  },
  reactStrictMode: true,
  redirects,
}

export default withPayload(nextConfig)
