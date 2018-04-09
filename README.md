# pet-match
App to connect people to pets that need adoption

## Hello Team

Branches:
- `master` - Everything ends up here
- `dev` - My own branch, because I'm special
- `tests` - Tests currently reside here. The should obviously be merged into master, but I haven't quite gotten there.
- forks - Everyone else is working on their own fork

## Hello Team

This is our repository. We will fill it with exciting and wonderful things at a feverish pace. Don't forget to `npm install`!

The server runs on port 8080, and there is a .env file that you will need to provide with your local SQL server info/credentials. A schema is included (`/db/schema.sql`) that will create the database for sequelize to use. Sequelize is currently initialized with `{force: true}`. The database will be re-initailized every run so we can freely modify the database structure.

```
# More or less what your .env file should look like. Feel free to copy/paste.
DB_HOST=localhost
DB_USER=root
DB_PORT=3306

# Add password here if applicable, otherwise leave as-is
DB_PASSWORD=
```

## How the fork do we share code? Git gud.

### Fork it

1. Create your own fork of the central repository (https://github.com/snarfblam/pet-match). The fork button is on the top-right of the page. You'll get a copy of the repository on your own account.
2. Clone *your* copy of the repository to your local machine.
2. Add the `upstream` remote
    * A remote is a copy of the repository somewhere other than your local machine.
    * By default git only creates one remote: `origin`. This is where you cloned the repository from (your own github repository).
    * `upstream` is the central repository. You need to add this manually.

      `git remote add upstream git@github.com:snarfblam/pet-match.git`

### Share your code

1. Commit your changes and push them to your own GitHub repository.
2. Open your repository on GitHub and click the "New pull request" button. GitHub will prompt the central repository owner (me) to pull your changes from your repository into the central one.

   **FYI**: any additional changes you push to `origin` *after* submitting a pull request and *before* the pull request is accepted will be included as part of the pull request.


### Pull other people's code into your repository

1. Make sure you've commited all your changes first.
2. Get the latest changes from the central repository like so:

   `git fetch upstream master`

   Git will create a new branch for you with the contents from the central repository named `upstream/master`
3. Merge the new branch with your master branch:

   `git merge upstream/master`

   If it goes without a hitch you're now up to date with the central repository.

### Other stuff

 * Feel free to bug me on slack if my directions for git are inadequate.
 * Best way to avoid merge conflicts is communication. Let people know what you're working on via slack so two people don't try to edit the same code at the same time. 
 * If you notice files are being committed that you do not intend to share, feel free to update the .gitignore file.
