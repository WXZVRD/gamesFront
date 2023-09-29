import { Stack, Typography } from "@mui/material";
import { FC } from "react";

interface IRoomInfoProps {
    id: string;
    gameName?: string;
}

const RoomInfo: FC<IRoomInfoProps> = ({ id, gameName }) => {
    return (
        <Stack direction={'column'} mt={"40px"} mb={"40px"}>
            <Typography variant="h5" align="center">
                <b>Game ID:</b> {id}
            </Typography>
            { gameName && (
                <Typography variant="h6" align="center">
                    <b>Game Name:</b> {gameName}
                </Typography>
            )}
        </Stack>
    );
};

export default RoomInfo;
