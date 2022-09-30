import React, { useState } from 'react'
import { useEffect } from 'react';
import HTTPService from '../../Services/HTTPService';
import { DataGrid } from '@mui/x-data-grid';
import NoDataAvailable from '../Dashboard/NoDataAvailable/NoDataAvailable';
import { downloadAttachment, GetErrorHandlingRoute } from '../../Utils/Common';
import { useHistory } from 'react-router-dom';
import downloadIcon from "../../Assets/Img/downloadsvgicon.svg";
import Loader from '../Loader/Loader';


const DemoDashboardTable = () => {
    const [col, setCol]= useState([])
    const [row, setRow] = useState([])
    const history = useHistory()
    const [isError, setError] = useState(false)
    const [isLoading, setLoader] = useState(false)
    let urlToHit =  JSON.parse(localStorage.getItem("show_data"))
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
        setLoader(true)
        HTTPService(
            "GET",
            urlToHit,
            "",
            false,
            false
        ).then((response)=>{
          // localStorage.removeItem("show_data")
            console.log(response)
          let val = []

          for(let key in response.data[0]){
       let obj =  { field: key, headerName: key, width: 300 }
            val.push(obj)
          }
          let rowArr = []
          for(let i=0; i<response.data.length; i++){
            let obj1 = {id:i, ...response.data[i]}
            rowArr.push(obj1)
          }
          
              setLoader(false)
                setCol([...val])
                // let rowArr = [];
       
                
                // { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
              setRow([...rowArr])
              console.log("Row data", response.data)
        }).catch((err)=>{
          setLoader(false)
            console.log(err)
        //   history.push(GetErrorHandlingRoute(err))
            // setError(true)
        })
      }

      const downloadDocument = ()=>{
        fetch(urlToHit)
        .then(resp => resp.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.style.display = 'none';
          a.href = url;
          // the filename you want
          a.download = 'Dataset.csv';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          // alert('your file has downloaded!'); // or you know, something with better UX...
        })
        .catch(() => alert('There was some error fetching the data'));
      }
      useEffect(()=>{
        getData()
      },[])
    return (
      <>
     
      {isLoading ? <Loader/> :
        <div style={{ height: 800, width: '100%', padding:"50px 50px" }}>
            {row.length <=0 ? <div style={{margin:"auto", width:"fit-content"}}><NoDataAvailable/></div>   : 
          <DataGrid
            
            rows={row}
            columns={col}
            pageSize={25}
            rowsPerPageOptions={[25]}
            
          /> }
          {row.length >0 ?  <div style={{ display:"flex",alignItems:"center", justifyContent:"left"}}> <a
            className="downloadDataset"
         onClick={()=>downloadDocument()}
          >
          Download Dataset </a>  
                           <img
                          style={{
                            width: "16px",
                            height: "16px",
                            marginLeft: "14px",
                          }}
                          src={downloadIcon}
                          alt={"Download"}
                        /> </div> : "" }
        </div> }
        </>
      );
}

export default DemoDashboardTable