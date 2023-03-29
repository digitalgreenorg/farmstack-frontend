import { Card } from '@mui/material'
import React from 'react'

const cardSx = {
    maxWidth: 368, height: 190, border: '1px solid #C0C7D1', borderRadius: '10px',
    "&:hover": {
        boxShadow: '-40px 40px 80px rgba(145, 158, 171, 0.16)',
        cursor: 'pointer'
    }
};
const DataSetCardNew = () => {
    return (
        <Card className='card' sx={cardSx}>
            <div className='published'>
                <img src={require('../../Assets/Img/globe.svg')} alt="globe" />
                <span className='published_text'>Published on: 28/03/2022</span>
            </div>
            <div className='d_content_title'>Soil parameter</div>
            <div className='organisation'>
                <img src={require('../../Assets/Img/organisation.svg')} alt="organisation" />
                <span className='organisation_text'>EATA</span>
            </div>
            <div className='d_content_text'>
                <div className='category'>
                    <img src={require('../../Assets/Img/category.svg')} alt="category" />
                    <span className='category_text'>Wheat</span>
                </div>
                <div className='location'>
                    <img src={require('../../Assets/Img/location.svg')} alt="location" />
                    <span className='location_text'>Addis</span>
                </div>
                <div className='calendar'>
                    <img src={require('../../Assets/Img/calendar_new.svg')} alt="calendar" />
                    <span className='calendar_text'>6 months old</span>
                </div>

            </div>
        </Card>
    )
}

export default DataSetCardNew