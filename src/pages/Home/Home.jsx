//import '../App.css'
import Navbar from "../Navbar.jsx";
import CarRentalSearch from "./CarRentalSearch.jsx";
import HowItWorks from "./HowItWorks.jsx";
import Features from "./Features.jsx";
import RentalDeals from "./RentalDeals.jsx";
import TestimonialsSection from "./TestimonialsSection.jsx";
import Footer from "./Footer.jsx";
function App() {
  return (
    <>
      <div>
        <CarRentalSearch />
        <RentalDeals />
        <HowItWorks />
        <Features />
        <TestimonialsSection />
        <Footer />
      </div>
    </>
  );
}

export default App;
