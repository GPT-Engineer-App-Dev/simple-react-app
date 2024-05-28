import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Index from "./pages/Index.jsx";
import EventList from "./pages/EventList.jsx";
import EventDetail from "./pages/EventDetail.jsx";
import VenueList from "./pages/VenueList.jsx";
import VenueDetail from "./pages/VenueDetail.jsx";
import AddVenue from "./pages/AddVenue.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />} />
        <Route path="/events" element={<EventList />} />
        <Route path="/events/:id" element={<EventDetail />} />
        <Route path="/venues" element={<VenueList />} />
        <Route path="/venues/new" element={<AddVenue />} />
        <Route path="/venues/:id" element={<VenueDetail />} />
      </Routes>
    </Router>
  );
}

export default App;