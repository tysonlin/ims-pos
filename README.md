# Inventory Management System POS
RESTful API app for inventory management system POS used by multi-outlets restaurant chain

# Data Relationships

`Product`: consists of `name` and `price`, belongs to one `Category`, and has many `Ingredients`

`Ingredient`: consists of `name`, `unitPrice`, `stock`, and can be a part of many `Products`

`Category`: only has `name`

`User`: contain a unique `username`, `password`, `name`, and `email`

# List of user endpoints

**`/user/register `**

* [`POST`] register a new user account for api access authentication

   *Json parameters*[required]: 
   `username:string` (allow A-Z, a-z, 0-9, more than 4 characters)

   `password:string` (allow A-Z, a-z, 0-9, special chars in [#$@!%&*?], 4-30 characters)

   `name:string` (allow A-Z, a-z, spaces, special chars in ['.-], more than 2 characters)

   `email:string`

   *Return*: Json response on success (201) with new user data, or bad input and other errors (400)

  ​

**`/user/auth `**

* [`POST`] authenticate the registered user's credentials to retrieve the authentication token

   *Json parameters*[required]: `username:string` `password:string`

   *Return*: Json response on success (200) with user data and authentication `token`, or HttpUnauthorizedError (401) for invalid credentials

  ​

   Return example:

 ```json
 {
    "success": true,
    "message": "Login user user1 successful",
    "token": "JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6InVzZXIxIiwicGFzc3dvcmQiOiIkMmEkMTAkNEtHLkdQRDAuSFFPd0EzeVlFVXQzT2Y0ZkNxeXE2NEpORFF0dkRSVUhrYVdPbVh1ZnQ0aHEiLCJuYW1lIjoiVXNlciBPbmUiLCJlbWFpbCI6InVzZXJAbGluZmluaS50ZSIsImNyZWF0ZWRBdCI6IjIwMTctMTAtMjlUMTg6MTY6NTQuMDEwWiIsInVwZGF0ZWRBdCI6IjIwMTctMTAtMjlUMTg6MTY6NTQuMDEwWiJ9LCJpYXQiOjE1MDkzMTE2MTgsImV4cCI6MTUwOTkxNjQxOH0.Vc0nDjY81sshXdKTTiY1xK_i1iVuVYVsW1-qwv8AuBo",
    "data": {
        "id": 1,
        "username": "user1",
        "name": "User One",
        "email": "user@linfini.te",
        "createdAt": "2017-10-29T18:16:54.010Z",
        "updatedAt": "2017-10-29T18:16:54.010Z"
    }
}
 ```



# Authentication

After authenticating with `/user/auth `, include the `token` value at the header of every requests to the /api routes.

Example:

```bash
curl -G <--hostname-->/api/category --header "Authentication:<--Your token here-->"
```



# List of API endpoints

*All of the following routes are secured. Authentication token is required to use, otherwise HttpUnathorized (401) will be returned*

**`/api/category`**

* [`GET`] get all categories

  *Parameters*: None

  *Return*: Json response on success (200) 

  ​

* [`POST`] add one category

  *Json parameter*[required]:  `name:string`

  *Return*: Json response on success (201) with category data, or error (400)

  ​


**`/api/category/:_id`**
* [`GET`] get a single category

  *Url parameter*: `_id:integer`

  *Return*: Json response on success (200) with category data, or HttpNotFound(404)

  ​

* [`PUT`] update a single category

  *Url parameter*: `_id:integer`

  *Json parameter*[required]:  `name:string`

  *Return*: Json response on success (200) with category data, or HttpNotFound (404)

  ​

* [`DELETE`] delete a single category

  *Url parameter*: `_id:integer`

  *Return*: Response code (204) on success with empty body, or HttpNotFound (404)

  *Note*: Delete may not be possible if the category is associated to a product

  ​

**`/api/ingredient`** 

* [`GET`] get all ingredients

  ​    *Parameters*: None

  ​    *Return*: Json response on success (200) 



* [`POST`] add one ingredients

  ​    *Json parameters*[required]: `name:string` `unitPrice:float`  `stock:float`

  ​    *Return*: Json response on success (201) with ingredient data, or error (400)

  ​


**`/api/ingredient/:_id`**
* [`GET`] get a single ingredient

  ​    *Url parameter*:  `_id:integer`

  ​    *Return*: Json response on success (200) with ingredient data, or HttpNotFound(404)

  ​

* [`PUT`] update a single ingredient

    *Url parameter*r:  `_id:integer`

    *Json parameters*[required]: `name:string` `unitPrice:float` `stock:float`

    *Return*: Json response on success (200) with ingredient data, or HttpNotFound(404)

    ​

* [`DELETE`] delete an ingredient

    *Url parameter*:  `_id:integer`

    *Return*: Response code (204) on success with empty body, or HttpNotFound (404)

    *Note*: Delete may not be possible if the ingredient is associated to a product

    ​


**`/api/product`**

* [`GET`] get the list of all products

  ​    *Parameters*: None

  ​    *Return*: Json response on success (200) 

  ​

* [`POST`] add one new product

  *Json parameter*[required]:  `name:string` `price:float` `Category_id:Category` 

  *Return*: Json response on success (201) with new product data, or error (400)

  *Note*: Category_id must have already been created

  ​

**`/api/product/:_id`**

* [`GET`] get one product

  *Url parameter*: `_id:integer`

  *Return*: Json response on success (200) with product data, or HttpNotFound(404)

  ​

* [`PUT`] update a single product

  *Url parameter*:  `_id:integer`

  *Json parameter*[required]: `name:string` `price:float` `Category_id:Category` **

  *Return*: Json response on success (200) with new product data, or error (400)

  *Node*: Category_id must have already been created

  ​

 * [`DELETE`] delete one product

    *Url parameter*: `_id:integer`


    *Return*: Response code (204) on success with empty body, or HttpNotFound (404)

    *Note*: Delete may not be possible if the product is associated to a ingredient

   ​

**`/api/product/:_id/ingredient/:Ing_id`** 
* [`PUT`] create association between product and ingredient

  ​    *Url parameter*:  `_id:integer` `Ing_id:integer`

  ​    *Return*: Json response on success (200) with new association data, or HttpNotFound (400) if one of the object cannot be found

  ​

* [`DELETE`] delete association between product and ingredient

    *Url parameter*:  `_id:integer` `Ing_id:integer`

    *Return*: Response code (204) on success with empty body, or HttpNotFound (404)

    ​

# How to Install

After installing `npm` and `git` in your machine, clone the repository and do `npm install` as follow:

```bash
git clone https://github.com/tysonlin/ims-pos.git
cd ims-pos
npm install
```



Load your database connection string into the environment variable, and do `sequelize db:migrate` to initialize the database tables:

```bash
DATABASE_URL=your_database_url
"./node_modules/.bin/sequelize" db:migrate --env production
```



The app loads the environment variable by reading `.env` file in the root directory of the project. Create `.env` file with environment variable in line with following:

```bash
touch .env
```

```
# .env file
NODE_ENV=production
LOG_LEVEL=verbose
LOG_DIR=./log
PORT=80
DATABASE_URL=your_database_url
```

`NODE_ENV` (required, prefer `production`) indicates the environment context which the app would execute on

`DATABASE_URL` (required) is your database connection string

`LOG_LEVEL` filters the log level the app would put in the log file and console. The level follows that of the `npm` log level: `[silly|debug|verbose|info|warn|error]`

`LOG_DIR` is the location the log files would be created at, defaults at `./log`

`PORT` is the port number that the app would run on, defaults at `8000`



After `.env` file is setup, start app by using:

```
npm start
```





# Improvement Ideas

* Several value-added functions that has real business use cases, such as:
  * **`/api/product/margin/`** which would calculate the basic profit margin of each product (product price minus sum of all ingredients' price)
  * **`/api/product/stock/`** which would calculate how many more servings of each product the restaurant has left, based on the amount of the product's ingredient
* Organize `Product`/`Ingredient` json output to not include the join table (`Product_Ingredient`)
* Get unit test (mocha, chai-http) working