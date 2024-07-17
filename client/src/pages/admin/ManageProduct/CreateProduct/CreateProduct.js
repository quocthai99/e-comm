import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import {InputForm} from '../../../../components/Input';
import MarkDown from '../../../../components/MarkDown';
import Button from '../../../../components/Button';
import { apiCreateProduct } from '../../../../services/product';
import { toBase64 } from '../../../../utils/func';

const CreateProduct = () => {
    const { currentUser } = useSelector((state) => state.auth.login);
    console.log(currentUser);
    const [payload, setPayload] = useState({
        description: '',
    });
    const [preview, setPreview] = useState({
        thumb: null,
        images: [],
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();

    const changeValue = useCallback(
        (e) => {
            setPayload(e);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [payload],
    );

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

    const handleCreateProduct = async (data) => {
        const dataBody = { ...data, ...payload };
        const formData = new FormData();
        if (dataBody.thumb) {
            formData.append('thumb', dataBody.thumb[0]);
            delete dataBody.thumb;
        } else {
            delete dataBody.thumb;
        }

        if (dataBody.images) {
            for (let image of dataBody.images) {
                formData.append('images', image);
            }
            delete dataBody.images;
        } else {
            delete dataBody.images;
        }

        for (let data of Object.entries(dataBody)) {
            formData.append(data[0], data[1]);
        }
        
        const response = await apiCreateProduct(currentUser.accessToken, formData);
        console.log(response);
    };

    return (
        <div className="bg-white">
            <div className="text-primary mx-10">
                <h1 className="text-3xl font-bold py-5 border-b border-primary ">
                    <span>Create Products</span>
                </h1>
            </div>

            <div className="m-10">
                <form className="flex flex-col gap-5" onSubmit={handleSubmit(handleCreateProduct)}>
                    <InputForm
                        label="Product name"
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
                            label="Brand"
                            register={register}
                            id="brand"
                            placeholder="Enter product name"
                            errors={errors}
                            validate={{
                                required: 'this field required',
                            }}
                        />
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
                    </div>

                    <div className="grid grid-cols-2 gap-5">
                        <InputForm
                            label="Category"
                            register={register}
                            id="category"
                            placeholder="Enter product name"
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

                    <MarkDown name="description" changeValue={changeValue} label="Description" />

                    <div>
                        <label className="block mb-2 text-sm font-medium text-primary dark:text-white" htmlFor="thumb">
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
                        <label className="block mb-2 text-sm font-medium text-primary dark:text-white" htmlFor="thumb">
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
                                return <img key={i} src={el} alt="images" id={i} className="w-20 object-contain " />;
                            })}
                        </div>
                    )}

                    <div className="flex">
                        <Button fullW>Create Product</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
