// Task 1iii
// For each possible rating find how many times that rating was given.
// Include the rating and the number of the times the rating was given and output in descending order of the rating.
// The output documents should have the following fields: { "count": <number>, "rating": <number>}

db.ratings.aggregate([
    // TODO: DONE
    {$group: {_id: "$rating" , count: {$sum: 1}}}
    ,
    {$project: {_id: 0, rating: "$_id", count: 1}},
    {$sort: {rating: -1}}

]);
