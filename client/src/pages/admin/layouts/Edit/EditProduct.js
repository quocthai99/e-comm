import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import Button from '../../../../components/Button';
import {InputForm} from '../../../../components/Input';
import { toBase64 } from '../../../../utils/func';
import withBaseComponent from '../../../../hocs/withBaseComponent';
import { useSelector } from 'react-redux';
import { apiUpdateProduct } from '../../../../services/product';
import Swal from 'sweetalert2';
import Loading from '../../../../components/Loading';

const EditProduct = ({ product, setEditProduct, dispatch }) => {
    const { currentUser } = useSelector(state => state.auth.login)
    const { isFetching } = useSelector(state => state.loading.isLoading)

    const [preview, setPreview] = useState({
        thumb: '',
        images: [],
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();
    
    useEffect(() => {
        reset({
            name: product.name,
            price: product.price,
            color: product.color,
            category: product.category,
            brand: product.brand,
        });
    }, []);

    useEffect(() => {
        if (watch('thumb') instanceof FileList && watch('thumb').length > 0) {
            handlePreviewThumb(watch('thumb')[0]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('thumb')]);

    const handlePreviewThumb = async (file) => {
        const base64 = await toBase64(file);
        setPreview((prev) => ({ ...prev, thumb: base64 }));
    };

    useEffect(() => {
        if (watch('images') instanceof FileList && watch('images').length > 0) {
            handlePreviewImages(watch('images'));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('images')]);

    const handlePreviewImages = async (files) => {
        const imagesPreview = [];
        for (let file of files) {
            const base64 = await toBase64(file);
            imagesPreview.push(base64);
        }
        setPreview((prev) => ({ ...prev, images: imagesPreview }));
    };
    const handleEditProduct = async (data) => {
        const formData = new FormData();
        if(data.thumb) {
            formData.append('thumb', data.thumb[0])
            delete data.thumb
        } else {
            delete data.thumb
        }

        if (data.images) {
            for (let image of data.images) formData.append('images', image);
            delete data.images
        } else {
            delete data.images
        }

        for (let i of Object.entries(data)) {
            formData.append(i[0], i[1]);
        }
        
        const response = await apiUpdateProduct(formData, product._id, currentUser.accessToken, dispatch);
        if(response.status) {
            Swal.fire(response.message, 'Success', 'success')
            setEditProduct(null)
        }
    };

    return (
        <div className="fixed inset-0 bg-overlay z-10 flex justify-center items-center">
            {isFetching && <div className='fixed inset-0 z-10 flex justify-center items-center'><Loading /></div>}
            <div className="bg-white max-w-[700px] p-5">
                <form onSubmit={handleSubmit(handleEditProduct)}>
                    <div className="flex flex-col gap-5">
                        <InputForm
                            label="Name"
                            register={register}
                            id="name"
                            placeholder="Enter product name"
                            errors={errors}
                            validate={{
                                required: 'this field required',
                            }}
                        />
                        <div className="grid grid-cols-2 gap-5">
                            <InputForm
                                label="Price"
                                register={register}
                                id="price"
                                placeholder="Enter product price"
                                errors={errors}
                                validate={{
                                    required: 'this field required',
                                }}
                            />
                            <InputForm
                                label="Color"
                                register={register}
                                id="color"
                                placeholder="Enter product color"
                                errors={errors}
                                validate={{
                                    required: 'this field required',
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <InputForm
                                label="Category"
                                register={register}
                                id="category"
                                placeholder="Enter product category"
                                errors={errors}
                                validate={{
                                    required: 'this field required',
                                }}
                            />
                            <InputForm
                                label="Brand"
                                register={register}
                                id="brand"
                                placeholder="Enter product brand"
                                errors={errors}
                                validate={{
                                    required: 'this field required',
                                }}
                            />
                        </div>
                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-primary dark:text-white"
                                htmlFor="thumb"
                            >
                                Upload thumb
                            </label>
                            <input {...register('thumb', { required: 'this field required' })} type="file" id="thumb" />
                            <span className="text-sm text-main">{errors['thumb']?.message}</span>
                        </div>
                        {preview.thumb && (
                            <div className="my-5">
                                <img src={preview.thumb} alt="thumb" className="w-20 object-contain " />
                            </div>
                        )}

                        <div>
                            <label
                                className="block mb-2 text-sm font-medium text-primary dark:text-white"
                                htmlFor="thumb"
                            >
                                Upload images
                            </label>
                            <input
                                {...register('images', { required: 'this field required' })}
                                type="file"
                                id="images"
                                multiple
                            />
                            <span className="text-sm text-main">{errors['thumb']?.message}</span>
                        </div>
                        {preview.images.length > 0 && (
                            <div className="my-5 flex gap-5">
                                {preview.images.map((el, i) => {
                                    return (
                                        <img key={i} src={el} alt="images" id={i} className="w-20 object-contain " />
                                    );
                                })}
                            </div>
                        )}

                        <div className="flex justify-center gap-5 ">
                            <Button>Update Product</Button>

                            <Button onClick={() => setEditProduct(null)} cusColor="bg-[#fe2c55] hover:bg-[#c94d66]">
                                Cancel
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default withBaseComponent(EditProduct);
