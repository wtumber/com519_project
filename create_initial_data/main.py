import json
from start_lists import *


def run():
    data = [{"title":a,
        "author":b,
        "format":c,
        "description":d,
        "link":e,
        "language":f,
        "keywords":f,
        "complexity":g,
        "recommended_by":h,
        } for a,b,c,d,e,f,g,h,i in zip(title, authors, format, description, link,
        language, keywords, complexity, recommended_by)]

    with open("guides.json", "w") as outfile:
        json.dump(data, outfile, indent=4)


if __name__ == "__main__":
    run()
    
