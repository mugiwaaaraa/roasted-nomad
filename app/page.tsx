import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import ScrollStory from '@/components/ScrollStory'
import MarqueeStrip from '@/components/MarqueeStrip'
import OurStory from '@/components/OurStory'
import ScatteredGallery from '@/components/ScatteredGallery'
import SignatureDishes from '@/components/SignatureDishes'
import QuoteSection from '@/components/QuoteSection'
import VisitUs from '@/components/VisitUs'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ScrollStory />
      <MarqueeStrip />
      <OurStory />
      <ScatteredGallery />
      <SignatureDishes />
      <QuoteSection />
      <VisitUs />
      <Footer />
    </>
  )
}
