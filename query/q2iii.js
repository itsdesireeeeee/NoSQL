// Task 2iii

db.movies_metadata.aggregate([
    // TODO: DONE
     {$project: {"_id": 0,
     "budget": {$cond: {if:  //sets unknowns
     {$or:
        [{$eq: ["$budget",  null]}, {$eq: ["$budget",  ""]},
        {$eq: ["$budget",  false]}, {$eq: ["$budget",  undefined]}]
     },
      then: "unknown", else: "$budget"}}
     }},
     {$project: {"budget": {$cond: {if:  //trims
       {$isNumber: "$budget"}, then: "$budget",
       else: {$trim: {input: "$budget", chars: "USD$ " }}}}
     }},
     {$project: {"budget": {$cond: {if:  //converts to int
            {$or: [{$isNumber: "$budget"}, {$eq: ["$budget",  "unknown"]}]}
            , then: "$budget",
            else:
            {$toInt: "$budget"}
            }}
     }},
     //ROUND NOW
     {$project: {"budget": {$cond: {if:
      {$isNumber: "$budget"}, then: {$round: ["$budget",-7]}, else: "$budget"}}}},

     {$group: {_id: "$budget", budget:{$first: "$budget"}, count: {$sum: 1}}},
     {$sort: {_id: 1}},
     {$project: {_id: 0}}

]);

//{"budget": {$trim: {input: "$budget", chars: "$USD" }}