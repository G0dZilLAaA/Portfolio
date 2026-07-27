import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import About from "../components/home/About";
import Skills from "../components/home/Skills";
import FeaturedProjects from "../components/home/FeaturedProjects";
import Footer from "../components/layout/Footer";
import Experience from "../components/home/Experience";
import Contact from "../components/home/Contact";

export default function Home() {
    return (
<>
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <Experience />
    <FeaturedProjects />
    <Contact />
    <Footer />
</>
    );
}