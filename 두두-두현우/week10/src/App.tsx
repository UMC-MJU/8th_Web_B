import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} /> {/* ✅ 이게 있어야 해! */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
