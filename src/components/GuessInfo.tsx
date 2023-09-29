import {Button, Paper, Stack, TextField, Typography} from "@mui/material";
import {ChangeEvent, FC, useState} from "react";
import {useParams} from "react-router-dom";
import socket from "../socket";

interface IGuessInfo {
    role: string
}

const GuessInfo: FC<IGuessInfo> = ({ role }) => {
    const { id } = useParams()
    const [ guessedWord, setGuessedWord ] = useState<string>('')

    const handleWord = (event: ChangeEvent<HTMLInputElement>) => {
        setGuessedWord(event.target.value);
    }

    const handleClick = () => {
        socket.emit('guessWord', id, guessedWord )
    }

    return(
        <Paper>
            <Stack alignItems={"center"} p={"40px"}>
                <Typography mb={"20px"}> <b>Your role:</b> { role } </Typography>
                <TextField onChange={handleWord} placeholder={"Try to guess"} size={"small"} sx={{mb:'20px'}} fullWidth/>
                <Button onClick={handleClick} variant={"contained"} fullWidth>Send</Button>
            </Stack>
        </Paper>
    )
}

export default GuessInfo