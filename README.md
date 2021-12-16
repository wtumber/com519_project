# COM517 Project README.md
## COM517 Proposal and data plan
1.	Document/Guide management and recall system
    * Does not intend to store local versions of documents
    * Stores recommendations of guides by users
    * Datashape
        * Title
        *	Author (Author)
        *	Material format (blog/book/e-book/training course)
        *	Language/Key Theme (Python/R): Multiple choice, ability to add others
        *	Refer to this guide for:
        *	Theme 1
        *	Theme 2 (Optional)
        *	Price (Optional)
        *	Brief summary
        *	Review (*/7)
    *	Allows aggregation by the guide type, see best reviewed guides, filter by theme, add new guide
    *	Very relevant - many organisations found themselves moving away from training in data science through Datacamp, and sought alternative solutions. Likewise, people looking to upskill in their own time would begrudge paying for expensive monthly licenses when there are an abundance of free resources. This highlights a clear need for this product.
    *	Anecdotally, I have found myself with easily 100+ open tabs on my phone with guides, adding guides to the reading list, bookmarking tabs on Medium, etc. These are all useful in isolation but make effective sharing across an organisation/ group difficult

### Notes
I was keen to move away from populating the json as quickly as possible, as it was a slow process which the entire point of the app was to reduce.


### Databases
Called guidesDEV and guides.
guides contains colletions users, guides, and recommenders.


### Aggregating for recommenders

``` js
db.guides.aggregate([
  {$group: {
      _id: "$recommended_by",
      handle: {$first: "$handle"},
      aboutme: {$first: "$aboutme"},
      num_reviews:{$sum:1}
      }
    },
  {$project: {
      username: "$_id",
       "_id" : 0,
       handle: "$handle",
       num_reviews: "$num_reviews"
       }
    },
  {$out:"recommenders"}
])
```


use of snake case regularly as opposed to camel case as I am developing in python and R in parallel to this development, and therefore continuously switching languages was a challenge.

npm run seed
npm run seedproduction

upsert seems to have an error requiring retrying in order to upsert effectively, thereofre I used an alternative of simply checking if it existed and then determining action

known issues
when update/:id this means blog.css cannot be applied and therefore update-guide has no css layout
unique:true gives an UnhandledPromiseRejectionWarning:
Using upsert if does not exist.

https://github.com/typeorm/typeorm/issues/4122

This indices issues seemed to be consistent even with the starter project, therefore I have impletemented a workaround.

Additionally, I was forced to create text indices manually in the seeder.js due to an unknwown language error arising.


forced to create indexes
```js
await db.collection("guides").createIndex(
        { 
          "$**" : "text",
       },{
        "default_language": "en",
        "language_override": "en"
       });
```

forEach not working with .populate 
therefore constructed another query
save now works
uses AddToSet to ensure only one can be added at a time - no duplicates
option to unsave added
option to show more to guides tab

npm install -D cross-env

heroku buildpacks:set heroku/nodejs

## Project code README.md
1. npm install
2. npm run seed/ npm run seedPRODUCTION
3. npm run dev

### Notes
The `img/` directory holds images for the portfolio as well as any images used on the site.

