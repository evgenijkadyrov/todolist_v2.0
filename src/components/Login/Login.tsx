import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {FormikHelpers, useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "./login-reducer";
import {AppDispatch, AppRootReducer, useAppDispatch} from "../../state/store";
import {Navigate} from "react-router-dom";

import {loginSelectors} from "../Login";

type FormValuesType = {
    email: string
    password: string
    rememberMe: boolean
}
export const Login = () => {

    const isLoginOn = useSelector(loginSelectors.selectIsLoginOn)

    const dispatch = useAppDispatch()

    const formik = useFormik({
        validate: (values) => {

            if (!values.email) {
                return {email: 'Email required'}
            }
            if (!values.password) {
                return {password: 'Password required'}
            }
        },
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        onSubmit: async (values: FormValuesType, formikHelpers: FormikHelpers<FormValuesType>) => {

            const action = await dispatch(loginTC(values));
            if (loginTC.rejected.match(action)) {

                if (action.payload?.fieldsErrors?.length) {
                    const error = action.payload?.fieldsErrors[0]
                    formikHelpers.setFieldError(error.field, error.error);
                }
            }

        }
    })
    if (isLoginOn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}> here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>
                    <FormGroup>
                        <TextField label="Email" margin="normal"
                                   {...formik.getFieldProps('email')}
                            // name={'email'} onChange={formik.handleChange}
                            // value={formik.values.email}
                        />
                        {formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        <TextField type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                            // name={'password'} onChange={formik.handleChange}
                            // value={formik.values.password}
                        />
                        {formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        <FormControlLabel label={'Remember me'} control={<Checkbox onChange={formik.handleChange}
                                                                                   checked={formik.values.rememberMe}
                                                                                   name={'rememberMe'}/>}/>
                        <Button type={'submit'} variant={'contained'} color={'primary'}>
                            Login
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </Grid>
    </Grid>
}
