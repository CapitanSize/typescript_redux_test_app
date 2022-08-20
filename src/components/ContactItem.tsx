import React, {FC, useState} from 'react';
import {IContact} from "../models/IContact";
import {Button, Grid} from "@mui/material";
import UpdateContactModal from "./UpdateContactModal";
import {appApi} from "../services/appService";

interface ContactItemProps {
    contact: IContact;
}

const ContactItem :FC<ContactItemProps> = ({contact}) => {

    const [open, setOpen] = useState<boolean>(false)
    const [deleteContact, {}] = appApi.useDeleteContactMutation()

    const handleClick = (e: React.MouseEvent) => {
        setOpen(true)
    }

    const deleteHandler = (e: React.MouseEvent) => {
        e.stopPropagation()
        deleteContact(contact)
    }

    return (
        <>
            <Grid className={'contact'} onClick={handleClick}>
                {contact.id}. {contact.name} {contact.secondName}, email: {contact.email}
                <Button onClick={deleteHandler} color={'error'} variant={'outlined'}>Удалить</Button>
            </Grid>
            <UpdateContactModal contact={contact} open={open} close={setOpen}/>
        </>
    );
};

export default ContactItem;