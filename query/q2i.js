// Task 2i
// Using IMDb's Weighted Rating (WR) which assigns movies a score based on demographic filtering, return the 20 highest-rated movies according to this formula:
//  WR = (v/(v+m))R + (m/(v+m))C
    // where v is the number of votes for the movie, m is the minimum votes required to be listed in the chart,
    // R is the average rating of the movie (stored in the field vote_average), and C is the mean vote across the whole report (this value is approx. 7)
//Assume the minimum number of votes required to be listed is 1838.

// The output should contain three fields:
    // {"title": <string>, "vote_count": <number>, "score": <number>}
// where 'score' is the WR for the associated movie rounded to two decimal places.

// Sort in descending order of score, and break ties in descending order of vote_count and ascending order of title.




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
