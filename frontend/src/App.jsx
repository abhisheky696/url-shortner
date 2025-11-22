// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Shortner";
import Analytics from "./pages/Analytics";
import TotalLinks from "./pages/TotalLinks";
import Header from "./components/Header.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/totallinks" element={<TotalLinks />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;
