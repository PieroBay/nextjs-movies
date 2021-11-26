import { Button } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import * as React from 'react';
import { useAuth } from '../lib/auth.ctx';
import { TraktService } from '../services/trakt.service';

export default function ButtonAppBar(props: any) {
  const traktService = React.useMemo<TraktService>(() => new TraktService(axios), [axios]);
  const {auth, userLoggedOut} = useAuth();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          { props.title || 'Dashboard' }
          </Typography>
          {auth 
            ? <Button variant="contained" href="/search">Recherche</Button> 
            : ''}
          {!auth
              ? <Button variant="contained" href={traktService.genOauthLink()}>Login with Trakt</Button>
              : <Button variant="contained" onClick={userLoggedOut}>Loggout</Button>
          }
        </Toolbar>
      </AppBar>
    </Box>
  );
}