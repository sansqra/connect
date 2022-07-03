
## Auth APIs

> #### Routes: /brand_login & /creator_login
1. Input Type
```
{
    email       : "email".
    password    : "password"
}
```
2. Return Type
 - on success
```
{
  "status": 200,
  "token_id": int,
  "token_value": "",
  "user_type": "br" | "cr",
  "id_brand": 1 | null,
  "id_creator": 1 | null
}
```
 - on failure
```
{
  "status": 400,
  "message": "brand account does not exist"
}
```
---

## Brand APIs
