import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { apiGetUsers } from '../../../services/user';

import SearchInput from '../../../components/SearchInput'
import EditUser from '../layouts/EditUser';
import useDebounce from '../../../hook/useDebounce'

import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageUser = () => {
    const { currentUser } = useSelector((state) => state.auth.login);

    const { user } = useSelector((state) => state.user.getCurrent);
    const [users, setUsers] = useState(null);
    const [searchUser, setSearchUser] = useState({
        q: ''
    })
    const [editUser, setEditUser] = useState(null)
    
    const queriesDebounce = useDebounce(searchUser.q, 1000)
    const fetchDataUsers = async (params) => {
        const response = await apiGetUsers(currentUser.accessToken, params)
        setUsers(response.users)
    };
    
    useEffect(() => {
        const params = {}
        if (queriesDebounce) params.q = queriesDebounce
        fetchDataUsers(params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user, queriesDebounce]);

    return (
        <div className="bg-white h-screen">
            {editUser &&  <EditUser user={editUser} />}
            <div className="text-primary mx-10">
                <h1 className="text-3xl font-bold py-5 border-b border-primary ">
                    <span>Manage Users</span>
                </h1>
            </div>

            <div className='m-10'>
                <div className="flex items-center justify-end mr-[-20px]">
                    <SearchInput 
                        placeholder="Search something" 
                        value={searchUser.q}
                        setSearchUser={setSearchUser}
                    />
                </div>
            </div>

            <div className="m-10 overflow-auto rounded-lg shadow hidden lg:block ">
                <table className="w-full ">
                    <thead className="bg-primary border-b-2 border-hprimary text-white">
                        <tr>
                            <th className="w-10 p-3 text-sm font-semibold tracking-wide text-left">#</th>
                            <th className="p-3 text-sm font-semibold tracking-wide text-left">Email</th>
                            <th className="w-52 p-3 text-sm font-semibold tracking-wide text-left">Name</th>
                            <th className="w-40 p-3 text-sm font-semibold tracking-wide text-left">Phone</th>
                            <th className="w-20 p-3 text-sm font-semibold tracking-wide text-left">Role</th>
                            <th className="w-32 p-3 text-sm font-semibold tracking-wide text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-primary text-primary">
                        {users &&
                            users
                                .filter((user) => !user.isAdmin)
                                .map((user, i) => (
                                    <tr key={user._id}>
                                        <td className="p-3 text-sm text-primary whitespace-nowrap">
                                            <span className="font-bold hover:underline">{i + 1}</span>
                                        </td>
                                        <td className="p-3 text-sm text-primary whitespace-nowrap">
                                            <div>{user.email}</div>
                                        </td>
                                        <td className="p-3 text-sm text-primary whitespace-nowrap">
                                            <div>{user.name}</div>
                                        </td>
                                        <td className="p-3 text-sm text-primary whitespace-nowrap">
                                            <div>{user.phone}</div>
                                        </td>
                                        <td className="p-3 text-sm text-primary whitespace-nowrap">
                                            <div>{!user.isAdmin && 'User'}</div>
                                        </td>
                                        <td className="p-3 text-sm text-primary whitespace-nowrap">
                                            <div className="flex items-center justify-around">
                                                <div onClick={() => setEditUser(user)} className='cursor-pointer' title="Edit">
                                                    <FaEdit color="#339CDE" />
                                                </div>
                                                <div className='cursor-pointer' title='Remove'>
                                                    <FaTrash color="orange" />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </div>

            <div className="m-10">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:hidden">
                    {users &&
                        users
                            .filter((user) => !user.isAdmin)
                            .map((user, i) => (
                                <div key={user._id} className="bg-white space-y-3 p-4 rounded-lg shadow">
                                    <div className="flex items-center space-x-2 text-sm">
                                        <div>
                                            <span className="text-primary font-bold hover:underline">
                                                {i + 1}
                                            </span>
                                        </div>
                                        <div className="text-gray-500">{user.email}</div>
                                        <div>
                                            <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-gray-800 bg-green-200 rounded-lg bg-opacity-50 ">
                                                {user.name}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="text-sm text-gray-700">{user.phone}</div>

                                    <div className="text-sm font-medium text-black">{!user.isAdmin && 'User'}</div>
                                </div>
                            ))}
                </div>
            </div>
        </div>
    );
};

export default ManageUser;
