# Seeding data
**Run _main.py_ to create _guides.json_.**

create_inital_data/  
│   
├── main.py  
├── start_lists.py  
├── README.md   
└── guides.json  

_start_lists.py_ contains several lists which are used as a starting point for guides.json.    
_main.py_ uses the `json` package to create a json from these lists, which is provided to _seeder.js_ to populate the MongoDB database.

### lists in start_lists.py
* title
* author
* format
* description
* link
* language
* key_themes
* difficulty
* recommended_by
* user_type