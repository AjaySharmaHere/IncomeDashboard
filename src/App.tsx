import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginScreen from "./component/login-screen.tsx";
import Dashboard from "./component/Dashboard.tsx";

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginScreen />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
