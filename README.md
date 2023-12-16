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
        "title": "First Article",
        "author-year": "2022",
        "imgUrl": "https://storage.googleapis.com/ml-ouput-eco-scan-bucket/maxresdefault.jpg",
        "desc": [
            "Paragraph 1",
            "Paragraph 2"
        ],
        "articleUrl": "https://www.nature.com/articles/s43016-021-00225-9",
        "id": "123",
    },
    {
        "author": "John Doe",
        "title": "Second Article",
        "author-year": "2022",
        "imgUrl": "https://storage.googleapis.com/ml-ouput-eco-scan-bucket/maxresdefault.jpg",
        "desc": [
            "Paragraph 1",
            "Paragraph 2"
        ],
        "articleUrl": "https://www.nature.com/articles/s43016-021-00225-9",
        "id": "123",
    },
]
```
## Endpoint Get Specific Article

### Option 1: Using IP Address

- **URL:** `http://34.138.0.114:8080/article/:id`
- **Method:** GET

### Option 2: Using Custom Domain

- **URL:** `https://ecoscan-api.vercel.app/article/:id`
- **Method:** GET

This endpoint is used to retrieve specific articles stored in the database. The request should include a route parameter named :id to specify the unique identifier of the article being requested. Upon successful execution, the response will include the article's details.

## Example Response
```json 
{
    "author": "John Doe",
    "title": "First Article",
    "author-year": "2022",
    "imgUrl": "https://storage.googleapis.com/ml-ouput-eco-scan-bucket/maxresdefault.jpg",
    "desc": [
        "Paragraph 1",
        "Paragraph 2"
    ],
    "articleUrl": "https://www.nature.com/articles/s43016-021-00225-9",
    "id": "123",
}
```
## Endpoint Post Image To Model

### Using Cloud Run

- **URL:** `https://predict-pbjv724rza-et.a.run.app/predict/`
- **Method:** POST

This endpoint is used to send food images to the model. The request should include an image file with the specified conditions below. Upon successful execution, the response will include the food details.

## Example Request

```json
{
    "image": image file
}
```

## Example Response
```json 
{
    "calcium": "28.26 mg",
    "carbohydrates": "75.56 g",
    "emission": "2.39 kg CO2",
    "fat": "1.69 g",
    "food-name": "Bread",
    "protein": "8.57 g",
    "vitamins": "B1, B2"
}
```

