import { 
  Hero, 
  BlueBanner, 
  Services, 
  VideoSection, 
  SocialMediaSection,
  CallToActionSection,
  NewsSection,
  LocationsMap,
  CollaboratorsSection
} from '../ui/sections'

export function HomePage() {
  return (
    <div className="homepage">
      <Hero />
      <BlueBanner />
      <Services />
      <VideoSection />
      <SocialMediaSection />
      <CallToActionSection />
      <CollaboratorsSection />
      <NewsSection />
      <LocationsMap />
    </div>
  )
}
