// Task 3ii

db.credits.aggregate([
    // TODO: DONE
    {$unwind: "$crew"},
    {$match: {"crew.id": 5655, "crew.job": "Director"}},
    {$project: {cast: 1}},
    {$unwind: "$cast"},
    {$group: {_id: "$cast.id",name: {$first: "$cast.name"}  ,count: {$sum: 1}}},
    {$sort: {count: -1}},
    {$limit: 5},
    {$project: {_id:0, count: 1, id: "$_id", name: 1}},
    {$sort: {count: -1, id: 1}}



]);

//Find the 5 actors who have appeared the most often in movies
//actor's name, id, and the number of times the actor has collaborated
//Order in descending order of the number of collaborations.
 //Break ties in ascending order of the actor's id.