import { Button, Stack } from "@mui/material";
import Board from "../components/Board";
import {useNavigate, useParams} from "react-router-dom";
import RoomInfo from "../components/RoomInfo";
import GameInfo from "../components/GameInfo";
import { useState, useEffect } from "react";
import calculateWinner from "../utils/calcWinner";
import WinnerModal from "../modals/winnerModal";
import RoomServices from "../services/RoomServices";
import { IRoom } from "../types/room/room";
import { useAppSelector } from "../redux/hooks";
import { userSelector } from "../redux/slices/userSlice";
import socket from "../socket";

const TicTacToe = () => {
    const { id: roomId } = useParams();
    const navigate = useNavigate()
    const [board, setBoard] = useState<Array<string | null>>(Array(9).fill(null));
    const [currentPlayer, setCurrentPlayer] = useState<string>("X");
    const [playerSymbol, setPlayerSymbol] = useState<string>("");
    const [result, setResult] = useState<string | null>(null);
    const [roomLoaded, setRoomLoaded] = useState(false);
    const [room, setRoom] = useState<IRoom | null>(null);
    const user = useAppSelector(userSelector);

    useEffect(() => {
        const winner = calculateWinner(board);
        if (winner) {
            setResult(winner);
        }
    }, [board]);

    useEffect(() => {
        const fetchRoom = async () => {
            if (roomId) {
                try {
                    const roomData = await RoomServices.getOne(roomId);
                    setRoom(roomData);
                    setRoomLoaded(true)
                } catch (error) {
                    console.error("Error fetching room data:", error);
                }
            }
        };

        fetchRoom();
    }, [roomId]);

    useEffect(() => {
        if (roomLoaded && room) {
            setPlayerSymbol(room.users[0] === user ? "O" : "X");
        }
    }, [roomLoaded, room, user]);

    useEffect(() => {
        socket.on('userHasMoved', (newBoard: Array<string | null>, enemy: string) => {
            setBoard(newBoard)
            setCurrentPlayer( enemy === "X" ? "O" : "X" )
        })

        socket.on('userSurrendered', (_: string) => {
            setResult(playerSymbol === "X" ? "O" : "X")
        })

        return () => {
            socket.off('userHasMoved');
        };
    }, [roomId, roomLoaded])

    const handlerClick = (index: number) => {
        if (currentPlayer !== playerSymbol || board[index] !== null) {
            return;
        }
        const newBoard = [...board];
        newBoard[index] = playerSymbol;
        setBoard(newBoard);

        socket.emit('move', newBoard, roomId, playerSymbol )
    };

    const handleLeaveRoom = async () => {
        if (room) {
            socket.emit('leaveRoom', { user, roomId });
            await RoomServices.leaveRoom(user, room.id);
            navigate('/');
        }
    };

    const handleSurrender = async () => {
        if (room) {
            socket.emit('surrender', user, roomId);
            await RoomServices.leaveRoom(user, room.id);
            navigate('/');
        }
    };

    return (
        <Stack direction={"column"} alignItems={"center"}>
            <RoomInfo id={roomId || "Current game id"} gameName={"Tic Tac Toe"} />
            <GameInfo player={playerSymbol} currentPlayer={currentPlayer} />
            <Board squares={board} handlerClick={handlerClick} />

            <Button
                onClick={handleSurrender}
                variant={"contained"}
                color={"warning"}
                sx={{ mt: "40px" }}>
                Surrender
            </Button>

            {result && <WinnerModal result={result} player={playerSymbol} handleClick={handleLeaveRoom}/>}
        </Stack>
    );
};

export default TicTacToe;
