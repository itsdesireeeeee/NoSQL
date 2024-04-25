// Task 1i

db.keywords.aggregate([
    // TODO: Write your query here
    {$match:
        { "keywords.name": { $in:["marvel comic", "mickey mouse"]}}
    },
    { $sort: { movieId: 1}
    },
    { $project: {"movieId": 1} //not sure if i need "keywords": 0
    }

]);
//  Find the IDs of all movies labeled with the keyword "mickey mouse" or "marvel comic"
//by writing a query on the keywords collection. Order your output in ascending order of movieId

