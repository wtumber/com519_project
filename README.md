# Dambry

Advanced Database Systems project for Solent University module COM517.

---

## Running the project code

**Please ensure you have first installed installed Node.js and either MongoDB or have an Atlas cluster.**

### Using local MongoDB 

1. Rename .env.local_example to .env.
1. In the terminal: `npm install`
1. In the terminal: `npm run seed`
1. In the terminal: `npm run dev`
1. visit [localhost:2020](http://localhost:2020/).

### Using MongoDB Atlas
1. Rename .env.atlas_example to .env.
1. Change URIs in .env to your cluster admin username and password.
1. In the terminal: `npm install`
1. In the terminal: `npm run seed` (use `npm run seedProduction` for production)
1. In the terminal: `npm run dev`
1. visit [localhost:2020](http://localhost:2020/).

## Seed data
Read the guide.json [documentation](/project_code/create_initial_data/README.md).

## Project Documentation
Read the [project documentation](documentation.md).