import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Menu | Roasted Nomad — Coffee, Brunch & Cocktails Winnipeg',
  description: 'Full menu for Roasted Nomad Winnipeg. Breakfast, brunch, coffee, cocktails and more. 393 Marion Street, open Tuesday–Sunday 8AM–2:30PM.',
  alternates: {
    canonical: 'https://roasted-nomad.vercel.app/menu',
  },
}

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
