1) git clone project
2) cp .env.example to .env
3) docker-compose up --build
4) docker run --rm -v $(pwd):/app composer install
5) docker-compose exec app bash
6) php artisan key:generate
7) php artisan migrate --seed

### FrontEnd

After [Setup dev environment](https://confluence.gbsfo.com/display/CROW/FrontEnd)

```sh
$ cd pathToProject
$ npm install
$ npm run watch
```

Runs the app in the development mode.
Open [http://localhost/](http://localhost/) to view it in the browser.

Builds the app for production to the `build` folder.
