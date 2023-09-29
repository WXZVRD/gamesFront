import {Box, Button, Paper, TextField, Typography} from "@mui/material";
import {ChangeEvent, FC, useState} from "react";
import socket from "../socket";
import {useParams} from "react-router-dom";

interface IGuessChat {
    messages: string[]
}

const GuessChat: FC<IGuessChat> = ({ messages,  }) => {
    const { id } = useParams()
    const [messageText, setMessageText] = useState<string>("");

    const handleChat = (e: ChangeEvent<HTMLInputElement>) => {
        setMessageText(e.target.value)
    }

    const handleSend = () => {
        socket.emit('sendMessage', id, messageText)
        setMessageText('')
    }

    return(
        <Paper sx={{p:'20px'}}>
            <Typography sx={{ fontSize: 18, fontWeight: "bold", marginBottom: 1 }}>
                Chat
            </Typography>
            <Box sx={{height:'300px'}}>
                { messages.length > 0
                    ? (
                        messages.map((message, index) => (
                            <Typography key={index}>{message}</Typography>
                        ))
                    )
                    : <Typography sx={{p:"50px 0 0 80px"}}>
                        No messages
                    </Typography>}
            </Box>
            <Box sx={{display:'flex'}}>
                <TextField
                    size={"small"}
                    fullWidth
                    value={messageText}
                    onChange={handleChat}
                />
                <Button onClick={handleSend}>Send</Button>
            </Box>
        </Paper>
    )
}

export default GuessChat