import React, {FC, useState} from 'react';
import ContactList from "../components/ContactList";
import {Button, Grid, TextField} from "@mui/material";
import AddContactModal from "../components/AddContactModal";
import {appApi} from "../services/appService";

const ProfilePage :FC= () => {

    const [open, setOpen] = useState<boolean>(false)
    const [search, setSearch] = useState<string>('')

    const clickHandler = (e: React.MouseEvent) => {
      setOpen(true)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
    }

    return (



        <Grid className={'profilePage'}>
            <Grid style={{marginTop: '30px', flexDirection: 'column', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <TextField value={search} onChange={handleChange} style={{marginBottom: '15px'}} placeholder={'Поиск'}/>
                <Button className={'profileButton'} variant={'outlined'} onClick={clickHandler}>Добавить контакт</Button>
                <AddContactModal open={open} close={setOpen}/>
            </Grid>
            <ContactList search={search} />
        </Grid>
    );
};

export default ProfilePage;