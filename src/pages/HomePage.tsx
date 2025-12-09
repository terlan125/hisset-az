import { Header } from '../components/Header';
import { Hero } from '../components/Hero';
import { CategorySection } from '../components/CategorySection';
import { ProductGrid } from '../components/ProductGrid';
import { AboutSection } from '../components/AboutSection';
import { FeatureSection } from '../components/FeatureSection';
import { Footer } from '../components/Footer';

interface HomePageProps {
  navigate: (page: any, productId?: number) => void;
}

export function HomePage({ navigate }: HomePageProps) {
  return (
    <>
      <Header navigate={navigate} />
      <main>
        <Hero navigate={navigate} />
        <CategorySection />
        <ProductGrid navigate={navigate} />
        <AboutSection />
        <FeatureSection />
      </main>
      <Footer />
    </>
  );
}