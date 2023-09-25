# Contributing to examor

First off, thanks for taking the time to contribute! ❤️

The following is a set of guidelines for contributing to examor. These are mostly guidelines, not rules. Use your best judgment, and feel free to propose changes to this document in a pull request.

## How Can I Contribute?

### Reporting Bugs

Bugs are tracked as GitHub issues. Explain the problem and include additional details to help maintainers reproduce the problem:

- Use a clear and descriptive title for the issue to identify the problem.
- Describe the exact steps which reproduce the problem. Share examples if possible.
- Explain which behavior you expected to see instead and why.

### Suggesting Enhancements

Enhancement suggestions are also tracked as GitHub issues.

- Use a clear and descriptive title for the issue to identify the suggestion.
- Provide a step-by-step description of the suggested enhancement.
- Explain why this enhancement would be useful.

### Pull Requests

- Fork the repo and create your branch from master.
- Make sure your code lints and tests pass.
- Issue pull request linking to the issue it addresses.

## Development Setup

- Fork and clone the repo
- Getting stuff running
  - app(node >= 16)
  ```bash
  cd app
  pnpm install
  pnpm dev
  ```
  - server(python3.11)
  ```bash
  cd server
  pip install -r requirements.txt
  uvicorn main:app --reload --port 51717 --host 0.0.0.0
  ```
  - database
  ```bash
  cd db
  docker build -t test-database .
  docker run -d -p 52020:3306 --name test-database-c test-database
  ```
- Create a branch for your changes
- Make your changes and run tests
- Commit your changes and push your branch
- Submit a PR for review

## Code Style

- 2 spaces for indentation
- 80 character line length
- Use `prettier` & `autopep8` formatting

Feel free to contribute! 🎉
