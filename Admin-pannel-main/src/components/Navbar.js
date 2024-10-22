import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logo from './img/icon-grid.png'
import favicon from './img/logo.png'
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import Badge from '@mui/material/Badge';
import SaveIcon from '@mui/icons-material/SaveAlt';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { useState } from 'react';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { MdOutlineCancel } from "react-icons/md";
import { IoMdImages, IoIosShareAlt, IoIosDownload, IoIosArrowDown, IoLogoFacebook, IoLogoTwitter, IoLogoInstagram, IoLogoPlaystation, IoLogoWhatsapp } from "react-icons/io";
import { useEffect } from 'react';
import axios from 'axios';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));
const pages = [
    { name: 'Home', path: '/' },
    { name: 'Icons', path: '/icons' },
    { name: 'Interface icons', path: '/interface-icons' },
    { name: 'Animated icons', path: '/animated-icons' },
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [open, setOpen] = useState(false);
    const [hoveredItem, setHoveredItem] = useState(null);
    const [saveIcons, setSaveIcons] = useState([]);
    const [saveId, setSaveId] = useState([]);
    const [nonNullIndices, setNonNullIndices] = useState([]);

    const history = useHistory();

    useEffect(() => {
        getSaveIcons()
    }, []);

    const getSaveIcons = () => {
        axios.get(`http://localhost:3001/save/find`)
            .then((res) => {
                const ids = res.data.data.map((el) => el.save);
                const sId = res.data.data.map((el) => el._id);
                console.log("ids :- ", res.data.data.map((el) => el));
                console.log("sId :- ", sId);
                setSaveId(sId);

                let entitype = ["icon", "animated", "interface", "popular"]
                Promise.all(ids.map(id => Promise.all(entitype.map(type => axios.get(`http://localhost:3001/${type}/findById/${id}`)))))
                    .then(responses => {
                        const saveIconsData = responses.flat().map(response => response.data.data);
                        setSaveIcons(saveIconsData);
                    })
                    .catch((error) => {
                        console.log("Error fetching save icons:", error.response.data);
                    });
            })
            .catch((error) => {
                console.log("Error fetching save icons:", error.response.data);
            });
    }

    useEffect(() => {
        // Filter out null elements and store their indices
        const indices = saveIcons.map((_, index) => index).filter(index => saveIcons[index] !== null);
        setNonNullIndices(indices);
    }, [saveIcons]);


    const removeSave = (index) => {
        const idToRemove = saveId[index];
        console.log("id ID :- ", saveId);
        console.log("id ID Index :- ", index);
        axios.delete(`http://localhost:3001/save/delete/${idToRemove}`)
            .then((res) => {
                console.log("Save Icon Delete Successfully :- ", res.data.data);
                const updatedSaveIcons = saveIcons.filter((_, i) => i !== index);
                setSaveIcons(updatedSaveIcons);
                getSaveIcons()
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handlePageClick = (path) => {
        history.push(path);
        handleCloseNavMenu();
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const svgDownload = () => {
        let demo = saveIcons.filter(el => el !== null);

        const zip = new JSZip();

        // Add each SVG to the zip file
        demo.forEach((el, index) => {
            // Assuming el.icon or el.regular contains SVG string
            zip.file(`icon_${index}.svg`, el.icon || el.regular);
        });

        // Generate the zip file
        zip.generateAsync({ type: 'blob' })
            .then(blob => {
                // Save the zip file
                saveAs(blob, 'icons.zip');
            })
            .catch(error => {
                console.error('Error generating zip file:', error);
            });
    };

    return (
        <>
            <AppBar sx={{ backgroundColor: '#272727', position: 'fixed', top: 0, zIndex: '99' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        {/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
                        <Typography
                            variant="h6"
                            noWrap
                            // component="a"
                            // href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#fff',
                                textDecoration: 'none',
                                display: 'contents'
                            }}
                        >

                            <Link to="/" className='center-logo' href=""><span style={{ letterSpacing: 'initial', fontSize: '28px', color: '#fff', fontWeight: '600' }}>Ic</span><img width={'25px'} src={favicon} alt="" srcset="" /><span style={{ marginLeft: "1px", fontSize: '28px', letterSpacing: 'initial', color: '#fff', fontWeight: '600' }}>nGrid</span></Link>
                            {/* <img src={logo1} width={'10%'} alt="" srcset="" /> */}
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page, i) => (
                                    <Button
                                        key={i}
                                        onClick={() => handlePageClick(page.path)}
                                        sx={{ my: 1, color: 'white', display: 'block', textTransform: 'capitalize' }}
                                    >
                                        {page.name}
                                    </Button>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#fff',
                                textDecoration: 'none',
                            }}
                        >
                            IconGrid
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
                            {pages.map((page, i) => (
                                <Button
                                    key={i}
                                    onClick={() => handlePageClick(page.path)}
                                    sx={{ my: 1, color: 'white', display: 'block', textTransform: 'capitalize' }}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ margin: '0px 20px' }}>
                            <React.Fragment>
                                <Box sx={{ cursor: 'pointer' }}>
                                    <Badge badgeContent={saveIcons
                                        .filter(el => el !== null)
                                        .length} onClick={handleClickOpen} color="primary">
                                        <SaveIcon color="#fff" />
                                    </Badge>
                                </Box>
                                <BootstrapDialog
                                    // backgroundColor={'#fff'}
                                    onClose={handleClose}
                                    aria-labelledby="customized-dialog-title"
                                    open={open}
                                >
                                    <DialogTitle sx={{ m: 0, p: 2, backgroundColor: '#fff' }} id="customized-dialog-title">
                                        Collection
                                    </DialogTitle>
                                    <IconButton
                                        aria-label="close"
                                        onClick={handleClose}
                                        sx={{
                                            position: 'absolute',
                                            right: 8,
                                            top: 8,
                                            color: '#000'
                                        }}
                                    >
                                        <CloseIcon sx={{ color: '#000' }} />
                                    </IconButton>
                                    <DialogContent dividers sx={{ backgroundColor: '#fff' }}>
                                        <div>
                                            <Grid container >
                                                {saveIcons
                                                    .filter(el => el !== null)
                                                    .map((el, index) => (
                                                        <Grid
                                                            key={index}
                                                            item
                                                            xs={2}
                                                            sx={{
                                                                position: 'relative',
                                                                '&:hover': { border: '1px solid black', borderRadius: '5px' },
                                                            }}
                                                            onMouseEnter={() => setHoveredItem(index)}
                                                            onMouseLeave={() => setHoveredItem(null)}
                                                        >
                                                            <Box sx={{ width: '40px', height: '40px', padding: '10px' }}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" dangerouslySetInnerHTML={{ __html: el.icon || el.regular }}></svg>
                                                            </Box>
                                                            {hoveredItem === index && (
                                                                <Box position="absolute" top={0} right={1}>
                                                                    <MdOutlineCancel onClick={() => removeSave(index)} />
                                                                </Box>
                                                            )}
                                                        </Grid>
                                                    ))
                                                }
                                            </Grid>
                                        </div>
                                    </DialogContent>
                                    <DialogActions sx={{ backgroundColor: '#fff', display: 'flex', justifyContent: 'space-between' }}>
                                        <Box>
                                            <Button autoFocus >
                                                <input type="color" />
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Button sx={{ backgroundColor: '#ededed', color: '#000', fontWeight: '600', fontSize: '16px', marginRight: '5px' }} autoFocus onClick={svgDownload} >
                                                SVG <IoIosDownload fontSize={'20px'} />
                                            </Button>
                                            <Button sx={{ backgroundColor: '#ededed', color: '#000', fontWeight: '600', fontSize: '16px' }} autoFocus onClick={svgDownload} >
                                                PNG <IoIosDownload fontSize={'20px'} />
                                            </Button>
                                        </Box>
                                    </DialogActions>
                                </BootstrapDialog>
                            </React.Fragment>
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>

                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container >
            </AppBar >
        </>
    )
}

export default Navbar
