// Dailogicon.js
import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, IconButton, Typography, TextField, Box } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Autocomplete from '@mui/material/Autocomplete';
import axios from 'axios';

function Dailogicon({ refreshCategories, icon }) {
    const [open, setOpen] = useState(false);
    const [category, setCategory] = useState(null);
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const [file, setFile] = useState(null);
    const [suggestedCategories, setSuggestedCategories] = useState([]);

    useEffect(() => {
        fetchSuggestedCategories();
    }, []);

    useEffect(() => {
        if (icon) {
            setCategory({ label: icon.category, id: icon.categoryId });
            setName(icon.name);
            setTag(icon.tag);
        }
    }, [icon]);

    const fetchSuggestedCategories = () => {
        axios.get('http://localhost:3001/category/find')
            .then((res) => {
                const categories = res.data.data.map(category => ({ label: category.name, id: category._id }));
                setSuggestedCategories(categories);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!category || !name || !tag || !file) {
            console.log('Please select a category, enter a name, enter a tag, and choose a file');
            return;
        }

        const formData = new FormData();
        formData.append('category', category.label);
        formData.append('name', name);
        formData.append('tag', tag);
        formData.append('icon', file);

        const token = localStorage.getItem('token');

        try {
            let response;
            if (icon) {
                response = await axios.put(`http://localhost:3001/icon/update/${icon._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        admintoken: token
                    }
                });
            } else {
                response = await axios.post('http://localhost:3001/icon/create', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        admintoken: token
                    }
                });
            }

            console.log('Response:', response.data.data);
            refreshCategories();
        } catch (error) {
            console.error('Error:', error.response.data.message);
        }

        handleClose();
    };


    return (
        <React.Fragment>
            {icon ? (
                <Button variant="outlined" sx={{color:'#fff'}} onClick={handleClickOpen}>
                    Update
                </Button>
            ) : (
                <Button variant="outlined" onClick={handleClickOpen}>
                    Add Icon
                </Button>
            )}
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {icon ? 'Update Icon' : 'Add Icon'}
                    <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500], }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <Box className="details">
                            <Box className="selector">
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={suggestedCategories}
                                    value={category}
                                    onChange={(event, newValue) => setCategory(newValue)}
                                    getOptionLabel={(option) => option.label}
                                    sx={{ width: 300 }}
                                    renderInput={(params) => <TextField {...params} label="Categories" />}
                                />
                            </Box>
                            <Box className="name">
                                <label htmlFor="name">Name :</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                />
                            </Box>
                            <Box className="name">
                                <label htmlFor="tag">Tag :</label>
                                <input
                                    type="text"
                                    id="tag"
                                    value={tag}
                                    onChange={(event) => setTag(event.target.value)}
                                />
                            </Box>
                            <Box className="name">
                                <label htmlFor="icon">Icon:</label>
                                <input type="file" onChange={(event) => setFile(event.target.files[0])} />
                            </Box>
                        </Box>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit }>
                        {icon ? 'Update' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default Dailogicon;
