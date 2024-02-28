
import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home.tsx'
import './assets/scss/app.scss'
import {store} from "./store/store.ts"
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <Home/>
    </Provider>
)
