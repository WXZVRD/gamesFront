import { FC } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
    Typography,
} from "@mui/material";

interface IWinnerModal {
    result: string;
    player: string;
    handleClick: () => void
}

const WinnerModal: FC<IWinnerModal> = ({result, player, handleClick}) => {
    return (
        <Dialog open={true}>
            <DialogTitle>{ result === player ? 'You win!' : "You Lose..." }</DialogTitle>
            <DialogContent sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center"}}>
                <Typography variant="h5" style={{
                    fontSize: "24px",
                    fontWeight: "bold",
                    color: "#4CAF50",
                    marginBottom: "16px"}}>
                    The {result} player Won!
                </Typography>
                <Button
                    color="primary"
                    variant="contained"
                    sx={{mt:'16px'}}
                    onClick={handleClick}
                >
                    Main Menu
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default WinnerModal;
