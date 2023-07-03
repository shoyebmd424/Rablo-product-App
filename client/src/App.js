import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Forget from "./Pages/Forget";
import Dashboard from "./Pages/Dashboard";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import CreateProduct from "./Pages/CreateProduct";
import UpdateProduct from "./Pages/UpdateProduct";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget" element={<Forget />} />
        <Route path="/dashboard" element={<ProtectedRoutes />}>
          <Route path="" element={<Dashboard />} />
          <Route path="add" element={<CreateProduct />} />
          <Route path="update/:id" element={<UpdateProduct />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
