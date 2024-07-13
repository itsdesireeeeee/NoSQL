// Task 2iii
// How much does it cost to make a movie? Group the budgets by their value rounded to the nearest multiple of ten million, and return the count for each rounded value. 
// Additionally include an extra group "unknown" for the count of movies where the budget was not known. Order by ascending order of rounded budget.
// Your output documents should have the following fields:
    //{ "budget": <number or "unknown">, "count": <number>}

db.movies_metadata.aggregate([
    // TODO: DONE
     {$project: {"_id": 0,
     "budget": {$cond: {if:
    //sets unknowns
     {$or:
        [{$eq: ["$budget",  null]}, {$eq: ["$budget",  ""]},
        {$eq: ["$budget",  false]}, {$eq: ["$budget",  undefined]}]
     },
      then: "unknown", else: "$budget"}}
     }},
      //trims
     {$project: {"budget": {$cond: {if:
       {$isNumber: "$budget"}, then: "$budget",
       else: {$trim: {input: "$budget", chars: "USD$ " }}}}
     }},
    //converts to int
     {$project: {"budget": {$cond: {if:
            {$or: [{$isNumber: "$budget"}, {$eq: ["$budget",  "unknown"]}]}
            , then: "$budget",
            else:
            {$toInt: "$budget"}
            }}
     }},
     //ROUND 
     {$project: {"budget": {$cond: {if:
      {$isNumber: "$budget"}, then: {$round: ["$budget",-7]}, else: "$budget"}}}},

     {$group: {_id: "$budget", budget:{$first: "$budget"}, count: {$sum: 1}}},
     {$sort: {_id: 1}},
     {$project: {_id: 0}}

]);
