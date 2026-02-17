import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Test from "../pages/Test";
import Error from "../pages/Error";
import Card from "../pages/Card";
import Form from "../pages/Form";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/error" element={<Error />} />
        <Route path="/card/:id" element={<Card />} />
        <Route path="/form/:id" element={<Form />} />
      </Routes>
    </Router>
  );
}
