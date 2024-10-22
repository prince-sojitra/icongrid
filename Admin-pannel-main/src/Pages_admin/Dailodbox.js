// Dailodbox.js
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

function Dailodbox({ fetchIcons, icon, targetFile }) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [tag, setTag] = useState('');
    const [category, setCategory] = useState(null);
    const [regularFile, setRegularFile] = useState(null);
    const [boldFile, setBoldFile] = useState(null);
    const [thinFile, setThinFile] = useState(null);
    const [solidFile, setSolidFile] = useState(null);
    const [straightFile, setStraightFile] = useState(null);
    const [roundedFile, setRoundedFile] = useState(null);
    const [suggestedCategories, setSuggestedCategories] = useState([]);

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
        axios.get('http://localhost:3001/category/find')
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
        formData.append('regular', regularFile);
        formData.append('bold', boldFile);
        formData.append('thin', thinFile);
        formData.append('solid', solidFile);
        formData.append('straight', straightFile);
        formData.append('rounded', roundedFile);
    
        let endpoint;
    
        if (targetFile === 'Animatedicon') {
            endpoint = 'animated';
        } else if (targetFile === 'Interface') {
            endpoint = 'interface';
        } else {
            endpoint = 'icon';
        }
        
        const token = localStorage.getItem('token');
    
        try {
            let response;
            if (icon) {
                console.log("endpoint :- ", endpoint);
                response = await axios.put(`http://localhost:3001/${endpoint}/update/${icon._id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        admintoken: token
                    }
                });
            } else {
                console.log("endpoint :- ", endpoint);
                response = await axios.post(`http://localhost:3001/${endpoint}/create`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        admintoken: token
                    }
                });
                console.log("Response :- ",response.data.data);
                // Reset form state variables
                setName('');
                setTag('');
                setRegularFile(null);
                setBoldFile(null);
                setThinFile(null);
                setSolidFile(null);
                setStraightFile(null);
                setRoundedFile(null);
    
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
                <Button variant="outlined"  onClick={handleClickOpen}>
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
                                <label htmlFor="regular">Regular:</label>
                                <input
                                    type="file"
                                    id="regular"
                                    name="regular"
                                    onChange={(e) => setRegularFile(e.target.files[0])}
                                    multiple
                                />
                            </Box>
                            <Box className="name">
                                <label htmlFor="bold">Bold:</label>
                                <input
                                    type="file"
                                    id="bold"
                                    name="bold"
                                    onChange={(e) => setBoldFile(e.target.files[0])}
                                    multiple
                                />
                            </Box>
                            <Box className="name">
                                <label htmlFor="thin">Thin:</label>
                                <input
                                    type="file"
                                    id="thin"
                                    name="thin"
                                    onChange={(e) => setThinFile(e.target.files[0])}
                                    multiple
                                />
                            </Box>
                            <Box className="name">
                                <label htmlFor="solid">Solid:</label>
                                <input
                                    type="file"
                                    id="solid"
                                    name="solid"
                                    onChange={(e) => setSolidFile(e.target.files[0])}
                                    multiple
                                />
                            </Box>
                            <Box className="name">
                                <label htmlFor="straight">Straight:</label>
                                <input
                                    type="file"
                                    id="straight"
                                    name="straight"
                                    onChange={(e) => setStraightFile(e.target.files[0])}
                                    multiple
                                />
                            </Box>
                            <Box className="name">
                                <label htmlFor="rounded">Rounded:</label>
                                <input
                                    type="file"
                                    id="rounded"
                                    name="rounded"
                                    onChange={(e) => setRoundedFile(e.target.files[0])}
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

export default Dailodbox;
