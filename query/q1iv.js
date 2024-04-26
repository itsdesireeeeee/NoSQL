// Task 1iv

db.ratings.aggregate([
    // TODO: DONE
    {$match: {userId: 186}}
    ,
    {$sort: {timestamp: -1}}
    ,
    {$limit: 5}
    ,
    {$group: {_id:null,
        movieIds: {$push:"$movieId" },
        ratings: {$push:"$rating" },
        timestamps:{$push: "$timestamp"}}}
    ,
    {$project: {_id: 0}}  //ONlY NED TO PROJECT OUT ID FIELD
]);

//Find critic 186's five most recent movie reviews,
//and create create a document with the following fields:
//{
      //"movieIds": [most recent movieId, 2nd most recent, ... , 5th most recent],
      //"ratings": [most recent rating, 2nd most recent, ..., 5th most recent],
      //"timestamps": [most recent timestamp, 2nd most recent, ... , 5th most recent]
//  }