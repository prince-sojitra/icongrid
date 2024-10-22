// Icon.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import Dailodbox from './Dailodbox';
import { AiOutlineDelete } from "react-icons/ai";

const Icon = () => {
    const [categories, setCategories] = useState([]);
    const [iconData, setIconData] = useState({});

    const token = localStorage.getItem('token');

    const updateCountIcons = () => {
        axios.put('http://localhost:3001/count/update/66118721d874eac554e374dc', {}, {
            headers: {
                admintoken: token
            }
        })
            .then((res) => {
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };

    useEffect(() => {
        fetchIcons()
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
        axios.get('http://localhost:3001/icon/find')
            .then((res) => {
                setIconData(res.data.data);
                updateCountIcons()
            })
            .catch((error) => {
                console.log(error.response.data.message);
            });
    };

    const removeIcon = (id) => {
        axios.delete(`http://localhost:3001/icon/delete/${id}`, {
            headers: { admintoken: token }
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
            return axios.get(`http://localhost:3001/icon/findOne/${category.name}`)
                .then((res) => {
                    console.log([category.name]);
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
                setIconData(iconDataObject);
                console.log(iconDataObject);
            });
    };

    return (
        <Box>
            <Typography variant="h5" marginBottom="5px">
                Icon
            </Typography>

            <Box className="add">
                <Box><Dailodbox fetchIcons={getCategories} targetFile="icon" /></Box>
            </Box>

            <Box>
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
                                        {iconData[category.name] && iconData[category.name].map((icon, iconIndex) => (
                                            <TableRow key={iconIndex}>
                                                <TableCell>{icon.name}</TableCell>
                                                <TableCell align="right">
                                                    <Button onClick={() => removeIcon(icon._id)}><AiOutlineDelete color='#fff' fontSize={'25px'}/></Button>
                                                    <Dailodbox fetchIcons={getCategories} icon={icon} targetFile="icon" />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Box>
    );
};

export default Icon;
