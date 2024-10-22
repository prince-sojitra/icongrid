import React, { useState, useEffect, useRef } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import { styled, useTheme } from '@mui/material/styles';
import MuiAppBar from '@mui/material/AppBar';
import MuiCssBaseline from '@mui/material/CssBaseline';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { BsGem } from 'react-icons/bs';
import { BiSolidAdjust, BiSolidAdjustAlt } from 'react-icons/bi';
import { PiApertureBold } from 'react-icons/pi';
import { TbBrandThingiverse } from 'react-icons/tb';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import { FaRegBuilding, FaBookmark, FaBuffer } from 'react-icons/fa';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import Stack from '@mui/material/Stack';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Topprops from './Topprops';
import FullScreenDialog from './FullScreenDialog';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import MenuList from '@mui/material/MenuList';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    })
);

const Components = [
    {
        path: '',
        icon: <BiSolidAdjust />,
        page: 'Regular',
    },
    {
        path: '',
        icon: <PiApertureBold />,
        page: 'Bold',
    },
    {
        path: '',
        icon: <BiSolidAdjustAlt />,
        page: 'Solid',
    },
    {
        path: '',
        icon: <TbBrandThingiverse />,
        page: 'Thin',
    },
];
const corner = [
    {
        path: '',
        icon: <FaBookmark />,
        page: 'Rounded',
    },
    {
        path: '',
        icon: <FaRegBuilding />,
        page: 'straight',
    },
];

const StyledPaper = styled('div')({
    position: 'absolute',
    zIndex: 1,
    mt: 1,
    width: '100%',
    maxHeight: '250px',
    overflowY: 'auto',
    backgroundColor: '#cccccc90',
    borderRadius: '10px',
    boxShadow: '0px 0px 10px #434343de'
});


