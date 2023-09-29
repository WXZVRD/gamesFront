import {Box, Button, Paper, Typography} from "@mui/material";
import {FC} from "react";
import {IRoom} from "../types/room/room";
import RoomServices from "../services/RoomServices";
import {useAppSelector} from "../redux/hooks";
import {userSelector} from "../redux/slices/userSlice";
import {useNavigate} from "react-router-dom";

const TicTacTieCover = require('../assets/TicTacToeCover.png')
const GuessWordCover = require('../assets/guessTheWord.jpg')

const RoomCard: FC<IRoom> = ({ id, host, status, users, game }) => {
    const user = useAppSelector(userSelector)
    const navigate = useNavigate()

    const handleJoin = async () => {
        await RoomServices.joinRoom(user, id)
        navigate(`/waiting/${id}`)
    }

    return(
        <Paper sx={{width:'100%', maxWidth:'300px', mb:'40px'}}>
            <img
                style={{maxWidth:'300px', width:'100%', borderRadius:'3px'}}
                src={game === 'TicTacToe' ? TicTacTieCover : GuessWordCover}/>
            <Box sx={{p:'10px 10px'}}>
                <Typography mb={'5px'}>Game: { game }</Typography>
                <Typography mb={'5px'}>Host: { host }</Typography>
                <Typography mb={'5px'}>Status: { status }</Typography>
                <Typography mb={'5px'}>Count: { users.length }</Typography>

                <Button
                    fullWidth
                    variant={"contained"}
                    sx={{mt:'10px'}}
                    disabled={users.length === 2}
                    onClick={handleJoin}
                >
                    Join Room
                </Button>
            </Box>
        </Paper>
    )
}

export default RoomCard