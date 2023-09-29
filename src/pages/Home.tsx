import { Box } from '@mui/material';
import RoomsTable from '../layouts/RoomsTable';
import SideBar from '../layouts/SideBar';

const Home = () => {

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', height: '100%' }}>
            <RoomsTable />
            <SideBar />
        </Box>
    );
};

export default Home;
