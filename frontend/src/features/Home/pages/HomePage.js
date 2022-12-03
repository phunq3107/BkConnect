import React from 'react';
import Header from "../../../commons/Header";
import {createTheme, ThemeProvider} from "@mui/material";


const theme = createTheme()

function HomePage(props) {
    return (
        <ThemeProvider theme={theme}>
            <Header/>
        </ThemeProvider>
    );
}

export default HomePage;