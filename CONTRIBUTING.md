---
title: Contributing
id: contributing
---

# Contributing

## Questions

If you have questions about implementation details, help or support, then please use our dedicated community forum at [Github Discussions](https://github.com/tanstack/react-table/discussions) **PLEASE NOTE:** If you choose to instead open an issue for your question, your issue will be immediately closed and redirected to the forum.

## Reporting Issues

If you have found what you think is a bug, please [file an issue](https://github.com/tanstack/react-table/issues/new). **PLEASE NOTE:** Issues that are identified as implementation questions or non-issues will be immediately closed and redirected to [Github Discussions](https://github.com/tanstack/react-table/discussions)

## Suggesting new features

If you are here to suggest a feature, first create an issue if it does not already exist. From there, we will discuss use-cases for the feature and then finally discuss how it could be implemented.

## Development

Before proceeding with development, ensure you match one of the following criteria:

- Fixing a small bug
- Fixing a larger issue that has been previously discussed and agreed-upon by maintainers
- Adding a new feature that has been previously discussed and agreed-upon by maintainers

## Development Workflow

- Fork this repository, we prefer the `feat-*` branch name style
- Ensure you have `yarn` installed
- Install projects dependencies and linkages by running `yarn`
- Auto-build and auto-test files as you edit by running `yarn dev`
- Implement your changes and tests
- To run examples, follow their individual directions. Usually this includes:
  - Installing dependencies with `yarn`
  - Starting the dev server with `yarn start`
- To test in your own projects:
  - Build/watch for changes with `yarn build`/`yarn dev`
  - Link the appropriate package eg. `yarn link @tanstack/react-table`
- Document your changes in the appropriate documentation website markdown pages
- Commit your work and open a pull request
- Submit PR for review

## Adding a new example

- Clone an existing example into the appropriate `examples` directory
- Name it the example name in kebab-case
- Update the new example's package.json to match the new example name and any other details
- Check dependencies for unused packages
- Install any additional packages to the exmaple that you may need
- Add the example to the workspace packages array in `package.json`
- Add the example to the `tsconfig.json` file for type checking
- Commit the example eg. `examples: Add example-name`
