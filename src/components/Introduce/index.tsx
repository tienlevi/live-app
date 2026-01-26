import CTA from "./CTA";
import Feature from "./Feature";
import Hero from "./Hero";
import Stats from "./Stats";

function Introduce() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Stats />
      <Feature />
      <CTA />
    </div>
  );
}

export default Introduce;
