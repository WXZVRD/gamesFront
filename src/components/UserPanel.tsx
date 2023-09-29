import {Paper, Typography} from "@mui/material";
import {FC} from "react";

interface IUserPanel {
    nickname: string,
}

const UserPanel: FC<IUserPanel> = ({ nickname = 'unknown' }) => {
    return(
        <Typography>{ nickname }</Typography>
    )
}

export default UserPanel