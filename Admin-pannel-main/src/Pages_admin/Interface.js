// Interface.js
import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, Link, Breadcrumbs, Accordion, AccordionSummary, AccordionDetails, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import axios from 'axios';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dailodbox from './Dailodbox';
import { AiOutlineDelete } from "react-icons/ai";
const Interface = () => {
    const [data, setData] = useState({});
    const [categories, setCategories] = useState([]);
    const token = localStorage.getItem('token');

    const updateCountIcons = () => {
        axios.put('http://localhost:3001/count/update/66118721d874eac554e374dc', {}, {
            headers: {
                admintoken: token
            }
        })
            .then((res) => {
                console.log(res.data.data);
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };

    useEffect(() => {
        fetchIcons();
        getCategories();
    }, []);

    const getCategories = () => {
        axios.get('http://localhost:3001/category/find')
            .then((res) => {
                setCategories(res.data.data);
                getCategoryIcons(res.data.data);
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };

    const fetchIcons = () => {
        axios.get('http://localhost:3001/interface/find')
            .then((res) => {
                setData(res.data.data);
                updateCountIcons()
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };

    const removeIcon = (id) => {
        axios.delete(`http://localhost:3001/interface/delete/${id}`, {
            headers: {
                admintoken: token
            }
        })
            .then((res) => {
                console.log(res.data.data);
                getCategories();
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };

    const getCategoryIcons = (categories) => {
        const iconPromises = categories.map(category => {
            return axios.get(`http://localhost:3001/interface/findOne/${category.name}`)
                .then((res) => {
                    return { [category.name]: res.data.data };
                })
                .catch((error) => {
                    console.log(error.response.data);
                    return { [category.name]: [] };
                });
        });

        Promise.all(iconPromises)
            .then(iconDataArray => {
                const iconDataObject = iconDataArray.reduce((acc, curr) => {
                    return { ...acc, ...curr };
                }, {});
                setData(iconDataObject);
                console.log(iconDataObject);
            });
    };

    

    return (
        <Box>
            <Typography variant="h5">
                Interface Icon
            </Typography>
            <Breadcrumbs aria-label="breadcrumb" marginBottom="30px">
                <Link className="Breadcrumb" style={{ color: "#899bbd", fontSize: "14px", textDecoration: "none" }} to="/">
                    Home
                </Link>
                <Typography color="#899bbd" fontSize="14px">Icons</Typography>
                <Typography color="#273246" fontSize="14px">Interface Icon</Typography>
            </Breadcrumbs>

            <Box className="add">
                <Dailodbox fetchIcons={getCategories} targetFile="Interface" />
            </Box>

            <div>
                {categories && categories.map((category, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls={`panel-${index}-content`}
                            id={`panel-${index}-header`}
                        >
                            <Typography>{category.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Box}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Icon</TableCell>
                                            <TableCell align="right">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {data[category.name] && data[category.name].map((icon, iconIndex) => (
                                            <TableRow key={iconIndex}>
                                                <TableCell>{icon.name}</TableCell>
                                                <TableCell align="right">
                                                    <Button onClick={() => removeIcon(icon._id)}><AiOutlineDelete color='#fff' fontSize={'25px'}/></Button>
                                                    <Dailodbox fetchIcons={getCategories} icon={icon} targetFile="Interface" />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </div>
        </Box>
    );
};

export default Interface;
