FROM mcr.microsoft.com/dotnet/core/aspnet:3.1

WORKDIR /app

EXPOSE 80

COPY ./bin/Release/netcoreapp3.1/publish/ /app/out

ENTRYPOINT [ "dotnet","./out/server.dll" ]