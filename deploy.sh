cd app
ls
mv $(deploymentAppsettings.secureFilePath) .
mv deploymentAppsettings.json appsettings.json
ls
cat appsettings.json
dotnet tool install --global dotnet-ef --version 3.0
dotnet ef database update