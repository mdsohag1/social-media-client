import React from 'react';
import './TrendCard.css';
import {TrendData} from '../../Data/TrendData'

const TrendCard = () => {
    return (
        <div className='trensCard'>
            <h4>Trends For You</h4>
            {
                TrendData.map(trend => {
                    return (
                        <div className="trend">
                            <span>#{trend.name}</span>
                            <span>{trend.shares}k shares</span>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default TrendCard;


