
[![Build Status](https://travis-ci.org/LandOfKroilon/KroilonApiV2.svg?branch=dev)](https://travis-ci.org/LandOfKroilon/KroilonApiV2)

An hypermedia API that supports [Collection+JSON](https://github.com/collection-json/spec) and [Siren](https://github.com/kevinswiber/siren) as media types.


## Main Libraries

- [Express](http://expressjs.com/) - web framework
- [InversifyJS](https://github.com/inversify/InversifyJS) - TypeScript DI/IoC framework
- [Iridium](https://github.com/SierraSoftworks/Iridium) - TypeScript Mongo ODM
- [winston](https://github.com/winstonjs/winston) - logging framework


## Architecture

* controller -> service -> repository

The repository layer produces and accepts DTOs, the service and controller layers produce and accept models.

## Build and run the project

`npm run build && npm start`

Navigate to `_http://localhost:3000_`

## Run tests

`npm run build && npm run test`


### Current active academy resource representation

```json
{
    "links": [
        {
            "rel": [
                "self"
            ],
            "href": "http://localhost:3000/academy"
        }
    ],
    "class": [
        "Academy"
    ],
    "properties": {
        "name": "Academia de Julho",
        "trainees": [
            {
                "id": 22389,
                "name": "Pedro Almeida",
                "avatar": "/photos/avatar",
                "email": "pedro@mail.me",
                "hash": "jir8u47ruf8430l",
                "profile": "unknown",
                "businessUnit": "unknown",
                "skill": {},
                "createdOn": 1527845472900
            }
        ],
        "masters": [],
        "createdOn": 1527845472900
    }
}
```

### Collection of Admins resource representation

```json
{
    "collection": {
        "items": [
            {
                "data": [
                    {
                        "name": "id",
                        "value": "90205",
                        "prompt": "Admin's id"
                    },
                    {
                        "name": "name",
                        "value": "Ms. Donna White",
                        "prompt": "Admin's name"
                    },
                    {
                        "name": "avatar",
                        "value": "https://s3.amazonaws.com/uifaces/faces/twitter/cdavis565/128.jpg",
                        "prompt": "Admin's avatar uri"
                    },
                    {
                        "name": "email",
                        "value": "Drake.Ferry49@hotmail.com",
                        "prompt": "Admin's email"
                    },
                    {
                        "name": "createdOn",
                        "value": "2018-5-4",
                        "prompt": "When the admin was created"
                    }
                ],
                "href": "http://localhost:3000/academy/admin/90205"
            }
        ],
        "links": [
            {
                "rel": "self",
                "href": "http://localhost:3000/academy/admin"
            }
        ],
        "version": "1.0",
        "href": "http://localhost:3000/academy/admin",
        "template": {
            "data": [
                { "name": "id", "prompt": "Id" },
                { "name": "name", "prompt": "Name" },
                { "name": "avatar", "prompt": "Avatar" },
                { "name": "email", "prompt": "Email" },
                { "name": "password", "prompt": "Password" }
            ]
        }
    }
}
```

### Admin resource representation

```json
{
    "links": [
        {
            "rel": ["self"],
            "href": "http://localhost:3000/academy/admin/13471"
        },
        {
            "rel": ["collection"],
            "href": "http://localhost:3000/academy/admin"
        }
    ],
    "class": ["Admin"],
    "properties": {
        "_id": "5aecb837927e75500cc95619",
        "id": 13471,
        "name": "Herminio Kunze",
        "email": "Asha87@hotmail.com",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/sur4dye/128.jpg",
        "password": "hash",
        "createdOn": "2018-05-04T19:44:55.234Z"
    }
}
```

### Error representation with _application/problem+json_

```json
{
    "status": 404,
    "type": "about:blank",
    "title": "/probs/resource-not-found",
    "detail": "Resource not found",
    "instance": "Resource with id Pedro could not be found"
}
```