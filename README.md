# Auth API Documentation

## Endpoint

- **URL:** `http://localhost:8080/auth/signUp`
- **Method:** POST

This endpoint is used to sign up a user. When making a POST request to this endpoint, the request body should include the username, first name, last name, and password. Upon successful execution, the response will include the user's details (username, first name, last name) and a token.

## Example Request

```json
{
    "username": "example_username",
    "firstName": "John",
    "lastName": "Doe",
    "password": "example_password"
}
```

## Example Response
```json 
{
    "user": {
        "username": "example_username",
        "firstName": "John",
        "lastName": "Doe"
    },
    "token": "example_token"
}
```
## Endpoint

- **URL:** `http://34.138.0.114:8080/auth/login`
- **Method:** POST

This endpoint is used to authenticate and login a user.

## Example Request

```json
{
    "username": "example_username",
    "password": "example_password"
}
```

## Example Response
```json 
{
    "user": {
        "username": "example_username",
        "firstName": "John",
        "lastName": "Doe"
    },
    "token": "example_token"
}
```
