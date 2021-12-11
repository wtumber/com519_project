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