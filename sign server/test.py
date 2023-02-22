import requests

url = 'https://weavetransfer.pythonanywhere.com//file-upload'
file_path = 'example.txt'

with open(file_path, 'rb') as file:
    files = {'file': file}
    response = requests.post(url, files=files)

print(response.text)
