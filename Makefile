
env ?= dev

.PHONY: up down rebuild restart clean

up:
	docker-compose -f docker-compose.$(env).yml up -d

down:
	docker-compose -f docker-compose.$(env).yml down

rebuild:
	docker-compose -f docker-compose.$(env).yml up -d --build

restart: down up

clean:
ifndef env
	$(error env is required. Please do: make clean env=dev image=myimage)
endif
ifndef image
	$(error image is required. Please do: make clean env=dev image=myimage)
endif
	docker-compose -f docker-compose.$(env).yml down -v
	docker rmi -f $(image)

# npm_run_test:
# ifneq ($(env), dev)
# 	$(error can only run unit tests in dev env.)
# endif
# 	docker exec -it "tempnote-dev" node_modules/.bin/ng test --watch=false --browsers=ChromeHeadless

