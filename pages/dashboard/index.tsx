import type {NextPage} from 'next'
import {Typography} from "@mui/material";
import {useAuth} from "../../lib/auth.ctx";

const Dashboard: NextPage = () => {
    const {auth} = useAuth();

    return <div>
        <Typography variant="h1">Dashboard work!</Typography>
        {auth ? <p>logged !</p> : <p>unlogged !</p>}
    </div>
}

export default Dashboard
