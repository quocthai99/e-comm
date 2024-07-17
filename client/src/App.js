import { Route, Routes } from 'react-router-dom';

import path from './utils/path';

import Public from './pages/public/Public';
import Home from './pages/public/Home';
import Login from './pages/public/Login';
import Register from './pages/public/Register';
import DetailProduct from './pages/public/DetailProduct';

import Private from './pages/private/Private';
import Personal from './pages/private/Personal';

import Admin from './pages/admin/Admin';
import ManageUser from './pages/admin/ManageUser';
import ManageProduct from './pages/admin/ManageProduct/ManageProduct';
import CreateProduct from './pages/admin/ManageProduct/CreateProduct';
import Order from './pages/admin/Order';
import Product from './pages/public/Product';
import Cart from './pages/public/Cart';

function App() {
    return (
        <div>
            <Routes>
                <Route path={path.PUBLIC} element={<Public />}>
                    <Route path={path.HOME} element={<Home />} />
                    <Route path={path.LOGIN} element={<Login />} />
                    <Route path={path.REGISTER} element={<Register />} />
                    <Route path={path.CART} element={<Cart />} />
                    <Route path={path.PRODUCTS} element={<Product />} />
                    <Route path={path.DETAIL_PRODUCT__CATE__ID} element={<DetailProduct />} />
                </Route>

                <Route path={path.PRIVATE} element={<Private />}>
                    <Route path={path.PERSONAL} element={<Personal />} />
                </Route>

                <Route path={path.ADMIN} element={<Admin />}>
                    <Route path={path.MANAGE_USER} element={<ManageUser />} />
                    <Route path={path.MANAGE_PRODUCTS} element={<ManageProduct />} />
                    <Route path={path.CREATE_PRODUCTS} element={<CreateProduct />} />
                    <Route path={path.MANAGE_ORDER} element={<Order />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
