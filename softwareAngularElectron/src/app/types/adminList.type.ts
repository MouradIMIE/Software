export type AdminList = {
    "error": string,
    "admins": Array<AdminElement>,
}

export type AdminElement = {
    "firstname": string,
    "lastname": string,
    "email": string,
    "createdBy": string,
}