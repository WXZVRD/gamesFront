import {Box, CircularProgress, Grid, Typography} from "@mui/material";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { fetchRooms, roomSelector, roomSelectorStatus } from "../redux/slices/roomSlice";
import RoomCard from "../components/RoomCard";
import { Status } from "../types/common";

const RoomsTable = () => {
    const dispatch = useAppDispatch();
    const rooms = useAppSelector(roomSelector);
    const status = useAppSelector(roomSelectorStatus);

    useEffect(() => {
        dispatch(fetchRooms());
    }, [dispatch]);

    return (
        <Grid
            sx={{ p: '40px 0 40px 40px', width: '100%', justifyContent: 'space-between', display: 'flex', height: '700px', mr: '20px' }}
            direction={"row"}
            container
            spacing={0}>
            {status === Status.LOADING ? (
                <Box sx={{display:'flex', width:"100%", justifyContent:'center'}}>
                    <CircularProgress />
                </Box>
            ) : status === Status.ERROR ? (
                <Box sx={{display:'flex', width:"100%", justifyContent:'center'}}>
                    <Typography variant="body1">Ошибка при загрузке комнат.</Typography>
                </Box>
            ) : rooms.length === 0 ? (
                <Box sx={{display:'flex', width:"100%", justifyContent:'center'}}>
                    <Typography variant="body1">Нет доступных комнат.</Typography>
                </Box>
            ) : (
                rooms.map((room, index) => (
                    <Grid item xs={12} sm={12} md={10} lg={6} xl={3} key={index}>
                        <RoomCard {...room} />
                    </Grid>
                ))
            )}
        </Grid>
    );
};


export default RoomsTable;

