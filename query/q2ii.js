// Task 2ii

db.movies_metadata.aggregate([
    // TODO: DONE
    //make sure string exists found from stack overflow
    {$project: {"_id": 0,
        word: {$split: [{$toLower: {$trim: {input: "$tagline", chars: ".,?! " }}}, " " ]}
    }},
    {$unwind: "$word"},

    {$project: {"word": {$trim: {input: "$word", chars: ".,?! " }}}},
    {$match: {$expr: {$gt: [{$strLenCP: "$word"}, 3]}}},
    {$group: {_id: "$word", count: {$sum: 1}}},
    {$sort: {count: -1}},
    {$limit: 20}


]);

//{$split: [{$toLower: {$trim: {input: "$tagLine", chars: ".,?!" }}}, " " ]}


