
Dambry - COM519 Project 
===
_Will Tumber_

Title| Link
-----|-----
Hosted Site | https://shielded-fortress-22361.herokuapp.com/ 
GitHub Repo | https://github.com/wtumber/com519_project 

## Introduction
> An ambry is a recess in a church wall in which books, tools, and sacred vessels are kept. 

The Data science ambry (Dambry) applies that definition to the abundance of data science guidance, tools, and tutorials online, providing a place to store these "sacred vessels". The sheer number of resources all covering similar content means it's hard to know whether you are spending your time wisely, and for this reason, who recommended the resource matters just as much as the resource itself. For example, if you were looking to improve your data visualisation a course is a good place to start, but a course recommended by [Alberto Cairo](https://com.miami.edu/profile/alberto-cairo/) is an _even better one_.

I currently have over 100 tabs linking to tutorials open on my phone, 17 pages saved on my Chrome reading list, 4 links bookmarked on Twitter, and well over 40 articles on my Medium reading list. Dambry provides a central place to save these links, while also rating and describing the content so other people know 1: that it exists, and 2: if it's any good.

Many large organisations moved away from DataCamp causing them to seek alternative training solutions. Evidently ample material exists online, usually for free, but actually discovering a worthwhile and recommendable course is difficult. When you do come across content of this type, you want to be able to recommend it while also keeping a record of its' link, title, and also a brief description. This forms the fundamentals of the project and the desired data informs documents.
## System Overview
#### **Database seeding**

The diagram below represents the database seeding process.

![](/project_code/img/public/database_seeding.PNG)

### Database design
The database follows the Data Model Design identified by MongoDB as ["Normalized Data Models"](https://docs.mongodb.com/manual/core/data-model-design/). This would enable me to represent complex many-to-many relationships in the future while decreasing the quantity of duplicate information in the database.

#### **Database ERD**
![](/project_code/img/public/database_erd.PNG)

One _Recommender_ can make many (or no) recommendations , however one _Guide_ can only have one _Recommender_. This is because each guide is a single recommendation, and so when someone else recommends that same guide, a new _Guide_ is created. This is important because the new _Recommender_ may hold a different opinion regarding the _Guide_ content which is important to show but should not take precedent over the previous information. Additionally, repeat recommendations should indicate to the user that 

At the moment languages are represented as 1-to-many. This is because instead of adding multiple languages there is instead a language called "Multiple". Updating this to a many-to-many relationship would be part of improving the application beyond a proof of concept.

#### **Database interactions**

#### Recommender
![](/project_code/img/public/recommender_collection_actions.PNG)

#### Guide
![](/project_code/img/public/guide_collection_actions.PNG)

#### Home
![](/project_code/img/public/home_controller_actions.PNG)

#### User
![](/project_code/img/public/user_collection_actions.PNG)
 __Saved Controller Actions__
![](/project_code/img/public/saved_controller_actions.PNG)

### Security and Scalability
Locked routes,
passwords and protection,
require unique username and password.

#### **Future Iterations of Dambry**
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
* `.populate` was not creating an array, resulting in a `forEach is not a function` error. To fix this I found the saved guide Ids, then retrieved the guides from the database using Id.
* You could repeatedly save the same guide, resulting in duplication. Therefore I opted to use `$addToSet` to automatically deal with this.
* Visiting any update/:id page returns the error `blog.css cannot be applied`. This means blog.css does not get applied to update-guide.ejs, however the page still functions as normal.
* Heroku did not recognise the buildpack for this project. In this case the fix was to simply define the buildpack manually using `heroku buildpacks:set heroku/nodejs`.


## Conclusions and reflection
There are aspects of the application which are most applicable to a toy problem and would not be suitable for a industry-ready application. The *num_reviews* column in the _Recommenders_ collection, for example, provides no information that is not easily accessed using a `count()` method. It is useful, however, to demonstrate the capability of `UpdateOne`. 

I have experience developing data-oriented apps using {Shiny} in R. Learning another toolset which is capable of achieving the same results has been refreshing. I have also been able to integrate the lessons from this application into the pipeline of other applications. For example, I can use the frontend from this module in combination with R to hold datasets. Alternatively, I could use R to query data from a MongoDB database and present that in a {shiny} app.