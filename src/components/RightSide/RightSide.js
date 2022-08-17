import React, { useState } from 'react';
import './RightSide.css';
import noti from '../../img/noti.png'
import comment from '../../img/comment.png'
import home from '../../img/home.png'
import { UilSetting } from '@iconscout/react-unicons';
import TrendCard from '../TrendCard/TrendCard';
import ShereModal from '../ShereModal/ShereModal';
import { Link } from 'react-router-dom'


const RightSide = () => {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className='rightSide'>
            <div className="navIcons">
                <Link to={'../home'}>
                    <img src={home} alt="" />
                </Link>
                <UilSetting />
                <img src={noti} alt="" />
                <img src={comment} alt="" />
            </div>
            <TrendCard></TrendCard>
            <button className="button r-button" onClick={() => setOpenModal(true)}>Share</button>
            <ShereModal openModal={openModal} setOpenModal={setOpenModal}></ShereModal>
        </div>
    );
};

export default RightSide;