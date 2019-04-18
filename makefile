start_app: ## Run app locally
	lambda-local -l index.js -t 30000 -h handler -e sample/index.js