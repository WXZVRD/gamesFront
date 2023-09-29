import { Autocomplete, Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import RoomServices from "../services/RoomServices";
import {useAppSelector} from "../redux/hooks";
import {userSelector} from "../redux/slices/userSlice";
import {useNavigate} from "react-router-dom";

const GameTypes = {
    TicTacToe: 'TicTacToe',
    GuessWord: 'GuessWord'
} as const;

type GameType = typeof GameTypes[keyof typeof GameTypes];

const CreateRoomPanel = () => {
    const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
    const user = useAppSelector(userSelector)
    const navigate = useNavigate()

    const handleGameChange = (event: React.SyntheticEvent, value: GameType | null) => {
        if (value) {
            setSelectedGame(value);
        }
    };

    const handleCreate = async () => {
        if (selectedGame){
            const room = await RoomServices.createRoom(user, selectedGame)
            navigate(`/waiting/${room.id}`)
        }
    }

    const isButtonDisabled = selectedGame === null;

    return (
        <Box sx={{ mt: '40px' }}>
            <Autocomplete
                value={selectedGame}
                onChange={handleGameChange}
                options={Object.values(GameTypes)}
                renderInput={(params) => <TextField {...params} label="Select Game" />}
            />
            <Button
                sx={{ mt: '20px' }}
                fullWidth
                disabled={isButtonDisabled}
                variant="contained"
                onClick={handleCreate}
            >
                Create Room
            </Button>
        </Box>
    );
};

export default CreateRoomPanel;
