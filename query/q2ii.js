// Task 2ii
// We want to see the 20 most common words (length > 3) across all taglines in descending order.
// We will limit the words to length >3 to remove filler words, prepositions, and some pronouns. 
// We also want to trim off any surrounding punctuation in a word and set all words to lowercase 
// Do not trim off any other punctuation character that is not mentioned. Order your output in descending order of count.
//Your output documents should have the following fields:
    //{ "_id": <string>, "count": <number>}

db.movies_metadata.aggregate([
    // TODO: DONE
    //make sure string exists
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
