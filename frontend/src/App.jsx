import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./route/Home";
import { Game } from "./route/Game";
import { Testing } from "./components/Testing";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="h-screen bg-slate-900">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/game" element={<Game />} />
            {/* <Route path="/test" element={<Testing  />} /> */}
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
