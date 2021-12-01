import json
from start_lists import title, authors, date, link, language, keywords, content_type, comments, information_density


def run():
    data = [{"title":a,
        "author(s)":b,
        "published_date":c,
        "link":d,
        "coding_language":e,
        "keywords":f,
        "content_type":g,
        "summary":h,
        "difficulty":i
        } for a,b,c,d,e,f,g,h,i in zip(title, authors, date, link, language,
        keywords, content_type, comments, information_density)]

    with open("../project_code/guides.json", "w") as outfile:
        json.dump(data, outfile, indent=4)


if __name__ == "__main__":
    run()
    
