import React from 'react';
import { Card } from 'antd';
import './style.css';

const FilterCard = (props) => {
    return (
        <Card className={'filter-card ' + props.className} onClick={props.applyFilter ? props.applyFilter : ()=> {}}>
            <p className='m-0 font-weight-normal'>{props.title}</p>
            <div className="d-flex justify-content-between align-items-end">
                <h2 className='m-0 mt-2 count'>{props.count}</h2>
                <img style={{ width: '50px' }} src={props.icon ? props.icon : ""} />
            </div>
        </Card>
    )
}

export default FilterCard;