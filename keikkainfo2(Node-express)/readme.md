### Backend käynnistys: 
npx nodemon index.js || npm start

### Frontend käynnistys: 
npm run dev

Käynnistä Docker

npm install axios

### Backend komennot:

npm init (package.json)

npm install

npm install express --save ->
npm install mysql2 --save -> tietokannan tuki
npm install knex --save ->

npm install bcryptjs --save -> salasanojen hash

npm install dotenv

## Webbiserveri:
node index.js

npm install nodemon --save-dev -> nodemon on parempi kuin node, koska se päivittyy mukavammin

### Frontend komennot:
npm install vite --save-dev

### Migraatiot:
npx knex migrate:make (nimi) = luo migraatio
npx knex migrate:latest = ajaa migraatiot
npx knex migrate:rollback = peruuta

### Seedit:
npx knex seed:make 01_(nimi) = luo seed
npx knex seed:run = ajaa seed

### Yleiset kommennot:
mkdir (nimi)/(nimi) -> luo kansiot

### Parannukset:
- kuvauksen kenttä pitäisi olla textarea
- suodattimien logiikka pitäisi olla parempi. Esim. paikka kentässä on uusi kaupunki ja se lisäytyy suodattimeen samaan aikaan
- ajan näyttäminen pitäisi olla tavallisempi
- some kentät tulisivat olla "Some:" perään