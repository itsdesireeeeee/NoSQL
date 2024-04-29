// Task 3i

db.credits.aggregate([
    // TODO: DONE
    {$unwind: "$cast"},
    {$match: {"cast.id": 7624}},
    {$project: {"cast.id": 1, movieId: 1, "cast.character": 1}},
    {$lookup: {from: "movies_metadata", localField: "movieId",
                foreignField: "movieId", as:"movie"}},
    {$unwind: "$movie"},
    {$project: {_id: 0, title:"$movie.title",
    release_date:"$movie.release_date", character: "$cast.character"}},
    {$sort: {release_date: -1}}


]);

//Stan Lee was known to make cameos in film adaptations of his works.
// Stan Lee's id in the credits collection is 7624
//Find the release date, title, and the name of the character Lee played.
//Order the results in descending order of release date.
//output documents should title, release date, character
