// Popularaddicon.js
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Autocomplete, Box, TextField } from '@mui/material';
import axios from 'axios';
import { useState, useEffect } from 'react'; // Import useEffect

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function Popularaddicon({ fetchIcons, icon, targetFile }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const [category, setCategory] = useState(null);
    const [iconFile, setIconFile] = useState(null);
    const [suggestedCategories, setSuggestedCategories] = useState([]);
    const [suggestedCard, setSuggestedCard] = useState(["Handdrawn", "Color Fill", "Black outline", "Black Fill", "Lineal Color", "Flat"]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchSuggestedCategories();
    }, []);

    useEffect(() => { // Set category when icon prop changes
        if (icon) {
            setName(icon.name);
            setTag(icon.tag);
            setCategory({ label: icon.category, id: icon.categoryId });
        }
    }, [icon]);

    const fetchSuggestedCategories = () => {
        axios.get('http://localhost:3001/popCategory/find')
            .then((res) => {
                const categories = res.data.data.map(category => ({ label: category.name, id: category._id }));
                setSuggestedCategories(categories);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior


        // Form data setup...
        const formData = new FormData();
        formData.append('name', name);
        formData.append('tag', tag);
        formData.append('category', category.label);
        formData.append('icon', iconFile);

        const token = localStorage.getItem('token');

        try {
            let response;
            if (icon) {
                response = await axios.put(`http://localhost:3001/popular/update/${icon._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        admintoken: token
                    }
                });
            } else {
                response = await axios.post(`http://localhost:3001/popular/create`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        admintoken: token
                    }
                });
                console.log("Response :- ", response.data.data);
                // Reset form state variables
                setName('');
                setTag('');
                setCategory(null);
                setIconFile(null);

                // Immediately update state with new data
                fetchIcons();
            }
            handleClose(); // Close the dialog after successful submission
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };

    return (
        <React.Fragment>
            {icon ? (
                <Button variant="outlined" sx={{color:'#fff'}} onClick={handleClickOpen}>
                    Update
                </Button>
            ) : (
                <Button  variant="outlined" onClick={handleClickOpen}>
                    Add Icon
                </Button>
            )}
            <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {icon ? 'Update Icon' : 'Add Icon'}
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
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
                                <input
                                    type="file"
                                    id="icon"
                                    name="icon"
                                    onChange={(e) => setIconFile(e.target.files[0])}
                                    multiple
                                />
                            </Box>

                        </Box>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit}>
                        Submit
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}

export default Popularaddicon;
