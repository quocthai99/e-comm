import React, { useEffect, useState } from 'react';
import { apiGetProducts } from '../../../../services/product';
import { useSelector } from 'react-redux';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { MdOutlineColorLens } from "react-icons/md";
import SearchInput from '../../../../components/SearchInput';
import { EditProduct } from '../../layouts/Edit';

const ManageProduct = () => {
    const { currentUser } = useSelector(state => state.auth.login)
    const [products, setProducts] = useState(null)
    const [editProduct, setEditProduct] = useState(null)
    const [SearchProduct, setSearchProduct] = useState({
        q: ''
    })

    const fetchDataProducts = async() => {
        const response = await apiGetProducts(currentUser.accessToken)
        if (response.status) {
            setProducts(response.products)
        }
    }

    const handleDeleteUser = async (pid) => {
        console.log(pid)
    }

    useEffect(() => {
        fetchDataProducts()
    }, [])

    return (
        <div className="bg-white">
            {editProduct && <EditProduct product={editProduct} />}
            <div className="text-primary mx-10">
                <h1 className="text-3xl font-bold py-5 border-b border-primary ">
                    <span>Create Products</span>
                </h1>
            </div>

            <div className="m-10">
                <div className="flex items-center justify-end mr-[-20px]">
                    <SearchInput placeholder="Search something" value={SearchProduct.q} setSearchProduct={setSearchProduct} />
                </div>
            </div>


            <div className="m-10 overflow-auto rounded-lg shadow hidden lg:block ">
                <table className="w-full ">
                    <thead className="bg-primary border-b-2 border-hprimary text-white">
                        <tr>
                            <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">#</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                            <th className="w-52 p-3 text-sm font-semibold tracking-wide text-left">Category</th>
                            <th className="w-52 p-3 text-sm font-semibold tracking-wide text-left">Brand</th>
                            <th className="w-52 p-3 text-sm font-semibold tracking-wide text-left">Price</th>
                            <th className="w-52 p-3 text-sm font-semibold tracking-wide text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary text-primary">
                        {products && products.map((product, i) => {
                            return (
                                <tr key={product._id}>
                                            <td className="p-3 text-sm text-primary whitespace-nowrap">
                                                <span className="font-bold hover:underline">{i + 1}</span>
                                            </td>
                                            <td className="p-3 text-sm text-primary whitespace-nowrap">
                                                <div>{product.name}</div>
                                            </td>
                                            <td className="p-3 text-sm text-primary whitespace-nowrap">
                                                <div>{product.category}</div>
                                            </td>
                                            <td className="p-3 text-sm text-primary whitespace-nowrap">
                                                <div>{product.brand}</div>
                                            </td>
                                            <td className="p-3 text-sm text-primary whitespace-nowrap">
                                                <div>{product.price}</div>
                                            </td>
                                            <td className="p-3 text-sm text-primary whitespace-nowrap">
                                                <div className="flex items-center justify-around">
                                                    <div
                                                        onClick={() => setEditProduct(product)}
                                                        className="cursor-pointer"
                                                        title="Edit"
                                                    >
                                                        <FaEdit size={20} color="#339CDE" />
                                                    </div>
                                                    <div
                                                        onClick={() => setEditProduct(product)}
                                                        className="cursor-pointer"
                                                        title="Variant"
                                                    >
                                                        <MdOutlineColorLens size={20} color="green" />
                                                    </div>
                                                    <div
                                                        onClick={() => handleDeleteUser(product._id)}
                                                        className="cursor-pointer"
                                                        title="Remove"
                                                    >
                                                        <FaTrash size={20} color="orange" />
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageProduct;
