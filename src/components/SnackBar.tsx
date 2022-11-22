import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useDispatch, useSelector} from "react-redux";
import {AppRootReducer} from "../state/store";
import {SetAppError} from "../state/app-reducer";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ErrorSnackBar() {
   const error=useSelector<AppRootReducer,string|null>(state => state.app.error)
const dispatch=useDispatch()
    const isOpen=error!==null

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

    dispatch(SetAppError({error:null}))
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>

            <Snackbar open={isOpen} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>

        </Stack>
    );
}