// Task 3i

db.credits.aggregate([
    // TODO: Write your query here
    {$match: {cast: {$elemMatch: {id: 7624}}}},
    {$project: {cast: 1}}


]);

//Stan Lee was known to make cameos in film adaptations of his works.
// Stan Lee's id in the credits collection is 7624
//Find the release date, title, and the name of the character Lee played.
//Order the results in descending order of release date.
//output documents should title, release date, character


 //{$lookup: {from: "credits", localField: "movieId",
            //foreignField: "movieId", as:"cast"}}, // join
  //{$unwind: "$cast"},
  //{$match: {"cast.id": 7624}},
  //{$project: {_id:0, release_date:1, title: 1, character: "$cast.character"}},
  //{$limit: 5}