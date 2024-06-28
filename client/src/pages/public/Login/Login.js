import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2'

import Breadcrumbs from '../../../layouts/Breadcrumbs';
import InputForm from '../../../components/Input/InputForm';
import Button from '../../../components/Button/Button';

import path from '../../../ultils/path';
import { apiLogin } from '../../../services/auth';
import withBaseComponent from '../../../hocs/withBaseComponent';

const Login = ({ navigate }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const handleLogin = async(data) => {
        const response = await apiLogin(data);
        if ( response.status ) {
            Swal.fire(response.message, 'Go to home', 'success')
            navigate(`/${path.HOME}`)
        }
    };
    return (
        <div>
            <div className="w-full bg-sky-100 min-h-[80px]">
                <div className="w-main m-auto py-[10px]">
                    <div className="mb-[10px] text-primary font-bold text-lg">
                        <span>LOGIN</span>
                    </div>
                    <Breadcrumbs />
                </div>
            </div>

            <div className="w-full">
                <div className="w-main mx-auto my-10">
                    <div className="mx-auto border w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-primary md:text-2xl dark:text-white">
                                Sign in to your account
                            </h1>

                            <form onSubmit={handleSubmit(handleLogin)} className="space-y-4 md:space-y-6">
                                <InputForm
                                    label="Your email"
                                    placeholder="name@company.com"
                                    id="email"
                                    register={register}
                                    errors={errors}
                                    validate={{
                                        required: 'this field required',
                                    }}
                                />
                                <InputForm
                                    label="Your passsword"
                                    placeholder="******"
                                    id="password"
                                    type='password'
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
                                <div className="text-sm font-medium text-primary hover:underline cursor-pointer text-right ">
                                    Forgot password?
                                </div>
                                <Button
                                    fullW="w-full"
                                    className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    Sign in
                                </Button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Don’t have an account yet?
                                    <Link
                                        to={`/${path.REGISTER}`}
                                        className="font-medium text-primary hover:underline "
                                    >
                                        Sign up
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

export default withBaseComponent(Login);
