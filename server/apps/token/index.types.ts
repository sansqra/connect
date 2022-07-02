export interface Token_Result_Message {
    status          : string,
    token_value?    : string,
    user_id?        : number,
    user_type?      : string
}

export const not_null = "not_null";