import { BrowserRouter, Routes, Route } from "react-router-dom";
import Customers from "./pages/Customers";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Customers />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
