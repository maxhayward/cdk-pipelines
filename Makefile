STACKPREFIX := CDKPipelines

.PHONY: install build diff deploy bootstrap

install:
	yarn install

build:
	yarn build

diff:
	yarn cdk diff -c stackPrefix=$(STACKPREFIX)

deploy:
	yarn cdk deploy -c stackPrefix=$(STACKPREFIX) --all

bootstrap:
	yarn cdk bootstrap -c stackPrefix=$(STACKPREFIX)
