import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {Typography} from "@mui/material";

export default function Loading() {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: 4, flexDirection: "column", alignItems: "center" }}>
            <CircularProgress />
            <Typography sx={{marginTop: 3}}>Loading...</Typography>
        </Box>
    );
}