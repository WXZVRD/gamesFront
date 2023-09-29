import {Box, Button, TextField} from "@mui/material";
import {ChangeEvent, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAppSelector} from "../redux/hooks";
import {userSelector} from "../redux/slices/userSlice";
import RoomServices from "../services/RoomServices";


const CodeInput = () => {
    const navigate = useNavigate()
    const user = useAppSelector(userSelector)
    const [code, setCode] = useState<string>('')

    const handleCode = (event: ChangeEvent<HTMLInputElement>) => {
        setCode(event.target.value);
    };

    const handleJoin = async () => {
        await RoomServices.joinRoom(user, code)
        navigate(`/waiting/${code}`)
    }

    return (
        <Box>
            <TextField
                value={code}
                onChange={handleCode}
                placeholder={"*Enter room code"}
                fullWidth
                variant={"outlined"}/>
            <Button
                sx={{mt:'20px'}}
                fullWidth
                disabled={code.length <= 0}
                variant={"contained"}
                onClick={handleJoin}
            >
                Join Room
            </Button>
        </Box>
    )
}

export default CodeInput