import React, { useState } from "react";
import { useSearch } from "../../context/SearchProvider";
import { useNavigate } from "react-router-dom";
import { Box, IconButton, TextField } from "@mui/material";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");

  const handleSearch = async () => {
    try {
      const { data } = await axios.get(`/search/${keyword}`);
      setValues({ ...values, results: data });
      navigate("/search");
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    setKeyword(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Box display="flex" alignItems="center">
      <TextField
        value={keyword}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        label="Search"
        variant="outlined"
        size="small"
        fullWidth
      />
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Box>
  );
};

export default SearchBar;
