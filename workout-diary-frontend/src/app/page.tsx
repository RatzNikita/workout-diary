'use client'

import {Header} from "@component/components/Header/Header";
import {Main} from "@component/components/Main/Main";
import React from "react";
import {Provider} from "react-redux";
import store from "@component/store/store";
import {createTheme, ThemeProvider} from "@mui/material";



export default function Home() {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#212121',
            },
            secondary: {
                main: '#eeeeee',
            },
        },
    });


    return (
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <main>
                    <Header/>
                    <Main/>
                    <div> footer</div>
                </main>
            </ThemeProvider>
        </Provider>

    )
}
