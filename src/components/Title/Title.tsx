import { Albert_Sans } from 'next/font/google'
import { ReactNode } from 'react'

const albertSans = Albert_Sans({
  subsets: ['latin'],
  weight: '900',
})

type Props = {
  children: ReactNode
  className?: string
}

export const Title = ({ children, className }: Props) => {
  return <div className={`${albertSans.className} ${className}`}>{children}</div>
}
