import React, { useState, useContext } from "react";
import "./SearchBar.css";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import { CardActionArea } from "@mui/material";
import { GlobalContext } from "../../GlobalContext/GlobalContext";

const SearchBar = () => {
  const { setSearchValue } = useContext(GlobalContext);
  return (
    <div className="search-container">
      <TextField
        className="search-bar"
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        placeholder="Search..."
        variant="standard"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <CardActionArea>
                <SearchIcon />
              </CardActionArea>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default SearchBar;
