import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {IUser} from "../models/IUser";
import {IContact} from "../models/IContact";


export const appApi = createApi({
    reducerPath: 'appApi',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Contact'],
    endpoints: (build) => ({
        getAllUsers: build.query<IUser[], null>({
            query: () => ({
                url: `/users`
            })
        }),
        createContact: build.mutation<IContact, IContact>({
            query: (contact) => ({
                url: `/contacts`,
                method: 'POST',
                body: contact
            }),
            invalidatesTags: ['Contact']
        }),
        updateContact: build.mutation<IContact, IContact>({
            query: (contact) => ({
                url: `/contacts/${contact.id}`,
                method: 'PUT',
                body: contact
            }),
            invalidatesTags: ['Contact']
        }),
        deleteContact: build.mutation<IContact, IContact>({
            query: (contact) => ({
                url: `/contacts/${contact.id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Contact']
        }),
        searchContact: build.query<IContact[], string>({
            query: (search: string) => ({
                url: `/contacts/?q=${search}`
            }),
            providesTags: result => ['Contact']
        }),

    })
})