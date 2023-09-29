import {Alert, Paper, Stack, Typography} from "@mui/material";
import {FC} from "react";

interface ITriesPanel {
    tries: string[]
}

const TriesPanel: FC<ITriesPanel> = ({ tries }) => {

    return(
        <Paper sx={{p:"20px", maxWidth:'300px', width:'100%'}}>
            <Stack>
                <Typography sx={{ fontSize: 18, fontWeight: "bold", marginBottom: 1 }}>
                    All tries
                </Typography>
                {tries.map((attempt, index) => (
                    <Alert sx={{mb:"10px"}} key={index} severity="error">
                        {attempt}
                    </Alert>
                ))}
            </Stack>
        </Paper>
    )
}

export default TriesPanel