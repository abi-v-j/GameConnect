import { Card } from '@mui/material'
import React from 'react'
import { Box, } from '@mui/material'
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import axios from 'axios'
import { useState } from "react"



const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const UploadGame = () => {

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [file, setFile] = useState('')
    const handleSubmit = () => {

        const frm = new FormData()
        frm.append("desc", desc)
        frm.append("name", name)
        frm.append("file", file)


        axios.post('http://localhost:5000/UploadGame', frm).then((response) => {
            console.log(response.data);
            setName('')
            setDesc('')
            setFile('')
        })
    }

    return (
        <div>
            <Box
                sx={{
                    width: '100%',
                    height: '85vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                <Card sx={{ p: 10, backgroundColor: 'lightcyan' }}>
                    <h1>Upload Game</h1 >
                    <TextField id="outlined-basic" label="Name"   fullWidth variant="outlined" value={name} sx={{ m: 2 }}
                        onChange={(event) => setName(event.target.value)} />
                    <div>
                        <TextField id="outlined-basic" label="Description"   fullWidth variant="outlined" sx={{ m: 2 }}
                            value={desc}
                            onChange={(event) => setDesc(event.target.value)} />
                    </div>
                    <Button sx={{ m: 2 }}
                    fullWidth
                        component="label"
                        role={undefined}
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUploadIcon />}
                    >
                        Upload file
                        <VisuallyHiddenInput type="file" onChange={(event) => setFile(event.target.files[0])} />
                    </Button>

                    <Stack spacing={2} direction="row" sx={{ justifyContent: 'center', alignContent: 'center' }}>
                        <Button variant="contained" sx={{ m: 2, }} onClick={handleSubmit} >
                            Submit
                        </Button>
                    </Stack>
                </Card>

            </Box>
        </div>
    )
}

export default UploadGame