import { Nav } from "../components/landing/Nav";
import { Hero } from "../components/landing/Hero";
import { Services } from "../components/landing/Services";
import { Offer } from "../components/landing/Offer";
import { AboutUs } from "../components/landing/AboutUs";
import { Join } from "../components/landing/Join";
import { Footer } from "../components/landing/Footer";
import { Video } from "../components/landing/Video";

export const LandingPage = () => {
  return (
    <>
    <Nav />
    <div className="w-full max-xl:70vh lg:w-60vw">
      <Hero />
      <Video/>
      <Offer />
      <Services />
      <AboutUs />
      <Join />
      <Footer />
      </div>
    </>
  )
}
