# In views.py of your Django app
from django.http import JsonResponse
import requests
from bs4 import BeautifulSoup

def scrape_articles(request):
    articles = []

    newspapers = [
        {
            "name": "cityam",
            "address": "https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action/",
            "base": ""
        },
        # Add other newspaper entries here
    ]

    for newspaper in newspapers:
        response = requests.get(newspaper["address"])
        if response.status_code == 200:
            html = response.text
            soup = BeautifulSoup(html, "html.parser")
            links = soup.find_all("a", string=lambda text: "climate" in str(text).lower())
            for link in links:
                title = link.text.strip()
                url = link["href"]
                articles.append({
                    "title": title,
                    "url": newspaper["base"] + url,
                    "source": newspaper["name"]
                })

    return JsonResponse(articles, safe=False)
