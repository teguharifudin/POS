import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import BillsPage from "./pages/BillsPage";
import CartPage from "./pages/CartPage";
import CustomerPage from "./pages/CustomerPage";
import Homepage from "./pages/Homepage";
import ItemPage from "./pages/ItemPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import IsPrivate from './pages/IsPrivate';
import { ConfigProvider } from './context/ConfigContext';

function App() {
  return (
    <>
    <ConfigProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<IsPrivate><Homepage /></IsPrivate>} />
          <Route path="/items" element={<IsPrivate><ItemPage /></IsPrivate>} />
          <Route path="/cart" element={<IsPrivate><CartPage /></IsPrivate>} />
          <Route path="/bills" element={<IsPrivate><BillsPage /></IsPrivate>} />
          <Route path="/customers" element={<IsPrivate><CustomerPage /></IsPrivate>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
      </ConfigProvider>
    </>
  );
}

export function ProtectedRoute({ children }) {
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

export default App