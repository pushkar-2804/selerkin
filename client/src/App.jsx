import "./App.css";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import EmailReminder from "./pages/EmailReminder";
import ListAnalyser from "./pages/ListAnalyser";
import Dashboard from "./pages/Dashboard";
import KeywordFinder from "./pages/KeywordFinder";

function App() {
  return (
    <>
      <div className="app">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/emailReminder" element={<EmailReminder />} />
          <Route path="/ListAnalyser" element={<ListAnalyser />} />
          <Route path="/keywordFinder" element={<KeywordFinder />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
