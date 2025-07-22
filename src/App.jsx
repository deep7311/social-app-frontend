import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import GuestPage from "./components/GuestPage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
          {/* Header always on top */}
          <Header />

          {/* Main content routes */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/guest" element={<GuestPage />} />
            </Routes>
          </main>

          {/* Footer at bottom */}
          <Footer />
        </div>
        <ToastContainer position="top-center" autoClose={2500} />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
