import { Helmet } from "react-helmet-async";
import AppBar from "../../components/AppBar/AppBar.jsx";
import HeroSection from "../../components/HeroSection/HeroSection.jsx";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <AppBar />

      <HeroSection />
    </>
  );
}
