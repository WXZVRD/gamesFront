import React, { useEffect, useState } from "react";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import { Box, Button, CircularProgress, Paper, Stack, Typography } from "@mui/material";
import UserPanel from "../components/UserPanel";
import { IRoom } from "../types/room/room";
import { useAppSelector } from "../redux/hooks";
import { userSelector } from "../redux/slices/userSlice";
import socket from "../socket";
import RoomServices from "../services/RoomServices";
import RoomInfo from "../components/RoomInfo";

const WaitingRoom = () => {
    const { id } = useParams();
    const path = useLocation()
    const game = path.pathname.split('/')[1]
    const [room, setRoom] = useState<IRoom | null>(null);
    const [roomLoaded, setRoomLoaded] = useState(false);
    const user = useAppSelector(userSelector);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoom = async () => {
            if (id) {
                const roomData = await RoomServices.getOne(id);
                setRoom(roomData);
                setRoomLoaded(true);
            }
        };

        fetchRoom();
    }, [id]);

    const handleStartGame = () => {
        if (room && room.users.length !== 2) {
            socket.emit('startGame', {roomId: id})
            navigate(`/${room.game}/${id}`)
        } else {
            alert("Для начала игры нужно два игрока в комнате.");
        }
    };

    const handleLeaveRoom = async () => {
        if (room) {
            socket.emit('leaveRoom', { user, roomId: id });
            await RoomServices.leaveRoom(user, room.id);
            navigate('/');
        }
    };

    useEffect(() => {
        if (roomLoaded) {
            socket.emit('joinRoom', { user, id });

            socket.on('userHasJoinedRoom', (user: string) => {
                setRoom((prevRoom) => {
                    if (prevRoom) {
                        const updatedRoom = {
                            ...prevRoom,
                            users: [...prevRoom.users, user],
                        };

                        return updatedRoom;
                    }
                    return prevRoom;
                });
            });

            socket.on('userHasLeavedRoom', (user: string) => {
                setRoom((prevRoom) => {
                    if (prevRoom) {
                        const updatedUsers = prevRoom.users.filter((u) => u !== user);
                        const updatedRoom = {
                            ...prevRoom,
                            users: updatedUsers,
                        };

                        return updatedRoom;
                    }
                    return prevRoom;
                });
            });

            if (room){
                socket.on('userHasStartedGame', (_: null) => {
                    navigate(`/${room.game}/${id}`)
                });
            }
        }

        return () => {
            socket.off('leftRoom');
            socket.off('joinedToRoom');
        };
    }, [id, roomLoaded]);

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {room && id && game ? (
                <>
                    <RoomInfo id={id} gameName={room.game}/>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '50vh', flexWrap: 'wrap', maxWidth: '400px', width: '100%' }}>
                        <UserPanel nickname={user} />
                        <Typography>VS</Typography>
                        <UserPanel nickname={room.users.find((u) => u !== user) || 'Waiting for enemy'} />
                    </Box>
                    <Stack direction={"column"}>
                        <Button variant={"contained"} disabled={room.users.length === 2} onClick={handleStartGame}>Start the game</Button>
                        <Button color={"error"} variant={"contained"} sx={{ mt: '20px' }} onClick={handleLeaveRoom}>Leave room</Button>
                    </Stack>
                </>
            ) : (
                <CircularProgress />
            )}
        </Box>
    );
};

export default WaitingRoom;
