import { ChangeEvent, FC, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material';
import {useAppDispatch} from "../redux/hooks";
import {getAuth} from "../redux/slices/userSlice";

const RegModal: FC = () => {
    const dispatch = useAppDispatch()
    const [nickname, setNickname] = useState<string>('');
    const [open, setOpen] = useState<boolean>(true);

    const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNickname(event.target.value);
    };

    const handleSave = () => {
        localStorage.setItem('nickname', nickname)
        dispatch(getAuth(nickname))
        setNickname('');
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Enter Your Nickname</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{mb:'20px'}}>Please enter your nickname:</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nickname"
                    fullWidth
                    value={nickname}
                    onChange={handleNicknameChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave} color="primary" variant="contained" disabled={!nickname}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default RegModal;
