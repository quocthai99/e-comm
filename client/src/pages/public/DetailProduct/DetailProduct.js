import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import { useSelector } from 'react-redux'

import Breadcrumbs from '../../../layouts/Breadcrumbs';
import Button from '../../../components/Button';

import { apiGetProduct } from '../../../services/product';
import path from '../../../utils/path';

import { FaChevronLeft } from 'react-icons/fa';
import withBaseComponent from '../../../hocs/withBaseComponent';
import { apiAddToCart } from '../../../services/user';
import { addItem } from '../../../redux/cart/CartSlice';

const DetailProduct = ({ dispatch }) => {
    const { id } = useParams();
    const { currentUser } = useSelector(state => state.auth.login)
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [activeVariant, setActiveVariant] = useState(null);

    const fetchDataProduct = async () => {
        const response = await apiGetProduct(id);
        if (response.status) {
            setProduct(response.product);
            setActiveVariant(response.product)
        }
    };

    const handleQuantity = (flag) => {
        if (flag === 'minus') {
            setQuantity(quantity - 1);
            if (quantity <= 1) {
                setQuantity(1);
            }
        }
        if (flag === 'plus') {
            setQuantity(quantity + 1);
        }
    };

    const handleAddToCart = () => {
        apiAddToCart(currentUser.accessToken, dispatch, { pid: product._id, quantity, color: activeVariant.color, price : activeVariant.price, thumb : activeVariant.thumb })
    };

    useEffect(() => {
        fetchDataProduct();
    }, []);

    return (
        <div>
            <div className="w-full bg-sky-100 min-h-[80px]">
                <div className="xl:w-main sm:w-full mx-auto py-[10px]">
                    <div className="mb-[10px] text-primary font-bold text-lg">
                        <span>{product?.name}</span>
                    </div>
                    <Breadcrumbs />
                </div>
            </div>

            <div className="xl:w-main sm:w-full mx-auto my-5">
                <div className="grid grid-cols-5">
                    {/* LEFT */}
                    <div className="col-span-2">
                        <div className="flex flex-col gap-5">
                            <div className="border flex items-center justify-center max-h-[500px]">
                                <img src={product?.thumb} alt="thumb" className="w-full h-full object-contain" />
                            </div>
                            <div className="grid grid-cols-3 gap-5">
                                {product?.images.map((img, i) => (
                                    <img key={i} src={img} alt="img" className="h-[143px] object-contain border" />
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* RIGHT */}
                    <div className="col-span-3 pl-10 flex flex-col gap-5">
                        <h4 className="font-semibold text-3xl">{`$${product?.price} USD`}</h4>

                        <ul className="flex flex-col gap-1 text-[#505050]">
                            {product?.description.length > 1 &&
                                product?.description.map((el, i) => <li key={i}>{el}</li>)}
                            {product?.description.length === 1 && (
                                <div
                                    className="line-clamp-[10]"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(product?.description[0]) }}
                                ></div>
                            )}
                        </ul>
                        {/* Variant */}
                        <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-20">
                                <h4>Color</h4>
                                <div className="flex flex-wrap gap-5">
                                    <div
                                        onClick={() => setActiveVariant(product)}
                                        className={`flex items-center gap-2 border p-2 cursor-pointer ${
                                            activeVariant?._id === product?._id
                                                ? 'border-primary text-primary'
                                                : 'text-text'
                                        }`}
                                    >
                                        <img
                                            src={product?.thumb}
                                            alt="thumb-product"
                                            className="w-14 h-14 object-contain"
                                        />
                                        <div className="flex flex-col justify-center uppercase">
                                            <h4>{product?.color}</h4>
                                            <h4>{`$${product?.price} USD`}</h4>
                                        </div>
                                    </div>
                                    {product?.variants.map((variant) => (
                                        <div
                                            onClick={() => setActiveVariant(variant)}
                                            key={variant._id}
                                            className={`flex items-center gap-2 p-2 cursor-pointer border ${
                                                activeVariant?._id === variant._id
                                                    ? 'border-primary text-primary'
                                                    : 'text-text'
                                            }`}
                                        >
                                            <img
                                                src={variant.thumb}
                                                alt="thumb-variant"
                                                className="w-14 h-14 object-contain"
                                            />
                                            <div className="flex flex-col justify-center uppercase">
                                                <h4>{variant.color}</h4>
                                                <h4>{`$${variant.price} USD`}</h4>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/* QUantity */}
                            <div className="flex items-center gap-20">
                                <h4>Quantity</h4>

                                <form className="max-w-xs">
                                    <div className="relative flex items-center max-w-[8rem]">
                                        <button
                                            onClick={() => handleQuantity('minus')}
                                            type="button"
                                            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                        >
                                            <svg
                                                className="w-3 h-3 text-gray-900 dark:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 18 2"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M1 1h16"
                                                />
                                            </svg>
                                        </button>
                                        <input
                                            onChange={(e) => e.target.value}
                                            value={quantity}
                                            type="text"
                                            className="bg-gray-50 border-y-2 h-11 text-center text-gray-900 text-sm  block w-full py-2.5 "
                                        />
                                        <button
                                            onClick={() => handleQuantity('plus')}
                                            type="button"
                                            className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                                        >
                                            <svg
                                                className="w-3 h-3 text-gray-900 dark:text-white"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 18 18"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M9 1v16M1 9h16"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </form>
                            </div>

                            <Button onClick={handleAddToCart} cusWidth="w-full">
                                ADD TO CART
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Link
                to={`/${path.HOME}`}
                className="flex items-center justify-center text-[#505050] hover:text-main mb-10 hover:text-primary"
            >
                <FaChevronLeft />
                <span className="text-sm">BACK TO COLLECTION - FULL WIDTH</span>
            </Link>
        </div>
    );
};

export default withBaseComponent(DetailProduct);
