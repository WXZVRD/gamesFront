import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import WaitingRoom from "./pages/WaitingRoom";
import { CssBaseline } from "@mui/material";

import {useEffect, useState} from "react";
import {getAuth} from "./redux/slices/userSlice";
import {useAppDispatch} from "./redux/hooks";
import RegModal from "./components/RegModal";
import TicTacToe from "./pages/TicTacToe";
import GuessWord from "./pages/GuessWord";

function App() {
    const [showModal, setShowModal] = useState(false);
    const dispatch = useAppDispatch()

    useEffect(() => {
        const nickname = localStorage.getItem('nickname')
        if (!nickname) {
            setShowModal(true);
        } else {
            dispatch(getAuth(nickname))
        }
    }, []);

    return (
        <div className="App">
            <CssBaseline />
                <BrowserRouter>
                    <Routes>
                        <Route path={'/'} element={<Home />} />
                        <Route path={'/waiting/:id'} element={<WaitingRoom />} />
                        <Route path={'/TicTacToe/:id'} element={<TicTacToe />} />
                        <Route path={'/GuessWord/:id'} element={<GuessWord />} />
                    </Routes>
                </BrowserRouter>
                {showModal && <RegModal />}
        </div>
    );
}

export default App;
