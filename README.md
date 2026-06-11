# TempNote

If you need a simple site for a quick note taking session without cluttering your more important notes, feel free to use TempNote.

Consider that the notes entered in the site will be erased once closed.

---

version 2.1: https://temp-note.netlify.app/

version 1.0: https://lyrick17.github.io/TempNote/

---

### Run with Docker

I used this app to also learn docker, so expect some mistakes.

```
docker-compose -f docker-compose.<env>.yml up

# run in background
docker-compose -f docker-compose.<env>.yml up -d

# force rebuild image (ex. when updating dockerfile)
docker-compose -f docker-compose.<env>.yml up --build

docker-compose -f docker-compose.<env>.yml down

# stop and deletes volumes too
docker-compose -f docker-compose.<env>.yml down -v

# removes image
docker rmi <image-name>
docker rmi -f <image-name>

# clear build cache
docker buildx prune -f
```
