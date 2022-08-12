import random
from pathlib import Path

import requests
from bs4 import BeautifulSoup

source = Path("userstock.html")
assert source.exists()

image_dir = Path("images")
image_dir.mkdir(exist_ok=True)


def main():
    with source.open() as f:
        soup = BeautifulSoup(f, "html.parser")
    images = soup.find_all("img")
    # save all images to a directory

    image_urls = [img["src"] for img in images]
    # shuffle the list of image urls
    random.shuffle(image_urls)

    count = 0

    for image in image_urls:
        try:
            # download the image
            response = requests.get(image)
            # save the image to the directory
            outpath = image_dir / f"{count}.jpg"
            with outpath.open("wb") as f:
                f.write(response.content)
                print(f"Image saved: {outpath}")
            count += 1
        except Exception as e:
            print(e)
            continue

    print(f"Downloaded {count} images")


if __name__ == "__main__":
    main()
