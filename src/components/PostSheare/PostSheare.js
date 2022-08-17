import React, { useRef, useState } from 'react';
import './PostSheare.css';
import profileImg from '../../img/profileImg.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage, faVideo, faCalendar, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
// import authReducer from './../../reducers/authReducer';
import { UploadImage, UploadPost } from '../../actions/UploadAction';
// import postReducer from './../../reducers/postReducer';

const PostSheare = () => {
    const loading = useSelector((state) => state.postReducer.uploading)
    const { user } = useSelector((state) => state.authReducer.authData)
    const [image, setImage] = useState(null);
    const imageRef = useRef();
    const desc = useRef();
    const dispatch = useDispatch();
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            setImage(img)
        }
    }
    const reset = () => {
        setImage(null)
        desc.current.value = ""
    }
    const handleSubmit = (e) => {
        e.preventDefault();

        const newPost = {
            userId: user._id,
            desc: desc.current.value
        }
        if (image) {
            const data = new FormData()
            const filename = Date.now() + image.name
            data.append("name", filename)
            data.append("file", image)
            newPost.image = filename
            console.log(newPost);
            try {
                dispatch(UploadImage(data))
            } catch (error) {
                console.log(error);
            }
        }
        dispatch(UploadPost(newPost))
        reset()
    }
    const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <div className='postSheare'>
            <img src={user.profilePicture ? serverPublic + user.profilePicture : serverPublic + "defaultProfile.png"} alt="" />
            <div>
                <input ref={desc} required type="text" placeholder='What s Happends' />
                <div className="postOption">
                    <div className="option" style={{ color: "var(--photo)" }} onClick={() => imageRef.current.click()}>
                        <FontAwesomeIcon icon={faImage} />
                        <span>Photo</span>
                    </div>
                    <div className="option" style={{ color: "var(--video)" }}>
                        <FontAwesomeIcon icon={faVideo} />
                        <span>Video</span>
                    </div>
                    <div className="option" style={{ color: "var(--location)" }}>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span>Location</span>
                    </div>
                    <div className="option" style={{ color: "var(--shedule)" }}>
                        <FontAwesomeIcon icon={faCalendar} />
                        <span>Shedule</span>
                    </div>
                    <button className='button ps-button' onClick={handleSubmit} disabled={loading}>{loading ? "Uploading" : "Share"}</button>
                    <div style={{ display: "none" }}>
                        <input type="file" name='myImage' ref={imageRef} onChange={onImageChange} />
                    </div>
                </div>
                {image && (
                    <div className="previewImage">
                        <span onClick={() => setImage(null)}>X</span>
                        <img src={URL.createObjectURL(image)} alt="" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default PostSheare;