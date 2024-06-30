// import * as React from 'react';
import Box from '@mui/material/Box';
import { useState } from 'react';
import { DataGrid as DataGridss } from '@mui/x-data-grid';
// import { useState,useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { Button } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
// import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
// import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from "react-router-dom";
// import Icon from "react-crud-icons";

const GridData=({data,onDelete})=> {
  const navigate=useNavigate();
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState({});

  // Function to handle opening the modal for a specific row
  const handleOpen = (rowId) => {
    setOpenModal({ ...openModal, [rowId]: true });
  };

  // Function to handle closing the modal for a specific row
  const handleClose = (rowId) => {
    setOpenModal({ ...openModal, [rowId]: false });
  }
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: '#fff', // Set a white background color
    boxShadow: 24,
    borderRadius: '8px', // Add border-radius if desired
    overflow: 'hidden', // Ensure the image fits within the box without overflow
  };
  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      headerBorder: 'green',
      width: 150,
      editable: false,
    },
    {
      field: 'product_category',
      headerName: 'Category',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 120,
      editable: false,
    },
    {
      field: 'sub_category',
      headerName: 'Sub Category',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 120,
      editable: false,
    },
    {
      field: 'mrp',
      headerName: 'MRP',
      headerClassName: 'super-app-theme--header',
      headerAlign: 'center',
      width: 163,
      editable: false,
    },
    {
        field: 'weight',
        headerName: 'Weight',
        headerAlign: 'center',
        headerClassName: 'super-app-theme--header',
        width: 195,
        editable:true,
        height: 1000,
      },    
    {
        field: 'product_name',
        headerName: 'Name',
        headerAlign: 'center',
        headerClassName: 'super-app-theme--header',
        width: 195,
        editable: false,
      },
      {
        field: 'created_at',
        headerName: 'Created At',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 195,
        editable: false,
      },
      {
        field: 'image',
        headerName: 'Image',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 195,
        editable: false,
        renderCell: (params) => {
          const rowData = params.row;
          const image = rowData.image;
          const rowId = rowData.id; // Assuming 'id' is a unique identifier for each row
  
          return (
            <div>
              <ion-icon name="eye-outline" size='large' onClick={() => handleOpen(rowId)}></ion-icon>
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModal[rowId] || false} // Check the open state for the specific row
                onClose={() => handleClose(rowId)} // Close the modal for the specific row
              >
                <Box sx={style}>
                  <img
                    src={`http://localhost:4000/uploads/${image}`}
                    style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
                    alt=""
                  />
                </Box>
              </Modal>
            </div>
          );
        },
      },
      {
        field: 'description',
        headerName: 'Description',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 195,
        editable: false,
      },
      {
        field: 'tamil_name',
        headerName: 'Tamil Name',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 195,
        editable: false,
      },
      {
        field: 'botanical_name',
        headerName: 'Botanical Name',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 195,
        editable: false,
      },
      {
        field: 'discount_price',
        headerName: 'Discount Price',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 195,
        editable: false,
      },
      {
        field: 'stock',
        headerName: 'Stock',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 195,
        editable: false,
      },
      {
        field: 'tax',
        headerName: 'Rate Tax',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 195,
        editable: false,
      },
      {
        field: "Update",
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        renderCell: (params) => {
          const rowData = params.row;
          const product_id = rowData.id;
          const product_name = rowData.product_name;
          const product_category = rowData.product_category;
          const mrp = rowData.mrp;
          const weight = rowData.weight;
          const modified = rowData.modified_at;
          const stock = rowData.stock;
          const tax = rowData.tax;
          const desc = rowData.description;
          const botanicalName = rowData.botanical_name;
          const tamilName = rowData.tamil_name;
          const discountPrice = rowData.discount_price;
          return (
            <ion-icon size="large"name="create-outline"
            onClick={() => {
                  sessionStorage.setItem(
                    "update_main",
                    JSON.stringify({ product_id,product_name,product_category,mrp,weight,modified,stock,tax,desc,botanicalName,tamilName,discountPrice })
                  );
                  navigate("/update");
                }}
            ></ion-icon>
          );
        },
        headerName: "Update",
        fontWeight:'bold',
        width: 98,
        editable: false,},
      {
        field: "Delete",
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        headerName: "Delete",
        width: 98,
        editable: false,
        renderCell: (params) => {
          const rowData = params.row;
          const id = rowData.id;
          
          return (
            <ion-icon size="large" name="close-circle-outline" 
            onClick={() => {
              onDelete(id)
            }}
            ></ion-icon>
          );
        },
      },
  ];
  return (
    <Box sx={{  
      width: '100%', 
      }}>

      <div>
      <DataGridss
        rows={data}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 100,
            },
          },
        }}
        
        sx={{
          boxShadow: 10,
          borderTopColor:'brown',
          letterSpacing:1,
          '& .MuiDataGrid-cell': {
            justifyContent:"center",
            fontFamily: 'Poppins',
            fontWeight:'bold',
            backgroundColor:'white',
            fontSize: 15.5, 
            borderTop:'1px solid brown',
          },

          '& .MuiDataGrid-columnHeader': {
            fontWeight:20,
          },
          overflow: 'auto', 
          '& .super-app-theme--header': {
            fontFamily: 'Poppins',
            fontWeight: 'bold',
            backgroundColor:'rgb(255 237 213)',
            border:'0.25px solid brown',
            color:'brown',
            borderBottom : '1px solid brown',
            fontSize: 17.5, 
          },
         
        }}
        disableRowSelectionOnClick
      />
      </div>
    </Box>
  );
}
export default GridData;