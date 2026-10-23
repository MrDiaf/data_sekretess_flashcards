PORT ?= 8080
HOST ?= 127.0.0.1
RUNTIME := .runtime
PID := $(RUNTIME)/server.pid

# php -S mirrors the server; python3 is a fallback since the site is static.
SERVER := $(shell command -v php >/dev/null 2>&1 && echo php || (command -v python3 >/dev/null 2>&1 && echo python3))

.PHONY: help up down status test

help: ## Show this help
	@echo "Available commands:"
	@echo
	@grep -E '^[a-z]+:.*## ' $(MAKEFILE_LIST) | awk -F':.*## ' '{printf "  make %-8s %s\n", $$1, $$2}'

up: ## Start the local dev server on http://127.0.0.1:8080
	@if [ -z "$(SERVER)" ]; then echo "PHP (or python3) is required to run the local server. Install one and retry \`make up\`."; exit 1; fi
	@mkdir -p $(RUNTIME)
	@if [ -f $(PID) ] && kill -0 $$(cat $(PID)) 2>/dev/null; then \
		echo "Already running: http://$(HOST):$(PORT)/"; exit 0; fi; \
	if [ "$(SERVER)" = php ]; then \
		nohup php -S $(HOST):$(PORT) -t . router.php >$(RUNTIME)/server.log 2>&1 & echo $$! >$(PID); \
	else \
		nohup python3 -m http.server $(PORT) --bind $(HOST) >$(RUNTIME)/server.log 2>&1 & echo $$! >$(PID); \
	fi; \
	sleep 0.5; \
	if kill -0 $$(cat $(PID)) 2>/dev/null; then \
		echo "Running ($(SERVER)): http://$(HOST):$(PORT)/"; echo "Run \`make help\` for available commands."; \
	else \
		echo "Server failed to start, see $(RUNTIME)/server.log"; rm -f $(PID); exit 1; fi

down: ## Stop the local dev server
	@if [ -f $(PID) ] && kill -0 $$(cat $(PID)) 2>/dev/null; then kill $$(cat $(PID)) && echo "Stopped."; else echo "Not running."; fi
	@rm -f $(PID)

status: ## Show whether the dev server is running
	@if [ -f $(PID) ] && kill -0 $$(cat $(PID)) 2>/dev/null; then echo "Running: http://$(HOST):$(PORT)/"; else echo "Not running."; fi

test: ## Syntax-check the JS/PHP and validate the card data
	@if command -v node >/dev/null 2>&1; then \
		node --check assets/app.js && node --check assets/cards.js && node tests/check-cards.js; \
	else echo "node not found, skipping JS checks"; fi
	@if command -v php >/dev/null 2>&1; then php -l router.php; else echo "php not found, skipping php -l"; fi
