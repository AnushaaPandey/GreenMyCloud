# In views.py of your Django app
from django.http import JsonResponse
import requests
from bs4 import BeautifulSoup

def scrape_articles(request):
    articles = []

    newspapers = [
    {
        "name": "cityam",
        "address": "https://www.cityam.com/topic/climate-change/",
        "base": ""
    },
    {
        "name": "bbc",
        "address": "https://www.bbc.com/news/topics/cmj34zmwm1zt",
        "base": "https://www.bbc.com"
    },
    {
        "name": "newyorktimes",
        "address": "https://www.nytimes.com/section/climate",
        "base": ""
    },
    {
        "name": "washingtonpost",
        "address": "https://www.washingtonpost.com/climate-environment/",
        "base": ""
    },
    {
        "name": "wsj",
        "address": "https://www.wsj.com/news/types/environment",
        "base": ""
    },
    {
        "name": "telegraph",
        "address": "https://www.telegraph.co.uk/climate-change/",
        "base": "https://www.telegraph.co.uk"
    },
    {
        "name": "independent",
        "address": "https://www.independent.co.uk/environment/climate-change",
        "base": "https://www.independent.co.uk"
    },
    {
        "name": "times",
        "address": "https://www.thetimes.co.uk/environment/climate-change",
        "base": ""
    },
    {
        "name": "sun",
        "address": "https://www.thesun.co.uk/topic/climate-change-environment/",
        "base": "https://www.thesun.co.uk"
    },
    {
        "name": "dailymail",
        "address": "https://www.dailymail.co.uk/news/climate_change_global_warming/index.html",
        "base": ""
    },
    {
        "name": "express",
        "address": "https://www.express.co.uk/latest/climate-change",
        "base": "https://www.express.co.uk"
    },
    {
        "name": "mirror",
        "address": "https://www.mirror.co.uk/all-about/climate-change",
        "base": ""
    },
    {
        "name": "dailystar",
        "address": "https://www.dailystar.co.uk/latest/climate-change",
        "base": ""
    },
    {
        "name": "metro",
        "address": "https://metro.co.uk/tag/climate-change/",
        "base": ""
    },
    {
        "name": "economist",
        "address": "https://www.economist.com/climate-change",
        "base": "https://www.economist.com"
    },
    {
        "name": "guardian",
        "address": "https://www.theguardian.com/environment/climate-crisis",
        "base": ""
    },
    {
        "name": "atlantic",
        "address": "https://www.theatlantic.com/category/climate/",
        "base": ""
    },
    {
        "name": "newyorker",
        "address": "https://www.newyorker.com/tag/climate-change",
        "base": ""
    },
    {
        "name": "conversation",
        "address": "https://theconversation.com/uk/environment",
        "base": "https://theconversation.com"
    },
    {
        "name": "national_geographic",
        "address": "https://www.nationalgeographic.com/environment/",
        "base": ""
    },
    {
        "name": "scientific_american",
        "address": "https://www.scientificamerican.com/climate/",
        "base": ""
    },
    {
        "name": "nature",
        "address": "https://www.nature.com/nclimate/",
        "base": "https://www.nature.com"
    },
    {
        "name": "greenpeace_climate_change",
        "address": "https://www.greenpeace.org/international/topic/climate-change/",
        "base": "https://www.greenpeace.org"
    },
    {
        "name": "climate_action_tracker",
        "address": "https://climateactiontracker.org/",
        "base": "https://climateactiontracker.org"
    }
]


    for newspaper in newspapers:
        response = requests.get(newspaper["address"])
        if response.status_code == 200:
            html = response.text
            soup = BeautifulSoup(html, "html.parser")
            links = soup.find_all("a", string=lambda text: "climate" in str(text).lower())
            for link in links:
                title = link.text.strip()
                url = newspaper["base"] + link["href"]
                # Fetch the article content
                article_response = requests.get(url)
                if article_response.status_code == 200:
                    article_html = article_response.text
                    article_soup = BeautifulSoup(article_html, "html.parser")
                    # Assuming article content is within <p> tags
                    content = "\n".join([p.text for p in article_soup.find_all("p")])
                    articles.append({
                        "title": title,
                        "url": url,
                        "source": newspaper["name"],
                        "content": content
                    })

    return JsonResponse(articles, safe=False)
