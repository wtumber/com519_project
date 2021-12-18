
Dambry - COM519 Project 
===
_Will Tumber_

Title| Link
-----|-----
Hosted Site | https://shielded-fortress-22361.herokuapp.com/ 
GitHub Repo | https://github.com/wtumber/com519_project 

## Introduction
> An ambry is a recess in a church wall in which books, tools, and sacred vessels are kept. 

The Data science ambry (Dambry) applies that idea to the abundance of data science guidance, tools, and tutorials online, providing a place to store these sacred vessels. The sheer number of resources all covering similar content means it's hard to know whether you are spending your time wisely, and for this reason, who recommended the resource matters just as much as the resource itself. For example, if you were looking to improve your data visualisation a course is a good place to start, but a course recommended by [Alberto Cairo](https://com.miami.edu/profile/alberto-cairo/) is an _even better one_.

I currently have over 100 tabs linking to tutorials open on my phone, 17 pages saved on my Chrome reading list, 4 links bookmarked on Twitter, and well over 40 articles on my Medium reading list. Dambry provides a central place to save these links, while also rating and describing the content so other people know 1: that it exists, and 2: if it's any good.

Many large organisations moved away from DataCamp in the last year, leaving them seeking alternative training solutions. It is obvious the material exists online, and can usually be found for free, but actually finding a worthwhile and recommendable course is difficult. When you do come across content of this type, you want to be able to recommend it while also keeping a record of its' link, title, and also a brief description. This data forms the fundamentals of the database and therefore the project.
## System Overview
TODO
## Key design decisions
TODO
### Database design
TODO
### Security and Scalability
#### Future Iterations
Future iterations of the application and updates must include updates to the recommenders collection. Ideally, a recommender group should have the opportunity to be private or invite only, with an administrator of the recommender group to control access.

As with all social sites, Dambry would be susceptible to shameless [self-promotion tactics](https://kenji.ai/). It is for this reason that I envisioned Dambry to be an internal application for an organisation. A large, multi-disciplinary organisation could use the site to promote both internal and external resources which they recommend to upskill staff. In this example, a recommender could be a team within an organisation that is highly specialised but looking to enable learning on a larger scale.

### Challenges, issues, and bugs
I faced several challenges during development. One issue which I had not anticipated was following naming conventions. I was developing in R and Python concurrently during this project, and therefore I notice that at times I have inadvertently used a mixture of camelCase, BigCamelCase (as with R), and snake_case (as with Python).

* Upsert: I had issues with upsert which StackOverflow suggested would have required adding Retry to the code. This seemed an unelegant solution, so I instead opted to manually query the database for the Id to ascertain whether to update or create.
* `unique: true` gives an `UnhandledPromiseRejectionWarning`. This was an issue relating to creating a new user, and seemed to exist even in the db-starter-project. My solution is similar to that for the previous issue; `.find({username:req.body.username})` and if already exists raise an error.
* I had issues when implementing searching due to an `unknown language error` when creating a text index. I resolved this issue by creating the text index during seeding, using the following code to override the default language behaviour:
```js
await db.collection("guides").createIndex(
        { 
          "$**" : "text",
       },{
        "default_language": "en",
        "language_override": "en"
       });
```
* `.populate` was not creating an array, resulting in a `forEach is not a function` error. To fix this I found the saved guide Ids, then retrieved the guides from the database manually.
* You could repeatedly save the same guide, resulting in duplication. Therefore I opted to use `$addToSet` to automatically deal with this.
* Visiting any update/:id page returns the error `blog.css cannot be applied`. This means blog.css does not get applied to update-guide.ejs.
* Heroku did not recognise the buildpack for this project. In this case the fix was to simply define the buildpack manually using `heroku buildpacks:set heroku/nodejs`.


## Conclusions and reflection