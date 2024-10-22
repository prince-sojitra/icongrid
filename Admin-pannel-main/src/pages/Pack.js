// Pack.js
import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import FullScreenDialog from './FullScreenDialog';
import Container from '@mui/material/Container';

export default function Pack() {

    const [isDialogOpen, setDialogOpen] = useState(false);
    const [icons, setIcons] = useState([]);
    const [selectedIconId, setSelectedIconId] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const location = useLocation();
    const popIcon = location.state.popIcon

    useEffect(() => {
        if (location.state && location.state.categoryName) {
            setCategoryName(location.state.categoryName);
            getIcons(location.state.categoryName, location.state.popIcon);
        }
    }, [location]);
    useEffect(()=>{
        Gotoup()
    },[])
    const Gotoup = () => {

        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    
      }
    const handleOpenDialog = (iconId) => {
        setDialogOpen(true);
        setSelectedIconId(iconId);
    };

    const handleCloseDialog = async (iconId) => {
        setDialogOpen(false);
        // getIcons(location.state.categoryName, location.state.popIcon, iconId);
    };

    // const updateIcons = async (updateData) => {
    //     if (updateData) {
    //         const allowedProperties = ['regular', 'bold', 'thin', 'solid', 'straight', 'rounded', 'icon'];
    //         const editedIconsArray = {};

    //         allowedProperties.forEach((el) => {
    //             if (updateData && updateData[el]) {
    //                 const colorHex = "#000000"
    //                 let svgData = updateData[el];

    //                 // Perform string manipulation operations
    //                 if (svgData.includes('stroke="currentColor"')) {
    //                     svgData = svgData.replace(/stroke="currentColor"/g, `stroke="${colorHex}"`);
    //                     svgData = svgData.replace(/<circle\s+cx="(\d+)"\s+cy="(\d+)"\s+r="(\d+)"\s*\/?>/g, `<circle cx="$1" cy="$2" r="$3" fill="${colorHex}" />`);
    //                     svgData = svgData.replace(/<path\s+d="([^"]+)"\s*\/?>/g, `<path d="$1" fill="${colorHex}" />`);
    //                 } else {
    //                     svgData = svgData.replace(/stroke="#[a-zA-Z0-9]+"/g, `stroke="${colorHex}"`);
    //                     svgData = svgData.replace(/<circle\s+cx="(\d+)"\s+cy="(\d+)"\s+r="(\d+)"\s+fill="#[a-zA-Z0-9]+"\s*\/?>/g, `<circle cx="$1" cy="$2" r="$3" fill="${colorHex}" />`);
    //                     if (svgData.includes('fill="#')) {
    //                         svgData = svgData.replace(/<path\s+d="([^"]+)"\s+fill="#[a-zA-Z0-9]+"/g, `<path d="$1" fill="${colorHex}" />`);
    //                     } else {
    //                         svgData = svgData.replace(/<path\s+d="([^"]+)"\s*\/?>/g, `<path d="$1" fill="${colorHex}" />`);
    //                     }
    //                 }
    //                 editedIconsArray[el] = svgData;
    //             }
    //         });
    //         console.log("svgData :- ", editedIconsArray);
    //         setIcons(editedIconsArray);
    //     }
    // }

    const getIcons = (categoryName, popIcon, iconId) => {
        if (popIcon) {
            axios.get(`http://localhost:3001/popular/findOne/${categoryName}`)
                .then(async(res) => {
                    console.log(res.data.data);
                    // if(iconId){
                    //     await updateIcons(res.data.data)
                    // }
                    setIcons(res.data.data);
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
            }
            else {
                axios.get(`http://localhost:3001/icon/findOne/${categoryName}`)
                .then(async(res) => {
                    console.log(res.data.data);
                    // if(iconId){
                    //     await updateIcons(res.data.data)
                    // }
                    setIcons(res.data.data);
                })
                .catch((error) => {
                    console.log(error.response.data.message);
                });
        }
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <Box
                component="main"
                sx={{ flexGrow: 1, }}
            >
                <Toolbar />
                <Box className="center" sx={{ fontSize: '30px', color: '#272727', fontWeight: 600, paddingTop: '50px' }}>
                    Icon Pack: {categoryName}
                </Box>
                <Box className="center" paddingBottom={'30px'}>
                    {icons.length} icons
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Container maxWidth="lg">
                        <Grid xs={12} container >

                            {
                                icons.map((el, index) => {
                                    return <Grid key={index} xs={6} sm={4} md={2}>
                                        <Box onClick={() => handleOpenDialog(el._id)}>
                                            <Box className="card3 wallet">
                                                <Box className="overlay"></Box>
                                                <Box className="circle1" >
                                                    {el.icon ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="60" height="60" dangerouslySetInnerHTML={{ __html: el.icon }}></svg>
                                                        : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" width="60" height="60" dangerouslySetInnerHTML={{ __html: el.regular }}></svg>
                                                    }
                                                </Box>
                                            </Box>
                                        </Box>
                                    </Grid>
                                })
                            }

                            {popIcon ? <FullScreenDialog open={isDialogOpen} onClose={() => handleCloseDialog(selectedIconId)} iconId={selectedIconId} entityType="popular" />
                                : <FullScreenDialog open={isDialogOpen} onClose={() => handleCloseDialog(selectedIconId)} iconId={selectedIconId} entityType="icon" />
                            }

                        </Grid>
                    </Container>
                </Box>

            </Box>

        </Box>
    );
}
