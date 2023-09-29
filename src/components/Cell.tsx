import { Button } from "@mui/material";
import { FC } from "react";

interface ICell {
    value: string | null;
    handler: () => void;
}

const Cell: FC<ICell> = ({ value, handler }) => {
    return (
        <Button
            variant={"outlined"}
            sx={{height:'100px', width:'100px'}}
            onClick={handler}>
            {value || ""}
        </Button>
    );
};

export default Cell;
