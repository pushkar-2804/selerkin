import "./App.css";
import Sidebar from "./components/Sidebar";
import { Routes, Route } from "react-router-dom";
import EmailReminder from "./pages/EmailReminder";

function App() {
  return (
    <>
      <div className="app">
        <Sidebar />
        <Routes>
          <Route path="/" element={<EmailReminder />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
