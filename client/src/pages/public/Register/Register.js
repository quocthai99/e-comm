import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'

import withBaseComponent from '../../../hocs/withBaseComponent'

import Breadcrumbs from '../../../layouts/Breadcrumbs';
import InputForm from '../../../components/Input';
import Button from '../../../components/Button/Button';

import path from '../../../ultils/path';
import { apiRegister } from '../../../services/auth';

const Register = ({navigate}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleRegister = async(data) => {
        const response = await apiRegister(data)
        
        if (response.data.status) {
            Swal.fire(response.data.message, "Go to Login", "success")
            navigate(`/${path.LOGIN}`)
        } else {
            Swal.fire("Something went wrong", response.data.message, "error")
        }
    };

    return (
        <div>
            <div className="w-full bg-sky-100 min-h-[80px]">
                <div className="w-main m-auto py-[10px]">
                    <div className="mb-[10px] text-primary font-bold text-lg">
                        <span>REGISTER</span>
                    </div>
                    <Breadcrumbs />
                </div>
            </div>

            <div className="w-full">
                <div className="w-main mx-auto my-10">
                    <div className="mx-auto border w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
                                Create an account
                            </h1>

                            <form onSubmit={handleSubmit(handleRegister)} className="space-y-4 md:space-y-6">
                                <div className="grid grid-cols-2 gap-5">
                                    <InputForm
                                        label="Your name"
                                        placeholder="nguyenvana"
                                        id="name"
                                        register={register}
                                        errors={errors}
                                        validate={{
                                            required: 'this field required',
                                        }}
                                    />
                                    <InputForm
                                        label="Your phone"
                                        placeholder="+84xxxxxx"
                                        id="phone"
                                        type="phone"
                                        register={register}
                                        errors={errors}
                                        validate={{
                                            required: 'this field required',
                                            pattern: {
                                                value: /^[0-9]+$/,
                                                message: 'Please enter a number',
                                            },
                                            minLength: {
                                                value: 10,
                                                message: "The minimum length 10 characters"
                                            }
                                        }}
                                    />
                                </div>
                                <InputForm
                                    label="Your email"
                                    placeholder="name@company.com"
                                    id="email"
                                    register={register}
                                    errors={errors}
                                    validate={{
                                        required: 'this field required',
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'invalid email address',
                                        },
                                    }}
                                />
                                <InputForm
                                    label="Your password"
                                    placeholder="abcxyz"
                                    id="password"
                                    type="password"
                                    register={register}
                                    errors={errors}
                                    validate={{
                                        required: 'this field required',
                                        minLength: {
                                            value: 6,
                                            message: "The minimum length 6 characters"
                                        }
                                    }}
                                />
                                <InputForm
                                    label="Confirm your password"
                                    placeholder="abcxyz"
                                    id="confirmPassword"
                                    type="password"
                                    register={register}
                                    errors={errors}
                                    validate={{
                                        required: 'this field required',
                                        minLength: {
                                            value: 6,
                                            message: "The minimum length 6 characters"
                                        }
                                    }}
                                />

                                <Button type="submit" fullW="w-full">
                                    Create an account
                                </Button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?
                                    <Link
                                        to={`/${path.LOGIN}`}
                                        className="font-medium text-primary hover:underline dark:text-primary-500"
                                    >
                                        Login here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withBaseComponent(Register);
