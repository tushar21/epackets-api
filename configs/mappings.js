module.exports = {
    "users": {
        "_doc": {
            "properties" : {
                "first_name": { "type" : "text" },
                "last_name": { "type" : "text" },
                "email": { "type" : "keyword" },
                "password": { "type" : "keyword" },
                "contact": { "type" : "text" },
                "type": { "type" : "keyword" },
                "created_on": { "type" : "date", "format" : "epoch_second" }
            }
        }
    },
    "cases": {
        "_doc": {
            "properties" : {
                "title": { "type" : "text" },
                "description": { "type" : "text" },
                "court": { "type" : "text" },
                "judge": { "type" : "text" },
                "lawyer": { "type" : "text" },
                "appelant": { "type" : "text" },
                "opponent": { "type" : "text" },
                "category": { "type" : "text" },
                "startYear": { "type" : "text" },
                "endYear": { "type" : "text" },
                "date" : {"type": "date", "format": "epoch_second"}
            }
        }
    },
    "statute": {
        "_doc": {
            "properties" : {
                "title": { "type" : "text" },
                "description": { "type" : "text" },
                "date" :  {"type": "date", "format": "epoch_second"}
            }
        }
    },
    "briefs": {
        "_doc": {
            "properties" : {
                "title": { "type" : "text" },
                "description": { "type" : "text" },
                "date" : {"type": "date", "format":"epoch_second"}
            }
        }
    },
    "casebriefsrelations":{
        "_doc": {
            "properties":{
                "case_id" : {"type": "keyword"},
                "brief_id" : {"type": "keyword"}
            }
        }
    },
    "casestatuterelations":{
        "_doc": {
            "properties":{
                "case_id" : {"type": "keyword"},
                "statute_id" : {"type": "keyword"}
            }
        }
    },
    "statutebriefrelations":{
        "_doc": {
            "properties":{
                "case_id" : {"type": "keyword"},
                "statute_id" : {"type": "keyword"}
            }
        }
    }
}