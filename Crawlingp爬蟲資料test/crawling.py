import requests
from bs4 import BeautifulSoup
'''

url = "https://www.airbnb.com.tw/?refinement_paths%5B%5D=%2Fhomes&search_mode=flex_destinations_search&flexible_trip_lengths%5B%5D=one_week&location_search=MIN_MAP_BOUNDS&monthly_start_date=2025-06-01&monthly_length=3&monthly_end_date=2025-09-01&price_filter_input_type=2&channel=EXPLORE&search_type=category_change&price_filter_num_nights=5&category_tag=Tag%3A8678"
response = requests.get(url)
#html=response.content.decode()

soup = BeautifulSoup(response.text, "html.parser")
print(soup)
# 提取房源標題
titles = soup.find_all('div', {'class': '_10d7v0r'})

for title in titles:
    print(title.get_text())

'''