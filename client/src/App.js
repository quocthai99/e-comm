import { Route, Routes } from 'react-router-dom';

import path from './ultils/path';

import Public from './pages/public/Public';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';

import Private from './pages/private/Private';
import Personal from './pages/private/Personal';


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
            </Routes>
        </div>
    );
}

export default App;
