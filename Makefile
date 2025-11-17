.PHONY: run stop clean _wait setup fresh_setup _test_scripts

help:
	@echo "ℹ️  Available Makefile targets:"
	@echo "  run          # Start containers and waits until ready"
	@echo "  stop         # Stop containers"
	@echo "  clean        # Clean containers and volumes"
	@echo "  setup        # Import demo data"
	@echo "  fresh_setup  # Runs clean, run and setup"

run:
	@test -x ./docker/run.sh || (echo "❌ ./docker/run.sh is not executable! Run chmod +x ./docker/run.sh" && exit 1)
	@./docker/run.sh
	@$(MAKE) -s _wait

stop:
	@echo "⏹️  Stopping containers"
	@docker-compose -f docker/docker-compose.yaml --env-file docker/.env down
	@echo "✅ Containers stopped"

clean:
	@test -x ./docker/clean.sh || (echo "❌ ./docker/clean.sh is not executable! Run chmod +x ./docker/clean.sh" && exit 1)
	@./docker/clean.sh

_wait:
	@test -x ./docker/wait.sh || (echo "❌ ./docker/wait.sh is not executable! Run chmod +x ./docker/wait.sh" && exit 1)
	@./docker/wait.sh

_test_scripts:
	@test -x ./docker/clean.sh || (echo "❌ ./docker/clean.sh is not executable! Run chmod +x ./docker/clean.sh" && exit 1)
	@test -x ./docker/run.sh || (echo "❌ ./docker/run.sh is not executable! Run chmod +x ./docker/run.sh" && exit 1)
	@test -x ./docker/wait.sh || (echo "❌ ./docker/wait.sh is not executable! Run chmod +x ./docker/wait.sh" && exit 1)
	@test -x ./docker/setup.sh || (echo "❌ ./docker/setup.sh is not executable! Run chmod +x ./docker/setup.sh" && exit 1)

setup:
	@test -x ./docker/setup.sh || (echo "❌ ./docker/setup.sh is not executable! Run chmod +x ./docker/setup.sh" && exit 1)
	@./docker/setup.sh

fresh_setup:
	@$(MAKE) -s _test_scripts
	@echo "🔄 Run clean, run, and setup"
	@$(MAKE) -s clean
	@$(MAKE) -s run
	@$(MAKE) -s setup

