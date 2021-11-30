import {Button} from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import {useAuth} from '../lib/auth.ctx';
import {TraktService} from '../services/trakt.service';
import {logoutIcon, searchIcon} from "./icons";

export default function ButtonAppBar(props: any) {
    const traktService = React.useMemo<TraktService>(() => new TraktService(axios), [axios]);
    const {auth, userLoggedOut} = useAuth();

    const logoutBtn = <Button sx={{marginLeft: 1}} variant="contained" onClick={userLoggedOut}
                                    endIcon={logoutIcon}> </Button>
    const loginBtn = <Button sx={{marginLeft: 1}} variant="contained" href={traktService.genOauthLink()}>Login with
        Trakt</Button>;
    const dashBoardBtn = <Button sx={{marginLeft: 1}} variant="contained" href="/">Dashboard</Button>;


    return (
        <Box sx={{flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                        {props.title || 'Dashboard'}
                    </Typography>
                    <Button sx={{marginLeft: 1}} variant="contained" href="/search" endIcon={searchIcon}>Search a
                        film</Button>
                    {auth && dashBoardBtn}
                    {!auth ? loginBtn : logoutBtn}
                </Toolbar>
            </AppBar>
        </Box>
    );
}