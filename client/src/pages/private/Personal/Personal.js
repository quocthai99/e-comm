import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import InputForm from '../../../components/Input';
import Button from '../../../components/Button';
import withBaseComponent from '../../../hocs/withBaseComponent'

import { toBase64 } from '../../../utils/func'
import { apiUpdateCurrent } from '../../../services/user';
import avatar from '../../../assets/avatar.png'

const Personal = ({ dispatch }) => {
    const { user } = useSelector(state => state.auth.getCurrent)
    const { currentUser } = useSelector(state => state.auth.login)
    const [preview, setPreview] = useState(null)
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch
    } = useForm();

    useEffect(() => {
        reset({
            name: user.name,
            email: user.email,
            phone: user.phone
        })
        setPreview(user.avatar)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user])

    const handlePreviewAvatar = async(file) => {
        const base64 = await toBase64(file)
        setPreview(base64)
    }
    
    useEffect(() => {
        if ( watch('avatar')instanceof FileList && watch('avatar').length > 0) {
            handlePreviewAvatar(watch('avatar')[0])
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch('avatar')])

    const handleUpdateCurrent = (data) => {
        const { avatar, ...payload } = data
        const formData = new FormData()

        if (data.avatar) formData.append('avatar', avatar[0])
        for(let item in payload) {
            delete payload['phone']
            delete payload['email']
            formData.append(item, payload[item])
        }
        
        apiUpdateCurrent(currentUser.accessToken, formData, dispatch)
    };
    return (
        <div className="bg-white h-screen">
            <div className="text-primary mx-10">
                <h1 className="text-3xl font-bold py-5 border-b border-primary ">
                    <span>Personal</span>
                </h1>
            </div>

            <div className="m-10">
                <form onSubmit={handleSubmit(handleUpdateCurrent)} className="flex flex-col gap-5">
                    <InputForm
                        label="Name"
                        id="name"
                        register={register}
                        errors={errors}
                        placeholder="Change your name"
                    />

                    <InputForm
                        label="Email"
                        id="email"
                        register={register}
                        errors={errors}
                        placeholder="Change your name"
                        disabled
                    />

                    <InputForm
                        label="Phone"
                        id="phone"
                        register={register}
                        errors={errors}
                        placeholder="Change your name"
                        disabled
                    />

                    <div>
                        <h4>Password: </h4>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="font-medium">Profile image:</span>
                        <label htmlFor="avatar">
                            <img
                                src={preview || avatar}
                                alt="avatar"
                                className="w-10 h-10 object-cover rounded-full cursor-pointer"
                            />
                        </label>
                        <input {...register('avatar')} type="file" id="avatar" hidden />
                    </div>
                    <Button>Update</Button>
                </form>
            </div>
        </div>
    );
};

export default withBaseComponent(Personal);
