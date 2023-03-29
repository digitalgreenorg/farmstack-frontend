import { Card } from '@mui/material';
import React from 'react'

const cardSx = {
    maxWidth: 368, height: 190, border: '1px solid #C0C7D1', borderRadius: '10px',
    "&:hover": {
        boxShadow: '-40px 40px 80px rgba(145, 158, 171, 0.16)',
        cursor: 'pointer'
    }
};

const AddDataSetCardNew = ({ history, addDataset }) => {
    return (
        <Card className='card cursor-pointer' sx={cardSx} onClick={() => history.push(addDataset())}>
            <div className='add_new_dataset'>Add New DataSet</div>
            <div>
                <img src={require('../../Assets/Img/add_new.svg')} alt="add" />
            </div>
            <div className='add_new_dataset_text'>
                Add details about your dataset.
            </div>
        </Card>
    )
}

export default AddDataSetCardNew