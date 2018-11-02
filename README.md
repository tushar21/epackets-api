##Installation will need to run docker first.
1) cd devaju/
2) ``` docker-compose up 
```

Note : Please Run with docker-compose with admin permissions like sudo in case of  ubuntu

##Docker-compose install 2 services on different port: 
1) 9200 : Elasticsearch port
2) 1358: Devaju which is UI for insert data in elasticsearch

##After docker is running, run application: 
```
1) npm install (this will be onle time only)
2) npm start
```

##After api and elasticsearch started, create indices by running this url in browser: 
``` 
http://localhost:3002/cron/createIndices 

```

Note : you can use your ip address instead of localhost Ex: http://<YOUR IP HERE>/cron/createIndices