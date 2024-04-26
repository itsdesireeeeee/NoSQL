// Task 1i

db.keywords.aggregate([
    // TODO: DONE
    {$match:
        {$or:[
            { keywords: { $elemMatch:{ name: "marvel comic"}}} ,
            { keywords: { $elemMatch:{name: "mickey mouse"}}}
            ]
        }
    },
    { $sort: { movieId: 1}
    },
    { $project: {"movieId": 1, "_id": 0} //need to explicitly project out _id field
    }

]);
//  Find the IDs of all movies labeled with the keyword "mickey mouse" or "marvel comic"
//by writing a query on the keywords collection. Order your output in ascending order of movieId

