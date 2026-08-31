import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#653A1B", 
    },
    secondary: {
      main: "#36332D", // etiqeutas
    },
    button:{
        main:"#f25600"
    },
    body:{
        main:"#4A4C52"
    }
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});

export default theme;
