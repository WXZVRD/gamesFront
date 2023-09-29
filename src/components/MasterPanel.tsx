import {Button, Paper, Stack, TextField, Typography} from "@mui/material";
import {ChangeEvent, FC, useState} from "react";
import socket from "../socket";
import {useParams} from "react-router-dom";

interface IMasterPanel {
    role: string
}

const MasterPanel: FC<IMasterPanel> = ({ role }) => {
    const { id } = useParams()
    const [ word, setWord ] = useState<string>('')

    const handleWord = (event: ChangeEvent<HTMLInputElement>) => {
        setWord(event.target.value);
    }

    const handleClick = () => {
        socket.emit('chooseWord', id, word )
    }

    return(
        <Paper>
            <Stack alignItems={"center"} p={"40px"}>
                <Typography mb={"20px"}> <b>Your role:</b> { role } </Typography>
                <TextField onChange={handleWord} placeholder={"Input the word to guess"} size={"small"} sx={{mb:'20px'}} fullWidth/>
                <Button onClick={handleClick} variant={"contained"} fullWidth>Send</Button>
            </Stack>
        </Paper>
    )
}

export default MasterPanel