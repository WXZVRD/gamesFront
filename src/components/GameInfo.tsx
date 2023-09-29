import React, {FC} from 'react';
import { Box, Typography } from '@mui/material';

interface IGameInfo {
    player: string,
    currentPlayer: string
}

const GameInfo: FC<IGameInfo> = ({ player, currentPlayer }) => {
    return (
        <Box sx={{mb:'40px'}}>
            <Typography variant="h6">Player: {player}</Typography>
            <Typography variant="h6">Current Turn: {currentPlayer}</Typography>
        </Box>
    );
};

export default GameInfo;
