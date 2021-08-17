export type CustomersDataList = {
    "error": string,
    "customers": Array<CustomerDataElement>
}

export type CustomerDataElement = {
    "dateOfBirth": string,
    "idSubscriptionStripe": string,
}