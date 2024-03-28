import { Box, Button, Card, CardMedia, Typography } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const AddGame = () => {
    const [data, setData] = useState([]);
    const uid = sessionStorage.getItem("uid");

    const fetchData = () => {
        axios.get("http://localhost:5000/UploadGame/" + uid).then((res) => {
            console.log(res.data);
            setData(res.data);
        });

    };

    const handleAddGame = (Id) => {
        const datas = {
            gameId: Id,
            userId: uid,
        };
        axios.post("http://localhost:5000/ReviewHead", datas).then((res) => {
            console.log(res.data);
            fetchData();
        });
    }



    useEffect(() => {
        fetchData();
    }, []);
    return (
        <Box>
            <Typography variant='h4' textAlign={'center'}>Games</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4, m: 2 }}>
                {
                    data && data.map((item, key) => (
                        <Card key={key} sx={{ width: 280, height: 400, p: 2, display: 'flex', flexDirection: 'column', gap: 3, alignItems: 'center' }}>
                            <CardMedia image={item.uploadfile} sx={{ width: 'inherit', height: 250, borderRadius: 5 }} />
                            <Typography>{item.name}</Typography>
                            <Typography>{item.desc}</Typography>
                            {
                                item.check ?
                                    <Button variant='contained' fullWidth disabled >Already Added</Button>
                                    :
                                    <Button variant='contained' fullWidth onClick={() => handleAddGame(item._id)}>Add</Button>

                            }

                        </Card>
                    ))
                }

            </Box>
        </Box>
    )
}

export default AddGame