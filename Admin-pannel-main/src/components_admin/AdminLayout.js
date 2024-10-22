import React, { useEffect, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Stack from '@mui/material/Stack';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import favicon from '../components/img/logo.png'

import { BsMenuButtonWide, BsJournalText, BsReverseLayoutTextWindowReverse, BsBarChart, BsGem, BsPerson, BsQuestionCircle, BsEnvelope, BsCardList, BsBoxArrowInRight, BsDashCircle, BsGrid, BsExclamationCircle, BsXCircle } from "react-icons/bs";

import CircleIcon from '@mui/icons-material/Circle';


import useMediaQuery from '@mui/material/useMediaQuery';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import Hidden from '@mui/material/Hidden';


import { useHistory } from "react-router-dom";



const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Mainbody = (props) => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let history = useHistory();
  const [token, setToken] = useState('')

  useEffect(() => {
    let token = localStorage.getItem("token")
    if (!token) {
      return history.push("/login")
    }
    setToken(token)
  }, [])

  const LogOut = () => {
    localStorage.removeItem('token')
    history.push('/login')
  }


  // console.log("history", history)


  const handleDrawer = () => {
    setOpen(!open);
  }


  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));


  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));


  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));


  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      id="account-menu"
      open={isMenuOpen}
      onClose={handleMenuClose}
      // onClick={handleMenuClose}
      PaperProps={{
        elevation: 0,
        sx: {
          // overflow: 'visible',
          filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
          mt: 1.5,
          '& .MuiAvatar-root': {
            width: 32,
            height: 32,
            ml: -0.5,
            mr: 1,
          },
          '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: 'background.paper',
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
          },
        },
      }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
    >


      <MenuItem onClick={LogOut} color='#fff'>
        <ListItemIcon >
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';


  const darkTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        main: '#fff',
      },
    },
  });

  const [notifyMenu, setNotifyMenu] = React.useState(null);
  const openNotify = Boolean(notifyMenu);


  function handleNotifyClick(event) {
    setNotifyMenu(event.currentTarget);
  }

  // const handleNotifyClick = (event) => {
  //   setNotifyMenu(event.currentTarget);
  // };

  const handleNotifyClose = () => {
    setNotifyMenu(null);
    // handleNotificationCloses();
  };
  // const handleNotificationCloses = () => {
  //   setNotifyMenu(null);

  // }






  // Dropdown Pages 
  const Components = [
    {
      path: "/admin/icons/icon",
      page: "Icon"
    },
    {
      path: "/admin/icons/animated-Icon",
      page: "Animated Icon"
    },
    {
      path: "/admin/icons/interface-Icon",
      page: "Interface icon"
    }
  ];
  const Components1 = [
    {
      path: "/admin/popular-icon/icon",
      page: "Icon"
    },
    {
      path: "/admin/popular-icon/category",
      page: "Category"
    }
  ];
  const Tables = ["General Tables", "Data Tables"];
  const Charts = ["Chart.js", "ApexCharts", "ECharts"];
  const Icons = ["Bootstrap Icons", "Remix Icons", "Boxions"]

  //Pages 

  const Pages = [

    {
      page: "Login",
      icon: <BsBoxArrowInRight />,
      path: "/login"
    },
    {
      page: "Error 404",
      icon: <BsDashCircle />,
      path: ""
    }
  ]


  // Dropdown manage state object 
  const DropdownExpand = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  }
  const DropdownExpand1 = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false
  }

  // Dropdown Expand State 
  const [expand, setExpand] = React.useState(DropdownExpand);
  const [expand1, setExpand1] = React.useState(DropdownExpand1);

  // use for screen breakpoint 
  // const isMd = useMediaQuery(theme.breakpoints.up('md'));
  const isLG = useMediaQuery(theme.breakpoints.up('lg'));


  if (!token) {
    return <span class="loader"></span>
  }

  return (
    <>


      <Box sx={{ flexGrow: 1, position: "sticky", top: 0 , backgroundColor:'#272727'}} zIndex={1030}>
        <ThemeProvider theme={darkTheme}>
          <AppBar position="static" sx={{ backgroundColor:'#272727' , color:'#fff'}}>
            <Toolbar>
              <Stack spacing={1} direction="row" alignItems="center" sx={{ width: { xs: "50%", md: "20%" } }}>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    letterSpacing: '.3rem',
                    color: '#fff',
                    textDecoration: 'none',
                    display: 'contents'
                  }}
                >
                  <a className='center-logo' href=""><span style={{ letterSpacing: 'initial', fontSize: '28px', color: '#fff', fontWeight: '600' }}>Ic</span><img width={'25px'} src={favicon} alt="" srcset="" /><span style={{ marginLeft: "1px", fontSize: '28px', letterSpacing: 'initial', color: '#fff', fontWeight: '600' }}>nGrid</span></a>


                </Typography>
              </Stack>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mx: { md: "15px", xs: "5px" } }}
                onClick={handleDrawer}
              >
                <MenuIcon sx={{ fontSize: 30 }} />
              </IconButton>
              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  disableRipple
                >
                  <Tooltip title="Account settings">
                    <Stack direction="row">
                      <Avatar alt="Profile" src={favicon}></Avatar>
                      <Button
                        size='small'
                        variant="contained"
                        disableElevation
                        endIcon={<KeyboardArrowDownIcon />}
                        disableRipple
                        sx={{ textTransform: 'capitalize', fontSize: "16px", paddingRight: "0px" }}
                        className='profileBTN'
                      >
                        icongrid
                      </Button>
                    </Stack>
                  </Tooltip>
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                  disableRipple
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
        </ThemeProvider>
      </Box>



      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <CssBaseline />

        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant={isLG ? "persistent" : "temporary"}
          anchor="left"
          open={open}
        >

          <Hidden lgUp>
            <DrawerHeader  >
              <Stack spacing={1} direction="row" justifyContent="center" alignItems="center" sx={{ width: "100%" }}>

                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  href="#app-bar-with-responsive-menu"

                  sx={{
                    mr: 2,
                    // display: 'flex' ,
                    fontFamily: '"Nunito", sans-serif',
                    fontSize: "24px",
                    color: "#012970",
                    textDecoration: 'none',
                  }}
                >
                  <a className='center-logo' href=""><span style={{ letterSpacing: 'initial', fontSize: '28px', color: '#fff', fontWeight: '600' }}>Ic</span><img width={'25px'} src={favicon} alt="" srcset="" /><span style={{ marginLeft: "1px", fontSize: '28px', letterSpacing: 'initial', color: '#fff', fontWeight: '600' }}>nGrid</span></a>


                </Typography>

              </Stack>


              <IconButton onClick={handleDrawer}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
              </IconButton>
            </DrawerHeader>

          </Hidden>

          <Divider />

          <Box sx={{ padding: "20px 0px 70px" }}>
            <List >
              <ListItem sx={{ padding: "0px 20px" }} onClick={() => { history.push("/admin") }}>
                <ListItemButton >
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    <BsGrid />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItemButton>
              </ListItem>

              <ListItem sx={{ padding: "0px 20px" }}>
                <ListItemButton onClick={() => setExpand({ ...expand, 1: !expand[1] })}>
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    <BsGem />
                  </ListItemIcon>
                  <ListItemText primary="Icons" />
                  {expand[1] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              <Collapse in={expand[1]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding dense>
                  {Components.map((component, index) => (
                    <ListItem key={index} disablePadding onClick={() => { history.push(component.path) }}>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemIcon sx={{ minWidth: "20px", marginLeft: "30px" }}>
                          <CircleIcon sx={{ fontSize: "9px" }} />
                        </ListItemIcon>
                        <ListItemText primary={component.page} />
                      </ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
              <ListItem sx={{ padding: "0px 20px" }} onClick={() => { history.push("/admin/category") }}>
                <ListItemButton >
                  <ListItemIcon sx={{ minWidth: "30px" }}>
                    <BsGrid />
                  </ListItemIcon>
                  <ListItemText primary="Category" />
                </ListItemButton>
              </ListItem>
            </List>
            <ListItem sx={{ padding: "0px 20px" }}>
              <ListItemButton onClick={() => setExpand1({ ...expand1, 1: !expand1[1] })}>
                <ListItemIcon sx={{ minWidth: "30px" }}>
                  <BsGem />
                </ListItemIcon>
                <ListItemText primary="Popular Icon" />
                {expand1[1] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
            </ListItem>
            <Collapse in={expand1[1]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding dense>
                {Components1.map((component, index) => (
                  <ListItem key={index} disablePadding onClick={() => { history.push(component.path) }}>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemIcon sx={{ minWidth: "20px", marginLeft: "30px" }}>
                        <CircleIcon sx={{ fontSize: "9px" }} />
                      </ListItemIcon>
                      <ListItemText primary={component.page} />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <List subheader={
              <ListSubheader component="div">
                PAGES
              </ListSubheader>
            }>
              {Pages.map((PageEle, index) => (
                <ListItem key={index} sx={{ padding: "0px 20px" }}>
                  <ListItemButton onClick={() => { history.push(PageEle.path) }}>
                    <ListItemIcon sx={{ minWidth: "30px" }}>
                      {PageEle.icon}
                    </ListItemIcon>
                    <ListItemText primary={PageEle.page} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>


        </Drawer>
        <Main open={open} sx={{ maxWidth: "100%", backgroundColor: "#f6f9ff" }}>
          {props.children}
        </Main>
        {renderMenu}
      </Box>

    </>
  )
}

export default Mainbody;