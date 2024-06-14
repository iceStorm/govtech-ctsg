# Govtech Ctsg

## Steps to run the project on your machine:
1. Clone the project:  
   `git clone https://github.com/icestorm/govtech-ctsg`

2. Open project in VS Code:  
   `code govtech-ctsg`

3. Ensure you have <ins>docker compose</ins> installed on your machine. Then execute the following command in your terminal to start all the services at once:  
   `docker compose up`

   **Notes**: Sometimes the docker compose execution fails due to yarn package installation failures. Kindly try again several times.

   Successful docker compose execution should starts the below 5 applications:
   ![docker-desktop](<screenshots/docker-desktop.png>)

4. Access the front-end website at:  
   `http://localhost:7502`

5. Start testing through the flows.

## Application/Services running addresses:
- `PostgreSQL server`: http://localhost:5432
- `Pgadmin4 (PostgreSQL data explorer)`: http://localhost:5433
- `govaa-be`: http://localhost:7500
- `surveysg-be`: http://localhost:7501
- `surveysg-fe`: http://localhost:7502

## Test data:
There are 2 mock GOVAA accounts to use:
```TypeScript
   {
      name: 'Anh Tuan',
      email: 'tuanna@ncs-sdc.com',
      password: '12345',
   },
   {
      name: 'Anh Tuan 2',
      email: 'tuanna@ncs.com',
      password: '12345',
   },
```

## Project structure
This project uses the Nx Monorepo framework to construct the structure more effectively. Learn more: <ins>https://nx.dev</ins>
```bash
├── .docker # contains persisted volume data for PostgreSQL and pgadmin4
│
├── .vscode # vscode config files
│
├── packages
│   ├── be-common # library for back-end shared features
│   ├── common # common models, utils... can be used for both back-end and front-end
│   ├── govaa-be # GOVAA back-end mock application (NestJS)
│   ├── surveysg-be # main back-end application (NestJS)
│   └── surveysg-fe # main front-end application (ReactJS)
│
├── docker-compose.yml # docker compose file to compose all services
├── docker-compose-base.yml # docker compose base file for applications (back-end, front-end)
├── dockerfile # docker file for applications (back-end, front-end)
│
├── .env # Application environment variables
│
├── .eslintrc.js # ESlint configuration file for coding convention check
├── .prettierrc # Prettier configuration file for code formatting check
│
├── package.json # node package manager file
├── tsconfig.base.json # TypeScript global config file
│
├── // ... other config files
│
└── README.md # This file

```
****
