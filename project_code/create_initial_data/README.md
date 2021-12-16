### Creating the Data
start_lists.py contains several lists which are used as a starting point for guides.json. main.py used `json` to create a json from these lists, which form the basis of the MongoDB database.

The initial data includes the additional rows of email, aboutme, and handle which are used to form the recommenders (users data) but not relevant to the final guide documents.