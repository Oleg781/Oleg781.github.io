# Yleiset kommennot:
mkdir (nimi)/(nimi) -> luo kansiot

# Vinkki:
Docker voi myös käynistää

# Frontend käynnistys: 
npm run dev
npm install axios

## Frontend komennot:
npm install vite --save-dev

# Backend käynnistys: 
npx nodemon index.js || npm start

## Backend komennot:
npm init (package.json)
npm install
npm install express --save ->
npm install mysql2 --save -> tietokannan tuki
npm install knex --save ->
npm install bcryptjs --save -> salasanojen hash
npm install dotenv

## Migraatiot:
npx knex migrate:make (nimi) = luo migraatio
npx knex migrate:latest = ajaa migraatiot
npx knex migrate:rollback = peruuta

## Seedit:
npx knex seed:make 01_(nimi) = luo seed
npx knex seed:run = ajaa seed

# Webbiserveri:
node index.js
npm install nodemon --save-dev -> nodemon on parempi kuin node, koska se päivittyy mukavammin

# Parannukset:
- Kuvauksen kenttä pitäisi olla textarea.
- Suodattimien logiikka pitäisi olla parempi. Esim. paikka kentässä on uusi kaupunki ja se lisäytyy suodattimeen samaan aikaan.
- Ajan näyttäminen pitäisi olla tavallisempi.
- Some kentät tulisivat olla "Some:" perään.