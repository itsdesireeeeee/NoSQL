// Task 1ii

db.movies_metadata.aggregate([
    // TODO: DONE
    {$match: {genres: {$elemMatch: {name: "Comedy"}}, vote_count: {$gte: 50}}}
    ,
    {$sort: {vote_average: -1,vote_count: -1, movieId: 1}}
    ,
    {$limit: 50}
    ,
    {$project: {"_id": 0, "title": 1, "vote_average": 1, "vote_count": 1, "movieId": 1}}
]);

//Return the id, title, average vote, and vote count
//of the top 50 comedy movies
//ordered from highest to lowest by average vote,
 //breaking ties by descending order of vote count,
 //and any further ties in ascending order of movieId.
 //Only include movies with 50 or more votes.