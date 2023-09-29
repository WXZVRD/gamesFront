import { Box } from "@mui/material";
import { FC } from "react";
import Cell from "./Cell";

interface IBoard {
    squares: Array<string | null>;
    handlerClick: (index: number) => void;
}

const Board: FC<IBoard> = ({ squares, handlerClick }) => {
    return (
        <Box sx={{maxWidth:'300px'}}>
            {squares.map((square, index) => (
                <Cell key={index} value={square} handler={() => handlerClick(index)} />
            ))}
        </Box>
    );
};

export default Board;
