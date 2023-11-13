# Dotnet server

Simple Dotnet mininal API backed boilerplate.

## Local run

Run the service by:

```bash
  dotnet run --project Server
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
