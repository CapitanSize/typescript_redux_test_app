import React, {FC, useState} from 'react';
import {appApi} from "../services/appService";
import {IContact} from "../models/IContact";
import {Box, Button, Grid, Modal, TextField} from "@mui/material";

interface UpdateContactModalProps {
    open: boolean;
    close: (e: boolean) => void;
    contact: IContact;
}

const UpdateContactModal :FC<UpdateContactModalProps> = ({open, close, contact}) => {

    const [updateContact, {}] = appApi.useUpdateContactMutation()
    const [name, setName] = useState<string>(contact.name)
    const [secondName, setSecondName] = useState<string>(contact.secondName)
    const [email, setEmail] = useState<string>(contact.email)

    const handleCreate = async (e: React.MouseEvent) => {
        if (name && secondName && email) {
            await updateContact({...contact, name, secondName, email} as IContact)
            close(false)
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
                    <Button onClick={handleCreate} variant={'outlined'}>Изменить контакт</Button>
                </Grid>
            </Box>
        </Modal>
    );
};

export default UpdateContactModal;