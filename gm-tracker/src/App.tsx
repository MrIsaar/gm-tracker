import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Home from "./Home/Home";
import Tracker from "./Tracker/Tracker";
import NpcPage from "./NpcGenerator/NpcPage";
import TrackerPopup from "./TrackerPopup/TrackerPopup";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="gm-tracker/" element={<Header />}>
            <Route index element={<Home />} />
            <Route path="/gm-tracker/initative" element={<Tracker />} />
            <Route path="/gm-tracker/npc" element={<NpcPage />} />
            <Route path="/gm-tracker/trackerpopup" element={<TrackerPopup />} />
            <Route path="*" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
