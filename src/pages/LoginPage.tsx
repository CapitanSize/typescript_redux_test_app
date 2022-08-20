import React, {useState} from 'react';
import {Alert, Box, Button, Container, Grid, Paper, TextField, Typography} from "@mui/material";
import {appApi} from "../services/appService";
import {IUser} from "../models/IUser";
import {useNavigate} from "react-router-dom";
import {PROFILE_ROUTE} from "../routes/consts";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {authSlice} from "../store/reducers/authSlice";

const LoginPage = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()
    const {setAuth} = authSlice.actions
    const dispatch = useAppDispatch()
    const {data: users} = appApi.useGetAllUsersQuery(null)
    const {auth} = useAppSelector(state => state.authReducer)

    const emailAddHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    const passwordAddHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const clickHandler = (e: React.MouseEvent) => {
        const candidate = {
            email: email,
            password: password,
        } as IUser
        const user = users && users.find((item) => item.email === candidate.email) as IUser
        if (user && user.password === candidate.password) {
            navigate(PROFILE_ROUTE)
            dispatch(setAuth())
        } else {
            alert('Неверно введен email или пароль!')
        }
        setEmail('')
        setPassword('')
    }


    return (
            <Box className={'parent'}>
                <Paper style={{borderRadius: '20px'}} elevation={24} >
                <Container className={'block'} style={{width: '500px', display: 'flex'}}>
                    <Grid className={'grid'} style={{flexDirection: 'column'}}>
                        <Typography variant="h4" color={'#1976d2'} style={{marginBottom: '70px'}}>
                            Войти в список контактов
                        </Typography>
                        <Grid className={'grid'} style={{flexDirection: 'column'}}>
                            <Typography style={{marginBottom: '10px'}} variant="h5" color={'#1976d2'}>
                                Введите email...
                            </Typography>
                            <TextField onChange={emailAddHandler} value={email} style={{marginBottom: '30px'}} label="Email" variant="outlined" type={'email'} />
                            <Typography style={{marginBottom: '10px'}} variant="h5" color={'#1976d2'}>
                                Введите пароль...
                            </Typography>
                            <TextField onChange={passwordAddHandler} value={password} label="Password" variant="outlined" type={'password'} />
                        </Grid>
                        <Grid>
                            <Button onClick={clickHandler} style={{marginTop: '30px'}} variant={'outlined'}>Войти</Button>
                        </Grid>
                    </Grid>
                </Container>
                </Paper>
            </Box>
    );
};

export default LoginPage;