// Addcategory.js
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import axios from 'axios';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

function Addcategory({ addCategory, updateCategory }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(updateCategory ? updateCategory.name : '');
    const [tag, setTag] = useState(updateCategory ? updateCategory.tag : '');
    const [description, setDescription] = useState(updateCategory ? updateCategory.description : '');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const token = localStorage.getItem('token');
    const handleSubmit = async () => {
        if (!name || !tag || !description) {
            console.error("Name, tag and description are required");
            return;
        }
        try {
            const value = { name, tag, description };
            let response;
            if (updateCategory) {
                response = await axios.put(`http://localhost:3001/category/update/${updateCategory._id}`, value, {
                    headers: {
                        admintoken: token
                    }
                });
            } else {
                response = await axios.post('http://localhost:3001/category/create', value, {
                    headers: {
                        admintoken: token
                    }
                });
            }
            console.log(response.data);
            // refreshCategories();
            addCategory()
            handleClose();
        } catch (error) {
            console.error("Error:", error.response.data.message);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <React.Fragment>
            {updateCategory ? (
                <Button variant="outlined" sx={{color:'#fff'}} onClick={handleClickOpen}>
                    Update
                </Button>
            ) : (
                <Button variant="outlined"  onClick={handleClickOpen}>
                    Add Category
                </Button>
            )}
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open} >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    {updateCategory ? 'Update category' : 'Add category'}
                    <IconButton aria-label="close" onClick={handleClose} sx={{ position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500],}}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        <Box className="details">
                            <Box className="name">
                                <label htmlFor="name">Name :</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(event) => setName(event.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </Box>
                            <Box className="name">
                                <label htmlFor="tag">Tag :</label>
                                <input
                                    type="text"
                                    id="tag"
                                    value={tag}
                                    onChange={(event) => setTag(event.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </Box>
                            <Box className="name">
                                <label htmlFor="description">Description :</label>
                                <input
                                    type="text"
                                    id="description"
                                    value={description}
                                    onChange={(event) => setDescription(event.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                            </Box>
                        </Box>
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit}>
                        {updateCategory ? 'Update' : 'Submit'}
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default Addcategory;
