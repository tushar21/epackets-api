module.exports = {
    "users": {
        "_doc": {
            "properties" : {
                "first_name": { "type" : "text" },
                "last_name": { "type" : "text" },
                "email": { "type" : "text" },
                "password": { "type" : "text" },
                "contact": { "type" : "text" }
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
                "endYear": { "type" : "text" }
            }
        }
    },
    "statuses": {
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
                "endYear": { "type" : "text" }
            }
        }
    },
    "briefs": {
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
            "endYear": { "type" : "text" }
            }
        }
    }
}