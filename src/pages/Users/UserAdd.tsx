import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { addDoc, collection, getFirestore, doc, updateDoc } from 'firebase/firestore';

const UserAdd = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone_number, setPhone] = useState('');
    const [showroom_name, setShowRoomName] = useState('');
    const [showroom_district, setShowRoomDistrict] = useState('');
    const [editData, setEditData] = useState(null);
    const navigate = useNavigate();
    const { state } = useLocation(); // Use the useLocation hook to access location state

    const db = getFirestore();

    useEffect(() => {
        if (state && state.editData) {
            setEditData(state.editData);
            setName(state.editData.name || '');
            setEmail(state.editData.email || '');
            setAddress(state.editData.address || '');
            setPhone(state.editData.phone_number || '');
            setShowRoomName(state.editData.showroom_name || '');
            setShowRoomDistrict(state.editData.showroom_district || '');
        }
    }, [state]);
          

    const addOrUpdateItem = async () => {
        try {
            const itemData = {
                name,
                email,
                address,
                phone_number,
                showroom_name,
                showroom_district,
            };

            if (editData) {
                const docRef = doc(db, 'users', editData.id);
                await updateDoc(docRef, itemData);
                console.log('Document updated');
            } else {
                const docRef = await addDoc(collection(db, 'users'), itemData);
                console.log('Document written with ID: ', docRef.id);
            }

            navigate('/users/staff');
        } catch (e) {
            console.error('Error adding/updating document: ', e);
        }
    };
    
    return (
        <div>
            <ul className="flex space-x-2 rtl:space-x-reverse">
                <li>
                    <Link to="#" className="text-primary hover:underline">
                        Users
                    </Link>
                </li>
                <li className="before:content-['/'] ltr:before:mr-2 rtl:before:ml-2">
                    <span>Staffs Account Settings</span>
                </li>
            </ul>
            <div className="pt-5">
                <div className="flex items-center justify-between mb-5">
                    <h5 className="font-semibold text-lg dark:text-white-light">Staff Details</h5>
                </div>
                <div></div>

                <div>
                    <form className="border border-[#ebedf2] dark:border-[#191e3a] rounded-md p-4 mb-5 bg-white dark:bg-black">
                        <h6 className="text-lg font-bold mb-5">General Information</h6>
                        <div className="flex flex-col sm:flex-row">
                            <div className="ltr:sm:mr-4 rtl:sm:ml-4 w-full sm:w-2/12 mb-5">
                                <img src="/assets//images/profile-34.jpeg" alt="img" className="w-20 h-20 md:w-32 md:h-32 rounded-full object-cover mx-auto" />
                            </div>
                            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label htmlFor="name">Name</label>
                                    <input id="name" type="text" placeholder="Enter Name" className="form-input" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="email">Email</label>
                                    <input id="email" type="email" placeholder="@gmail.com" className="form-input" value={email} onChange={(e) => setEmail(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="address">Address</label>
                                    <textarea id="address" placeholder="Enter Address" className="form-input" value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>

                                <div>
                                    <label htmlFor="phone_number">Phone</label>
                                    <input id="phone_number" type="phone_number" placeholder="phone number" className="form-input" value={phone_number} onChange={(e) => setPhone(e.target.value)} />
                                </div>
                                <div>
                                    <label htmlFor="showroom_name">ShowRoom Name</label>
                                    <input
                                        id="showroom_name"
                                        type="showroom_name"
                                        placeholder="ShowRoom name"
                                        className="form-input"
                                        value={showroom_name}
                                        onChange={(e) => setShowRoomName(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="showroom_district">ShowRoom District</label>
                                    <input
                                        id="showroom_district"
                                        type="showroom_district"
                                        placeholder="district"
                                        className="form-input"
                                        value={showroom_district}
                                        onChange={(e) => setShowRoomDistrict(e.target.value)}
                                    />
                                </div>

                                <div className="sm:col-span-2 mt-3">
            <button type="button" className="btn btn-primary" onClick={addOrUpdateItem}>
                {editData ? 'Update' : 'Save'}
            </button>
        </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserAdd;
