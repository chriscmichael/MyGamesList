# Integrations

The application will need to get the following kinds of data from third-party sources:

- Games data from IGDB API https://www.igdb.com/api

After registering a website on IGDB, you can recieve a Client Secret and Client ID for use to access the api. Create a keys.py file in the api directory and add it to .gitignore. Then enter

igdb_client_id= {Client ID}
igdb_access_key="Bearer {Client Secret}"

into the keys.py file. After the docker containers are up and running, run this command in the api shell:

python -m cache_database_setup.py

After a few minutes the games will be cached into the database.

In order for the search bar to work, download MongoDB Compass from https://www.mongodb.com/try/download/compass. Then enter the MONGO_INITDB_ROOT_USERNAME and MONGO_INITDB_ROOT_PASSWORD into the Authorization tab after connecting to the database.