const Searchicons = () => {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const [selectedIconType, setSelectedIconType] = useState('Regular'); // Initial state is Regular
    const [selectedIconId, setSelectedIconId] = useState('');
    const [iconType, setIconType] = useState('all');
    const [entityType, setEntityType] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const theme = useTheme();
    const history = useHistory();
    const location = useLocation();
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);

    useEffect(() => {
        console.log("De,dfds");
        getCategory()
        Gotoup()
    }, [])
    const Gotoup = () => {
        window.scrollTo({ top: 0, left: 0, behavior: "auto" })
    }

    const handleOpenDialog = (iconId, entityName) => {
        setDialogOpen(true);
        setSelectedIconId(iconId);
        setEntityType(entityName)
    };

    const handleCloseDialog = async (iconId) => {
        setDialogOpen(false);
    };

    const handleSearchChange = (event) => {
        const newValue = event.target.value;
        setSearchValue(newValue);
        getSuggestTagName(newValue);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit(searchValue, event);
            setSearch(searchValue)
        }
    };

    const handleSearchSubmit = (suggestion, event) => {
        if (event && event.preventDefault) {
            event.preventDefault();
        }
        let inputValue;
        if (suggestion) {
            inputValue = suggestion;
        } else {
            inputValue = searchValue;
        }
        getSearchIcons(inputValue);
    };

    useEffect(() => {
        if (location.state) {
            setSearchValue(location.state.searchValue);
            setSearch(location.state.searchValue);
            getSearchIcons(location.state.searchValue);
            getSuggestTagName(location.state.searchValue);
        }
    }, [location.state]);


    const handleSuggestionClick = (suggestion, event) => {
        if (event) {
            event.preventDefault();
        }
        setSearchValue(suggestion);
        setSearch(suggestion);
        setSuggestions([]);
        handleSearchSubmit(suggestion);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                inputRef.current &&
                !inputRef.current.contains(event.target) &&
                event.target.tagName !== 'BODY' &&
                !event.target.classList.contains('MuiMenuItem-root')
            ) {
                setSuggestions([]);
            }
        };

        const handleClickOutsideSuggestion = (event) => {
            if (
                suggestionsRef.current &&
                !suggestionsRef.current.contains(event.target) &&
                event.target.tagName !== 'BODY'
            ) {
                setSuggestions([]);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('mousedown', handleClickOutsideSuggestion);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('mousedown', handleClickOutsideSuggestion);
        };
    }, [suggestionsRef, inputRef]);

    const getIconType = async (event) => {
        const newValue = event.target.value;
        setIconType(newValue);
    };

    useEffect(() => {
        if (iconType !== '') {
            getSearchIcons(searchValue);
        }
    }, [iconType]);

    const getSearchIcons = (searchValue) => {
        if (searchValue) {
            setLoading(true);
            axios
                .get(`http://localhost:3001/tag/findByName/${searchValue}`)
                .then((res) => {
                    const { animated, icon, interfaceData, popularIcon } = res.data.data;
                    let concatenatedArray = [];

                    if (iconType === 'interface') {
                        concatenatedArray = interfaceData.map((el) => ({ ...el, entityType: 'interface' }));
                    } else if (iconType === 'animated') {
                        concatenatedArray = animated.map((el) => ({ ...el, entityType: 'animated' }));
                    } else if (iconType === 'popular') {
                        concatenatedArray = popularIcon.map((el) => ({ ...el, entityType: 'popular' }));
                    } else if (iconType === 'icon') {
                        concatenatedArray = icon.map((el) => ({ ...el, entityType: 'icon' }));
                    } else {
                        concatenatedArray = animated.map((el) => ({ ...el, entityType: 'animated' }))
                            .concat(icon.map((el) => ({ ...el, entityType: 'icon' })),
                                interfaceData.map((el) => ({ ...el, entityType: 'interface' })),
                                popularIcon.map((el) => ({ ...el, entityType: 'popular' })));
                    }

                    console.log(`Search ${iconType} Icons :- `, concatenatedArray);
                    setData(concatenatedArray);

                    setLoading(false);
                })
                .catch((error) => {
                    setData([]);
                    setLoading(false);
                    console.log(error.response.data);
                });
        }
    };

    const getSuggestTagName = (searchValue) => {
        if (searchValue) {
            axios
                .get(`http://localhost:3001/tag/find`)
                .then((res) => {
                    const { animated, icon, interfaceData, popularIcon } = res.data.data;
                    const concatenatedArray = animated.concat(icon, interfaceData, popularIcon);

                    const filteredSuggestions = concatenatedArray
                        .filter((tag) => tag.includes(searchValue)) // Filter suggestions that include the search value
                        .reduce((acc, cur) => { // Reduce to filter out duplicates
                            if (!acc.includes(cur)) {
                                acc.push(cur);
                            }
                            return acc;
                        }, []);

                    setSuggestions(filteredSuggestions);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        }
    };

    const getCategory = () => {
        axios.get('http://localhost:3001/category/find')
            .then((res) => {
                console.log("Demoooo :- ", res.data.data);
                setCategory(res.data.data)
            })
            .catch((error) => {
                console.log(error.response.data);
            })
    }


    return (
        <Box sx={{ display: 'flex' }}>
            <MuiCssBaseline />

            <Drawer variant="permanent" open={open}>
                <List sx={{ paddingTop: '10px' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={() => setOpen(true)}
                        edge="start"
                        sx={{
                            margin: 0,
                            padding: '8px 20px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton sx={{ display: open ? 'block' : 'none', padding: '8px 20px' }} onClick={() => setOpen(false)}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                    <ListItem sx={{ padding: '8px 20px' }}>
                        <ListItemIcon sx={{ minWidth: '30px', color: '#fff', fontSize: '18px' }}>
                            <BsGem />
                        </ListItemIcon>
                        <Typography className="style" sx={{ color: '#fff', textTransform: 'uppercase', fontSize: '18px', opacity: open ? 1 : 0 }}>
                            {' '}
                            Style
                        </Typography>
                    </ListItem>
                    {Components.map((component) => (
                        <ListItem key={component.page} disablePadding onClick={() => setSelectedIconType(component.page)}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        fontSize: '20px',
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {component.icon}
                                </ListItemIcon>
                                <ListItemText primary={component.page} sx={{ opacity: open ? 1 : 0, fontSize: '14px' }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem sx={{ padding: '8px 20px' }}>
                        <ListItemIcon sx={{ minWidth: '30px', color: '#fff', fontSize: '18px' }}>
                            <BsGem />
                        </ListItemIcon>
                        <Typography sx={{ color: '#fff', textTransform: 'uppercase', fontSize: '18px', opacity: open ? 1 : 0 }}>Corner</Typography>
                    </ListItem>
                    {corner.map((component) => (
                        <ListItem key={component.page} disablePadding onClick={() => setSelectedIconType(component.page)}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        fontSize: '20px',
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    {component.icon}
                                </ListItemIcon>
                                <ListItemText primary={component.page} sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    <ListItem sx={{ padding: '8px 20px' }}>
                        <ListItemIcon sx={{ minWidth: '30px', color: '#fff', fontSize: '18px' }}>
                            <BsGem />
                        </ListItemIcon>
                        <Typography sx={{ color: '#fff', textTransform: 'uppercase', fontSize: '18px', opacity: open ? 1 : 0 }}>Category</Typography>
                    </ListItem>
                    {console.log("category sgdghfcg :- ", category)}
                    {category.map((component, index) => (
                        (index <= 10) ? (
                            <ListItem key={index} disablePadding onClick={() => history.push(component.path)}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            fontSize: '20px',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <FaBuffer />
                                    </ListItemIcon>
                                    <ListItemText primary={component.name} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ) : ('Demo')
                    ))}
                </List>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>

                <div>
                   
                    <form className="search-bar" onSubmit={handleSearchSubmit}>
                        <TextField
                            select
                            label="Icon Type"
                            sx={{ width: '200px'}}
                            variant="outlined"
                            size="small"
                            value={iconType}
                            onChange={getIconType}
                        >
                            <MenuItem value="all">All Icons</MenuItem>
                            <MenuItem value="icon">Icon</MenuItem>
                            <MenuItem value="interface">Interface</MenuItem>
                            <MenuItem value="animated">Animated</MenuItem>
                            <MenuItem value="popular">Popular</MenuItem>
                        </TextField>

                        <Box sx={{ position: 'relative', width: '100%' }}>
                            <TextField
                                label="Search"
                                fullWidth
                                variant="outlined"
                                size="small"
                                value={searchValue}
                                onChange={handleSearchChange}
                                onKeyPress={handleKeyPress}
                                inputRef={inputRef}
                                InputProps={{ autocomplete: "off" }}
                            />

                            {searchValue && (
                                <StyledPaper>
                                    <MenuList>
                                        {suggestions.map((suggestion, index) => (
                                            <MenuItem key={index} onClick={() => handleSuggestionClick(suggestion)}>
                                                {suggestion}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </StyledPaper>
                            )}
                        </Box>
                        <button type="submit">Search</button>
                    </form>
                </div>

                <DrawerHeader />

                <Container maxWidth="xl">
                    {isLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
                            <span class="loader"></span>
                        </Box>
                    ) : (
                        <>
                            <Box sx={{ fontSize: { xs: '23px', sm: '50px', md: '72px' }, textTransform: 'uppercase', fontWeight: '800', color: 'rgb(255 188 6 / 47%)', textAlign: 'center' }}>
                                Search
                            </Box>
                            <Box sx={{ fontSize: { xs: '19px', sm: '50px', md: '72px' }, marginTop: { xs: '-23px', sm: '-48px', md: '-65px' }, textTransform: 'uppercase', fontWeight: '600', color: '#272727', textAlign: 'center' }}>
                                Icons
                            </Box>
                            <Box sx={{ fontSize: { xs: '10px', sm: '', md: '16px' }, margin: { xs: '0px', md: 'auto' }, width: { xs: '100%', md: '50%' }, textAlign: 'center', marginTop: '10px', paddingBottom: '10px', color: '#888888' }}>
                                {data.length} {search} Icons
                            </Box>
                            <Box className="search" sx={{ paddingTop: '40px' }}>
                                <Grid container spacing={4} justifyContent="center">
                                    {data.length > 0 ? (
                                        <>
                                            {data.map((el, index) => (
                                                <Grid key={index} item lg={2} md={4} onClick={() => handleOpenDialog(el._id, el.entityType)} >
                                                    {el.icon ? (
                                                        <Topprops image={el.icon} />
                                                    ) : (
                                                        <Topprops image={el[selectedIconType.toLowerCase()]} />
                                                    )}
                                                </Grid>
                                            ))}
                                            <FullScreenDialog open={isDialogOpen} onClose={() => handleCloseDialog(selectedIconId)} iconId={selectedIconId} entityType={entityType} />
                                        </>
                                    ) : (
                                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Box sx={{fontSize:{xs:'22px',md:'32px' , textAlign:'center' , fontWeight:'600'}}}>Sorry, we couldn’t find any matches for <span style={{ color: '#ffbc06' }}>{search}</span> icons</Box>
                                        </Grid>
                                    )}
                                </Grid>

                                <Box sx={{ display: 'flex', justifyContent: 'center', padding: '10px 0px' }}>
                                    <Stack spacing={2}>
                                        <Pagination
                                            count={10}
                                            renderItem={(item) => (
                                                <PaginationItem
                                                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                                                    {...item}
                                                />
                                            )}
                                        />
                                    </Stack>
                                </Box>
                            </Box>

                        </>
                    )}
                </Container>
            </Box>
        </Box>
    );
}

export default Searchicons;
