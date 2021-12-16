import json
from start_lists import *


def run():
    data = [{"title":a,
        "author":b,
        "format":c,
        "description":d,
        "link":e,
        "language":f,
        "key_themes":g,
        "difficulty":h,
        "recommended_by":i,
        "user_type": j
        } for a,b,c,d,e,f,g,h,i,j in zip(title, author, format, description, link,
        language, key_themes, difficulty, recommended_by, user_type)]

    with open("guides.json", "w") as outfile:
        json.dump(data, outfile, indent=4)


if __name__ == "__main__":
    run()
    
