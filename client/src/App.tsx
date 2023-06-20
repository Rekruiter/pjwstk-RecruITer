import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navigation from "./components/fragments/Navigation";
import MainContent from "./components/fragments/MainContent";
import NotFound from "./components/other/NotFound";
import JobOfferList from "./components/job-offers/JobOffersList";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/applications" element={<NotFound />} />
        <Route path="/job-offers" element={<JobOfferList />} />
        <Route path="/recruitments" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
