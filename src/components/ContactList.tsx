import React, {FC, useState} from 'react';
import {appApi} from "../services/appService";
import ContactItem from "./ContactItem";
import {Grid} from "@mui/material";

interface ContactLIstProps {
    search: string;
}


const ContactList :FC<ContactLIstProps> = ({search}) => {
    const {data: searchedContacts , error, isLoading} = appApi.useSearchContactQuery(search)

    if (isLoading) {
        return <h1>Идёт загрузка...</h1>
    }
    if (error) {
        return <h1>Произошла ошибка при загрузке контактов!</h1>
    }

    return (
        <Grid className={'contact__list'}>
            {searchedContacts && searchedContacts.map((contact) =>
                <ContactItem contact={contact} key={contact.id}/>
            )}
        </Grid>
    );
};

export default ContactList;