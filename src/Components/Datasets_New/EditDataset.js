import React from 'react'
import { useParams } from 'react-router-dom'
const EditDataset = () => {
    const { id } = useParams();
    return (
        <div>EditDataset</div>
    )
}

export default EditDataset