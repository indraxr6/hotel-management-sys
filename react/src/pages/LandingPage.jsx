import { Footer, Navbar } from '../components';
import Carousel from '../components/landingpage/carousel/Carousel';
import Features from '../components/landingpage/features/Features';

export default function SplitScreen() {
  return (
    <>
      <Navbar />
      <Carousel />
      <Features />
      <Footer />
    </>
  );
}