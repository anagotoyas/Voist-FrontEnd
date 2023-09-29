import { Nav } from "../components/landing/Nav";
import { Hero } from "../components/landing/Hero";
import { Services } from "../components/landing/Services";
import { Offer } from "../components/landing/Offer";
import { AboutUs } from "../components/landing/AboutUs";
import { Join } from "../components/landing/Join";
import { Footer } from "../components/landing/Footer";

export const LandingPage = () => {
  return (
    <>
    <Nav />
      <Hero />
      <Offer />
      <Services />
      <AboutUs />
      <Join />
      <Footer />
    </>
  )
}
