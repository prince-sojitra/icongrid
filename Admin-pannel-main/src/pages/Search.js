import { Box, Link } from "@mui/material";
import React, { useState, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import axios from "axios";

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

const SearchBar = () => {
    const [searchValue, setSearchValue] = useState('');
    const [iconType, setIconType] = useState('all');
    const [suggestions, setSuggestions] = useState([]);
    let history = useHistory();
    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);

    const handleSearchChange = (event) => {
        const newValue = event.target.value;
        setSearchValue(newValue);
        getSuggestTagName(newValue);
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    const handleSearchSubmit = (suggestion) => {
        if (suggestion) {
            history.push({
                pathname: '/search-icon',
                state: { searchValue: suggestion }
            });
        } else {
            history.push({
                pathname: '/search-icon',
                state: { searchValue: searchValue }
            });
        }
    };

    const getIconType = async (event) => {
        const newValue = event.target.value;
        setIconType(newValue);
    };

    const handleSuggestionClick = (suggestion, event) => {
        if (event) {
            event.preventDefault();
        }
        setSearchValue(suggestion);
        setSuggestions([]);
        handleSearchSubmit(suggestion);
    };

    useEffect(() => {
        if (searchValue) {
            getSuggestTagName(searchValue);
        }
    }, [searchValue]);

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

    return (
        <div>

            <form className="search-bar" onSubmit={handleSearchSubmit}>
                <TextField
                    select
                    label="Icon Type"
                    sx={{ width: '200px' }}
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

            {/* <form className="search-bar" onSubmit={(e) => {
                e.preventDefault();
                handleSearchSubmit();
            }}>
                <select className="settt" value={searchValue} onChange={handleSearchChange}>
                    <option value="">All icons</option>
                    <option value="option1">Interface icons</option>
                    <option value="option2">Animated icons</option>
                </select>
                <input
                    type="text"
                    placeholder="Search…"
                    aria-label="search"
                    value={searchValue}
                    onChange={handleSearchChange}
                    onKeyPress={handleKeyPress}
                />
                <button type="submit">
                    Search
                </button>
            </form> */}
        </div>
    );
};

export default SearchBar;
