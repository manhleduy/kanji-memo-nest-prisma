This is a small project to allow the user searching and save the memorized kanji character and word the documentation about the data used in this project is on https://kanjiapi.dev/

- frontend: Reactjs, tailwind, axios
- backend: Prisma, nestjs, swagger
- database: postgresql
- docker: compose all the frontend, backend and database application

* env  file
- define the global environment variabl

* frontend
    - with axios use the Expose url of the backend server
    - the port of the frontend on the docker compose is 5173
*** You can change the expose port of the frontend by changing the  FRONTEND_PORT

* backend
    - nestjs: javascript backend framework
        + the url of the nestjs in the docker compose will be set default to 8080
        + you con change the expose url of the backend by changing the BACKEND_PORT
        
    - prisma: ORM handle
        + "npx prisma init" :used to init the prisma.schema file
        + "npx prisma generate": whenever you update the structure of the database via the prisma.schema file use this firstly
        + "npx prisma migrate" : when you want to migrate your changing on the database use this command ( you can add the -name ... to note note this changing)

        +prisma.config.ts: use this with the expose port of the backend to allow the user run the npx migrate

        +prisma.service.ts: use this to connect the backend with the database
    - swagger: for testing the backend routes
    
* docker compose after you successfully define the required value on the env file run "docker compose -p kanji-memo up -d --build"   
