FROM mcr.microsoft.com/dotnet/sdk:6.0-alpine as build

WORKDIR /pmt-security

COPY ./*.csproj .
RUN dotnet restore

COPY . ./
RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:6.0-alpine as runtime
WORKDIR /pmt-security

COPY --from=build /pmt-security/out .

EXPOSE 80

ENTRYPOINT [ "dotnet", "pmt-security.dll" ]