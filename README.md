# TempNote

If you need a simple site for a quick note taking session without cluttering your more important notes, feel free to use TempNote.

Consider that the notes entered in the site will be erased once closed.

---

version 2.3: https://temp-note.netlify.app/

version 1.0: https://lyrick17.github.io/TempNote/

---

### How to Use

For my future self reference on how to install and deal with Angular:

Install and run the app:

```bash
# 1. install
npm install

# 2. run app
ng serve
```

Run unit tests:

```bash
# run unit tests
ng test

# run tests without browser opening
ng test --watch=false --browsers=ChromeHeadless
```

Angular Schematics for creating other stuffs:

```bash
# creating a new component
ng g c path/to/component/file

# creating a new service
ng g s path/to/service/file

# creating a new interface
ng g interface path/to/interface/file
```

---

### Run with Docker

Orrr if you want to use docker, use this reference. I used this app to also learn docker, so expect some mistakes.

```bash
docker-compose -f docker-compose.<env>.yml up

# run in background
docker-compose -f docker-compose.<env>.yml up -d

# force rebuild image (ex. when updating dockerfile)
docker-compose -f docker-compose.<env>.yml up --build

docker-compose -f docker-compose.<env>.yml down

# stop and deletes volumes too
docker-compose -f docker-compose.<env>.yml down -v

docker-compose -f docker-compose.<env>.yml restart

# once container is up, start or stop it without downing & recreating containers
docker-compose -f docker-compose.<env>.yml start
docker-compose -f docker-compose.<env>.yml stop

# removes image
docker rmi <image-name>
docker rmi -f <image-name>

# clear build cache
docker buildx prune -f
```
