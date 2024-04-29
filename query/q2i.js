// Task 2i

db.movies_metadata.aggregate([
    // TODO: DONE
    {$match: {vote_count: {$gte: 1838}}}
    ,
    {$project:
        {_id: 0, title: 1, vote_count: 1,
        score: {$round: [{$add: [
                        {$multiply: [{$divide: ["$vote_count", {$add: ["$vote_count", 1838]}]}, "$vote_average"]},
                        {$multiply: [{$divide: [1838, {$add: ["$vote_count", 1838]}]}, 7]}]}, 2]}
        }
     },
    {$sort: {score: -1, vote_count: -1, title: 1}},
    {$limit: 20}

]);

//assume the minimum votes required to be listed is 1838.
//Return the 20 highest rated movies according to this formula. The output should contain three fields:
 //title with the title of the movie, vote_count with the number of votes the movie received,
 //and score which contains the WR for the associated movie rounded to two decimal places.
 //Sort in descending order of score,
 // and break ties in descending order of vote_count and ascending order of title

 //{$add: ["$vote_average", 7]}

 //$multiply: [{$divide: [1838, {$add: ["$vote_count", 1838]}]}, 7]