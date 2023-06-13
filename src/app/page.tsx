'use client'

import {Header} from "@component/components/Header/Header";
import {Main} from "@component/components/Main/Main";
import React from "react";
import {Provider} from "react-redux";
import store from "@component/store/store";

export default function Home() {


  return (
        <Provider store={store}>
            <main className="flex min-h-screen flex-col items-center justify-between p-2  max-w-screen-xl m-auto">
                <Header/>
                <Main />
                <div> footer</div>
            </main>
        </Provider>

  )
}
