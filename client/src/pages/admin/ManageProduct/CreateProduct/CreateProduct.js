import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import InputForm from '../../../../components/Input';
import MarkDown from '../../../../components/MarkDown';
import Button from '../../../../components/Button';
import { apiCreateProduct } from '../../../../services/product';

const CreateProduct = () => {
    const { currentUser } = useSelector((state) => state.auth.login);
    console.log(currentUser);
    const [payload, setPayload] = useState({
        description: '',
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const changeValue = useCallback(
        (e) => {
            setPayload(e);
        },
        [payload],
    );

    const handleCreateProduct = async (data) => {
        console.log(data);
        const dataBody = { ...data, ...payload };

        const response = await apiCreateProduct(currentUser.accessToken, dataBody);
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
                            label="Category"
                            register={register}
                            id="category"
                            placeholder="Enter product name"
                            errors={errors}
                            validate={{
                                required: 'this field required',
                            }}
                        />
                    </div>

                    <MarkDown name="description" changeValue={changeValue} label="Description" />

                    <Button>Create Product</Button>
                </form>
            </div>
        </div>
    );
};

export default CreateProduct;
