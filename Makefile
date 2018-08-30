all: lint build readme v10.

lint:
	npm run lint

build:
	npm run build

doc:
	jsdox src

readme:
	markedpp --githubid -i README.md -o README.md

test: v6. v8. v10.

v%:
	n $@ && npm test

.PHONY: all, test, lint, build
