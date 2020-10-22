.PHONY: start_neo4j
start_neo4j:
	neo4j start

.PHONY: setup
setup:
	if ! which install-peerdeps 2>/dev/null; then npm install -g install-peerdeps; fi
	npm install

.PHONY: install_all_peer_dependencies
install_all_peer_dependencies: setup
	rm -f peerDeps.txt
	for packName in $$(cat package.json | jq -r '.dependencies | keys[]' | tr '\n' ' '); do \
		npm info "$${packName}@latest" peerDependencies --json | jq -r '. | keys[]' >> peerDeps.txt; \
	done
	for packName in $$(cat package.json | jq -r '.devDependencies | keys[]' | tr '\n' ' '); do \
		npm info "$${packName}@latest" peerDependencies --json | jq -r '. | keys[]' >> peerDeps.txt; \
	done
	cat peerDeps.txt | sort | uniq > peerDepsUniq.txt
	while read -r peerDep; do \
		if ! npm list $${peerDep} 2>/dev/null; then \
			npm install --save-dev "$${peerDep}@latest"; \
		fi; \
	done < peerDepsUniq.txt
	rm -f peerDeps.txt peerDepsUniq.txt