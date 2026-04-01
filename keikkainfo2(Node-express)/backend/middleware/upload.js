const multer = require('multer');
const path = require('path');

// Määritellään, minne kuvat tallennetaan
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
         // Kuvan nimi on nykyinen aika + tiedostotunniste (vähän turvallisempi lähestymistapa)
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

module.exports = upload;