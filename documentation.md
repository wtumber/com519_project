
Dambry - COM519 Project 
===
_Will Tumber_

Title| Link
-----|-----
Hosted Site | https://shielded-fortress-22361.herokuapp.com/ 
GitHub Repo | https://github.com/wtumber/com519_project 
App README  | [README.md](README.md)
data README | [README.md](/project_code/create_initial_data/README.md)

 
## Introduction
> An ambry is a recess in a church wall in which books, tools, and sacred vessels are kept. 

The Data science ambry (Dambry) applies that definition to the abundance of data science guidance, tools, and tutorials online, providing a place to store these "sacred vessels".

### The need for this site
#### The recommender matters
The sheer number of resources all covering similar content means it's hard to know whether a resource is worth your time. It is for this reason that knowing who recommends a resource matters just as much as the resource itself. For example, if you were looking to improve your data visualisation skills and had the choice of 10 courses, it would be wise to start with the one recommended by [Alberto Cairo](https://com.miami.edu/profile/alberto-cairo/).

#### Consolidating good resources
I currently have over 100 tabs linking to tutorials open on my phone, 17 pages saved on my Chrome reading list, 4 links bookmarked on Twitter, and well over 40 articles on my Medium reading list. Dambry provides a central place to save these links, while also rating and describing the content so other people know 1: that it exists, and 2: if it's any good.

#### Improving organisation training
Many large organisations moved away from DataCamp causing them to seek alternative training solutions. Evidently ample material exists online, usually for free, but actually discovering a worthwhile and recommendable course is difficult. When you do come across content of this type, you want to be able to recommend it while also keeping a record of its' link, title, and also a brief description. This forms the fundamentals of the project and the desired data informs documents.
## System Overview
#### **Database seeding**

The diagram below represents the database seeding process.

<!--![Database seeding diagram](/project_code/img/public/database_seeding.png)-->
<img src="/project_code/img/public/database_seeding.png" width="500">

### Database design
The database follows the Data Model Design identified by MongoDB as ["Normalized Data Models"](https://docs.mongodb.com/manual/core/data-model-design/). This would enable me to represent complex many-to-many relationships in the future while decreasing the quantity of duplicate information in the database.

I used the bootstrap [blog](https://getbootstrap.com/docs/4.0/examples/blog/) template as a starting point for this application and have used the bootstrap [glyphicon SVGs](https://icons.getbootstrap.com/) to give the application a better look. 

#### **Database ERD**
<!--![Database ERD](/project_code/img/public/database_erd.png)-->
<img src="/project_code/img/public/database_erd.png" width="350">

One _Recommender_ can make many (or no) recommendations , however one _Guide_ can only have one _Recommender_. This is because each guide is a single recommendation, and so when someone else recommends that same guide, a new _Guide_ is created. This is important because the new _Recommender_ may hold a different opinion regarding the _Guide_ content which is important to show but should not take precedent over the previous information. Additionally, repeat recommendations should indicate to the user that the guide is a worthwhile time investment.

At the moment languages are represented as 1-to-many. This is because there is a language called "Multiple" which indicates that a _Guide_ includes multiple languages. Updating this to a many-to-many relationship would be part of the process to improve the application beyond a proof of concept.

#### **Database interactions**
The images below show the interaction process between the models, controllers, and application layer for each controller.
#### Recommender
<!--![recommender CRUD actions](/project_code/img/public/recommender_collection_actions.png)-->
<img src="/project_code/img/public/recommender_collection_actions.png" width="500">

#### Guide
<!--![guide CRUD actions](/project_code/img/public/guide_collection_actions.png)-->
<img src="/project_code/img/public/guide_collection_actions.png" width="500">

#### Home
<!--![home CRUD actions](/project_code/img/public/home_controller_actions.png)-->
<img src="/project_code/img/public/home_controller_actions.png" width="500">

#### User
<!--![user CRUD actions](/project_code/img/public/user_collection_actions.png)-->
 <img src="/project_code/img/public/user_collection_actions.png" width="500"> 

#### Saved Controller Actions
<!--![saved CRUD actions](/project_code/img/public/saved_controller_actions.png)-->
<img src="/project_code/img/public/saved_controller_actions.png" width="500">

### Security and Scalability
I have locked down routes to add guides, add recommenders, and view saved resources.
A user must create an account with a unique username and password before account creation is completed.
User passwords hashed with bcrypt for 10 rounds before they are stored in the database. I have required that passwords are 4-14 characters in length for additional security.

### Challenges, issues, and bugs
I faced several challenges during development, given below: 
* Upsert: I had issues with upsert, the solution to which appeared to be adding a component to `Retry`. This seemed an unelegant solution, so I instead opted to manually query the database for the Id to ascertain whether to update or create.
* `unique: true` gives an `UnhandledPromiseRejectionWarning`. This was an issue relating to creating a new user, and seemed to exist even in the db-starter-project. My solution is similar to the of the previous issue; `.find({username:req.body.username})`, and if already exists raise an error.
* I had issues when implementing searching due to an `unknown language error` when creating a text index. I resolved this issue by creating the text index during seeding, using the following code (in seeder.js) to override the default language behaviour:
```js
await db.collection("guides").createIndex(
        { 
          "$**" : "text",
       },{
        "default_language": "en",
        "language_override": "en"
       });
```
* `.populate` was not creating an array, resulting in `forEach is not a function` error. To fix this I found the saved guide Ids, then retrieved the guides from the database using Id.
* You could repeatedly save the same guide, resulting in duplication. Therefore I opted to use `$addToSet` to automatically deal with this.
* Visiting any update/:id page returns the error `blog.css cannot be applied`. This means blog.css does not get applied to update-guide.ejs, however the page still functions as normal.
* Heroku did not recognise the buildpack for this project. In this case the fix was to simply define the buildpack manually using `heroku buildpacks:set heroku/nodejs`.

### **Future Iterations of Dambry**
Future iterations of the application and updates must include updates to the recommenders collection. Ideally, a recommender group should have the opportunity to be private or invite only, with an administrator of the recommender group to control access.

As with all social sites, Dambry would be susceptible to shameless [self-promotion tactics](https://kenji.ai/). It is for this reason that I envisioned Dambry to be an internal application for an organisation. A large, multi-disciplinary organisation could use the site to promote both internal and external resources which they recommend to upskill staff. In this example, a recommender could be a team within an organisation that is highly specialised but looking to enable learning on a larger scale.

## Conclusions and reflection
One issue which I had not anticipated was following naming conventions. I was developing in R and Python concurrently during this project, and therefore I notice that at times I have inadvertently used a mixture of camelCase, BigCamelCase (as with R), and snake_case (as with Python).

There are aspects of the application which are mostly only applicable to a toy problem and would not be suitable for a industry-ready application. The *num_reviews* column in the _Recommenders_ collection, for example, provides no information that is not easily accessed using a `count()` method. It is useful, however, to demonstrate the capability of `UpdateOne`. 

I have experience developing data-oriented apps using {Shiny} in R. Learning another toolset which is capable of achieving the same results has been refreshing. I have also been able to integrate the lessons from this application into the pipeline of other applications. For example, I can use the frontend from this module in combination with R to hold datasets. Alternatively, I could use R to query data from a MongoDB database and present that in a {shiny} app.

As a result of this module I am now familiar with JavaScript and feel confident using it in the workplace for simple applications. Additionally, I have recognised many of the steps from this project in  online tutorials ([example](https://www.youtube.com/watch?v=GK4Pl-GmPHk)), meaning that I should be able to use the basis of this module to learn other skills such as creating APIs.