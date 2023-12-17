# Dotnet server

Simple Dotnet mininal API backed boilerplate.

## Local enviroment values

Create an `appsettings.local.json` file. Include the following in that file:

```
{
  "Auth0": {
    "Authority": "Get this from your Auth0 management page",
    "Audience": "Get this from your Auth0 management page"
  },
  "ConnectionStrings": {
    "db": "Server=tcp:localhost,1433;Database=Server;User Id=sa;Password=Th1sI5T0t4l1yAR3AlP45sW0rD;Encrypt=False;"
  }
}
```

## Local db

Run a SQL server instance:

```bash
  docker compose up db -d
```

## Local run

Run the service by:

```bash
  dotnet run --project Server
```

This will open a website you can view the swagger UI by going to:

```
http://localhost:SOMEPORT/swagger/index.html
```

## Local build

Run the service by:

```bash
  cd server
  dotnet publish --configuration Release
  docker compose server up -d
```

This will open a website you can view the swagger UI by going to:

```
http://localhost:SOMEPORT/swagger/index.html
```

## Generate Swagger

To generate the swagger `api-spec.json` run the following command.

```
dotnet test
```

This will run the project xunit tests, one of these tests is the comparing and generation of a swagger file (the frontend required this to build a TS client).
