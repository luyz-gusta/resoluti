/**************************************************************************************
 *  Goal: Gerenciador de rotas
 *  Author: Luiz Gustavo
 *  Date: 19/01/2023
 *  Version: 1.0
 **************************************************************************************/

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import RegisterUser from "./pages/RegisterUser";
import People from "./pages/People";
import CreatePerson from "./pages/CreatePerson";

const RoutersApp = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="/registeruser" element={<RegisterUser />}/>
                <Route path="/createperson/:session" element={<CreatePerson />}/>
                <Route path="/people" element={<People />}/>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutersApp
