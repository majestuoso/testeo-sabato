import { useState, forwardRef, useImperativeHandle } from "react";
import { InputAdornment, IconButton, styled, OutlinedInput, FormControl } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  width: "100%",
  marginBottom: theme.spacing(3),
  "& .MuiOutlinedInput-root": {
    backgroundColor: theme.palette.grey[100],
    borderRadius: "8px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    transition: "box-shadow 0.3s, background-color 0.3s",
    padding: "6px 16px",

    "& fieldset": { border: "none" },

    "& .MuiInputBase-input": {
      padding: 0,
    },

    "&.Mui-focused": {
      boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
      backgroundColor: theme.palette.common.white,
    },
    "&.Mui-focused fieldset": { borderColor: "transparent" },
  },
  "& input::placeholder": {
    color: theme.palette.text.secondary,
    opacity: 1,
  },
}));

const SearchBar = forwardRef(({ onSearch }, ref) => {
  const [query, setQuery] = useState("");

  useImperativeHandle(ref, () => ({
    clear: () => setQuery("")
  }));

  const handleSearch = () => {
    if (onSearch) onSearch(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <StyledFormControl variant="outlined">
      <OutlinedInput
        placeholder="Buscar por título o autor..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end" color="primary" onClick={handleSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
      />
    </StyledFormControl>
  );
});

export default SearchBar;