import React, { useState } from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { UploadImage } from './../../actions/UploadAction';
import { updateUser } from '../../actions/UserAction';

const ProfileModal = ({ openModal, setOpenModal, data }) => {
    const theme = useMantineTheme();
    const { password, ...other } = data;
    const [formData, setFormData] = useState(other)
    const [profileImage, setProfileImage] = useState(null)
    const [coverImage, setCoverImage] = useState(null)
    const dispatch = useDispatch()
    const param = useParams()
    const { user } = useSelector((state) => state.authReducer.authData)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            event.target.name === "profileImage" ? setProfileImage(img) : setCoverImage(img)
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let UserData = formData;
        if (profileImage) {
            const data = new FormData();
            const fileName = Date.now() + profileImage.name
            data.append("name", fileName)
            data.append("file", profileImage)
            UserData.profilePicture = fileName
            try {
                dispatch(UploadImage(data))
            } catch (error) {
                console.log(error);
            }
        }
        if (coverImage) {
            const data = new FormData();
            const fileName = Date.now() + coverImage.name
            data.append("name", fileName)
            data.append("file", coverImage)
            UserData.coverPicture = fileName
            try {
                dispatch(UploadImage(data))
            } catch (error) {
                console.log(error);
            }
        }
        dispatch(updateUser(param.id, UserData))
        setOpenModal(false)
    }

    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            size='50%'
            opened={openModal}
            onClose={() => setOpenModal(false)}
        >
            <form className="infoForm">
                <h4>Your Info</h4>
                <div>
                    <input type="text" className="infoInput" placeholder='First Name' name='firstname' onChange={handleChange} value={formData.firstname} />
                    <input type="text" className="infoInput" placeholder='Last Name' name='lastname' onChange={handleChange} value={formData.lastname} />
                </div>
                <div>
                    <input type="text" className="infoInput" placeholder='Works at' name='worksat' onChange={handleChange} value={formData.worksat} />
                </div>
                <div>
                    <input type="text" className="infoInput" placeholder='Lives In' name='livesin' onChange={handleChange} value={formData.livesin} />
                    <input type="text" className="infoInput" placeholder='Country' name='country' onChange={handleChange} value={formData.country} />
                </div>
                <div>
                    <input type="text" className="infoInput" placeholder='RelationShip Status' name='relationship' onChange={handleChange} value={formData.relationship} />
                </div>
                <div>
                    Profile Image
                    <input type="file" className="" name='profileImage' onChange={onImageChange} />
                    Cover Image
                    <input type="file" className="" name='coverImage' onChange={onImageChange} />
                </div>
                <button className="button infoButton" onClick={handleSubmit}>Update</button>
            </form>
        </Modal>
    );
};


export default ProfileModal;