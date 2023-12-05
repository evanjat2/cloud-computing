# Auth API Documentation

## Endpoint

### Option 1: Using IP Address

- **URL:** `http://34.138.0.114:8080/auth/signUp`
- **Method:** POST

### Option 2: Using Custom Domain

- **URL:** `https://ecoscan-api.vercel.app/auth/signUp`
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

### Option 1: Using IP Address

- **URL:** `http://34.138.0.114:8080/auth/login`
- **Method:** POST

### Option 2: Using Custom Domain

- **URL:** `https://ecoscan-api.vercel.app/auth/login`
- **Method:** POST

This endpoint is used to authenticate and login a user. The request body should include the necessary login credentials. Upon successful execution, the response will include the user's details and a token.

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
