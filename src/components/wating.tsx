import {CircularProgress, Typography, Paper} from "@mui/material";


const Waiting = () => {
    return(
        <Paper
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                maxWidth:'400px',
                width:'100%',
                height: '300px',
            }}
        >
            <Typography variant="h6">
                Master is choosing a word...
            </Typography>
            <CircularProgress sx={{ mt: 2 }} />
        </Paper>
    )
}

export default Waiting