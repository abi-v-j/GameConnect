import { Box, Button, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Viewgame = () => {
  const [rows, setRows] = useState([]);
  const rowsWithId = rows.map((row, index) => ({ ...row, id: index + 1 }));
  const columns = [
    { field: "id", headerName: "ID", flex: 3 },

    {
      field: "name",
      headerName: "Content",
      flex: 3,
    },
    {
      field: "desc",
      headerName: "Description",
      flex: 2,
    },
  ];

  const fetchgame = () => {
    axios.get(`http://localhost:5000/fetchgame/`).then((response) => {
      console.log(response.data.fetchgame);
      setRows(response.data.fetchgame);
    });
  };

  useEffect(() => {
    fetchgame();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" sx={{ p: 3 }}>
        Games
      </Typography>
      <Box sx={{ height: 370, width: "80%" }}>
        <DataGrid
          rows={rowsWithId}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};

export default Viewgame;
