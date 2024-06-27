import { Route, Routes } from "react-router-dom";

import { path } from "./ultils/path";

import Public from "./pages/public/Public";
import Home from "./pages/public/Home/Home";
import Login from "./pages/public/Login/Login";
import Register from "./pages/public/Register/Register";

function App() {
  return (
    <div>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.LOGIN} element={<Login />} />
          <Route path={path.REGISTER} element={<Register />} />
        </Route>
        
      </Routes>
    </div>
  );
}

export default App;
