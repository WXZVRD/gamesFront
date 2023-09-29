import {Box, Button, Paper, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import CodeInput from "../components/CodeInput";
import CreateRoomPanel from "../components/CreateRoomPanel";


const SideBar = () => {



    return(
        <Paper
            sx={{p:'40px 40px 40px 40px',
                maxWidth: {
                    xs: '200px',
                    sm: '250px',
                    md: '300px',
                    lg: '350px',
                    xl: '400px'
                },
                width:'100%',
                height:'100vh'}}>
            <CodeInput/>
            <CreateRoomPanel/>
        </Paper>
    )
}

export default SideBar