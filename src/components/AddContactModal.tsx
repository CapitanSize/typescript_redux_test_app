import React, {FC, useState} from 'react';
import {Box, Button, Grid, Modal, TextField, Typography} from "@mui/material";
import {appApi} from "../services/appService";
import {IContact} from "../models/IContact";

interface addContactModalProps {
    open: boolean;
    close: (e: boolean) => void;
}



const AddContactModal :FC<addContactModalProps>= ({open,close}) => {

    const [createContact, {}] = appApi.useCreateContactMutation()
    const [name, setName] = useState<string>('')
    const [secondName, setSecondName] = useState<string>('')
    const [email, setEmail] = useState<string>('')

    const handleCreate = async (e: React.MouseEvent) => {
        if (name && secondName && email) {
            await createContact({name, secondName, email} as IContact)
            close(false)
            setName('')
            setEmail('')
            setSecondName('')
        } else {
            alert('Вы не можете оставить поля пустыми!')
        }
    }

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value)
    }

    const handleChangeSecondName = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSecondName(e.target.value)
    }

    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value)
    }

    return (
        <Modal
            open={open}
            onClose={() => close(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className={'modal'}>
                <Grid className={'grid'} style={{flexDirection: 'column'}}>
                <TextField onChange={handleChangeName} value={name} style={{marginBottom: '10px'}} placeholder={'Введите имя'}/>
                <TextField onChange={handleChangeSecondName} value={secondName} style={{marginBottom: '10px'}} placeholder={'Введите фамилию'}/>
                <TextField onChange={handleChangeEmail} value={email} style={{marginBottom: '10px'}} placeholder={'Введите email'}/>
                </Grid>
                <Grid className={'grid'}>
                    <Button onClick={handleCreate} variant={'outlined'}>Добавить контакт</Button>
                </Grid>
            </Box>
        </Modal>
    );
};

export default AddContactModal;