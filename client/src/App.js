import { Route, Routes } from 'react-router-dom';

import path from './utils/path';

import Public from './pages/public/Public';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

import Private from './pages/private/Private';
import Personal from './pages/private/Personal';

import Admin from './pages/admin/Admin';
import ManageUser from './pages/admin/ManageUser';


function App() {
    return (
        <div>
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.REGISTER} element={<Register />} />
                </Route>

                <Route path={path.PRIVATE} element={<Private />}>
                    <Route path={path.PERSONAL} element={<Personal />} />
                </Route>

                <Route path={path.ADMIN} element={<Admin />}>
                    <Route path={path.MANAGE_USER} element={<ManageUser />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
