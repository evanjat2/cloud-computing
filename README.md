# Auth API Documentation

## Endpoint Sign Up

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
## Endpoint Login

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
## Endpoint Get All Article

### Option 1: Using IP Address

- **URL:** `http://34.138.0.114:8080/article`
- **Method:** GET

### Option 2: Using Custom Domain

- **URL:** `https://ecoscan-api.vercel.app/article`
- **Method:** GET

This endpoint is used to retrieve all articles stored in the database. There is no request; only a response.

## Example Response
```json 
[
    {
        "author": "John Doe",
        "text": "Food emission is dangerous",
        "title": "Food Emissions",
        "author-year": "2022",
        "desc": "This is an article about food emissions"
    }
]
```
## Endpoint Get Specific Article (BELUM DITEST)

### Option 1: Using IP Address

- **URL:** `http://34.138.0.114:8080/article/detail`
- **Method:** GET

### Option 2: Using Custom Domain

- **URL:** `https://ecoscan-api.vercel.app/article/detail`
- **Method:** GET

This endpoint is used to retrieve specific articles stored in the database. The request body should include title. Upon successful execution, the response will include the user's details and a token.

## Example Request

```json
{
    "title": "Food Emissions"
}
```

## Example Response
```json 
[
    {
        "id": "Food Emissions",
        "data": {
            "author": "John Doe",
            "text": "Food emission is dangerous",
            "title": "Food Emissions",
            "author-year": "2022",
            "desc": "This is an article about food emissions"
        }
    }
]
```
