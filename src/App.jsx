import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
// import Product from "./pages/Product";
// import About from "./pages/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/offer/:id" element={<Offer />} /> */}
      </Routes>
    </Router>
  );
}
export default App;
