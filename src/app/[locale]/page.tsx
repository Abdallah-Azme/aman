import BrandsSection from "@/components/home/brands-section";
import ContactBox from "@/components/home/contact-box";
import Faqs from "@/components/home/faqs";
import FranchiseSection from "@/components/home/franchise-section";
import GoalSection from "@/components/home/goal-section";
import HeroSection from "@/components/home/hero-section";
import ProjectSection from "@/components/home/project-section";
import StrategicSection from "@/components/home/strategic-section";
import TeamSection from "@/components/home/team-section";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <GoalSection />
        <BrandsSection />
        <ProjectSection />
        <FranchiseSection />
        <StrategicSection />
        <TeamSection />
        <Faqs />
      </main>
      <ContactBox />
      <Footer />
    </>
  );
}
