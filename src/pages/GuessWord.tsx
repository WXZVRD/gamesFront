import {Box, Button, CircularProgress, Paper, TextField, Typography, Container, Stack} from "@mui/material";
import { Alert, AlertTitle } from "@mui/material";

import RoomInfo from "../components/RoomInfo";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import TriesPanel from "../components/TriesPanel";
import GuessInfo from "../components/GuessInfo";
import GuessChat from "../components/GuessChat";
import {IRoom} from "../types/room/room";
import RoomServices from "../services/RoomServices";
import {useAppSelector} from "../redux/hooks";
import {userSelector} from "../redux/slices/userSlice";
import Waiting from "../components/wating";
import MasterPanel from "../components/MasterPanel";
import socket from "../socket";
import WinnerModal from "../modals/winnerModal";

const GuessWord = () => {

    const location = useLocation()
    const game = location.pathname.split('/')[1]
    const navigate = useNavigate()

    const { id } = useParams()
    const [room, setRoom] = useState<IRoom | null>(null)

    const user = useAppSelector(userSelector)

    const userRole = room?.users[0] === user ? 'master' : 'guesser';

    const [result, setResult] = useState<string | null>(null);

    const [word, setWord] = useState<string>('')

    const [messages, setMessages] = useState<string[]>([]);

    const [tries, setTries] = useState<string[]>([])

    useEffect(() => {
        if (id){
            const fetchRoom = async () => {
                const resp = await RoomServices.getOne(id)
                setRoom(resp)
            }

            fetchRoom()
        }

        socket.on('onMasterChoose', (choosedWord: string) => {
            setWord(choosedWord)
        })

        socket.on('onUserSendMessage', (messageText: string) => {
            setMessages((prevMessages) => [
                ...prevMessages,
                messageText
            ]);
        });
    }, [])

    useEffect(() => {
        socket.on('userGuessed', (guessedWord: string) => {
            if (guessedWord !== word) {
                setTries((prevTries) => {
                    if (!prevTries.includes(guessedWord)) {
                        return [...prevTries, guessedWord];
                    }
                    return prevTries;
                });
            }

            if (guessedWord === word) {
                setResult('guesser');
            }

            if (tries.length >= 5) {
                setResult('master');
            }
        });
    }, [word, tries]);

    const handleLeave = async () => {
        if (room) {
            await RoomServices.leaveRoom(user, room.id);
            navigate('/');
        }
    }

    return (
        <Box>
            { id
            ? (
                    <Container maxWidth={'lg'}>
                            <RoomInfo id={id} gameName={game}/>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <>
                                    <TriesPanel tries={tries} />
                                    {userRole === 'guesser' && !word ? (
                                        <Waiting />
                                    ) : userRole === 'master' ? (
                                        word ? (
                                            <Typography variant="h6">
                                                Guesser is guessing...
                                            </Typography>
                                        ) : (
                                            <MasterPanel role={userRole} />
                                        )
                                    ) : (
                                        <GuessInfo role={userRole} />
                                    )}
                                    <GuessChat messages={messages} />
                                </>
                            </Box>
                            <Button
                                onClick={handleLeave}
                                variant={"contained"}
                                color={"warning"}
                                sx={{ margin: "40px auto", }}>
                                Surrender
                            </Button>
                    </Container>
                )
            : <CircularProgress/>}

            {result && <WinnerModal result={result} player={userRole} handleClick={handleLeave}/>}
        </Box>
    );
};

export default GuessWord;
