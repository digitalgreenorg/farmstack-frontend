import React, { useState } from 'react'
import { useEffect } from 'react';
import HTTPService from '../../Services/HTTPService';
import { DataGrid } from '@mui/x-data-grid';

const DemoDashboardTable = () => {
    const [col, setCol]= useState([])
    const [row, setRow] = useState([])

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'firstName', headerName: 'First name', width: 130 },
        { field: 'lastName', headerName: 'Last name', width: 130 },
        {
          field: 'age',
          headerName: 'Age',
          type: 'number',
          width: 90,
        },
        {
          field: 'fullName',
          headerName: 'Full name',
          description: 'This column has a value getter and is not sortable.',
          sortable: false,
          width: 160,
          valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        },
      ];
    const rows = [
        { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
        { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
        { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
        { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
        { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
        { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
        { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
        { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
        { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
      ];
      const getData = ()=>{
        console.log("Hello")
        HTTPService(
            "GET",
            "https://jsonplaceholder.typicode.com/posts",
            "",
            false,
            false
        ).then((response)=>{
            console.log(response)
          let val = []

          for(let key in response.data[0]){
       let obj =  { field: key, headerName: key, width: 300 }
            val.push(obj)
          }
        //   console.log(val)
                setCol([...val])
                
                // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
              setRow(response.data)
        })
        .catch(err => console.log(err))
      }
      useEffect(()=>{
        getData()
      },[])
    return (
        <div style={{ height: 800, width: '100%', padding:"50px 50px" }}>
          <DataGrid
            
            rows={row}
            columns={col}
            pageSize={25}
            rowsPerPageOptions={[25]}

          />
        </div>
      );
}

export default DemoDashboardTable