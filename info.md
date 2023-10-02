Tässä on selitys kustakin mainitsemastasi tiedostosta ja niiden yleisistä tehtävistä tyypillisessä web-sovelluksen taustalla (backend) projektille:

app.js: Tämä on yleensä pääsovellustiedosto, joka käynnistää web-sovelluksesi. Se yhdistää ja konfiguroi eri osat, kuten reitityksen, palvelimet ja middlewaret (esimerkiksi Express.js-sovelluksissa). Se myös määrittää kuuntelijan (usein HTTP-palvelimen), joka odottaa ja reagoi saapuviin HTTP-pyyntöihin.

const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
res.send('Tervetuloa web-sovellukseen!');
});

app.listen(port, () => {
console.log(`Sovellus kuuntelee porttia ${port}`);
});

router (reititys): Reititys (router) on tiedosto, joka määrittelee, miten HTTP-pyynnöt ohjataan eri polkuille tai reiteille sovelluksessasi. Se kertoo sovellukselle, mitä toimintoja suorittaa, kun tietty polku pyydetään. Tämä auttaa organisoimaan sovelluksesi koodia ja reagoimaan eri pyyntöihin oikein.

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
res.send('Tämä on päänäkymä');
});

router.get('/tuotteet', (req, res) => {
res.send('Näytä kaikki tuotteet');
});

module.exports = router;

model.config: Tämä tiedosto liittyy yleensä tietokantaan tai muihin tietojen tallennusjärjestelmiin. Siinä määritellään tietokantayhteydet, mallien (models) rakenteet ja muut asetukset, jotka liittyvät tietojen tallentamiseen ja haun tekemiseen tietokannasta.

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/minutietokanta', {
useNewUrlParser: true,
useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Tietokantavirhe:'));
db.once('open', () => {
console.log('Tietokantayhteys avattu');
});

env (ympäristömuuttujat): Tämä tiedosto voi sisältää ympäristömuuttujia, kuten tietokantapalvelimen osoitteen, salasanat ja muita salaisia avaimia. Ympäristömuuttujat eristetään yleensä sovelluksen koodista ja tallennetaan erilliseen tiedostoon turvallisuussyistä. Näitä tietoja voidaan sitten lukea ja käyttää sovelluksen eri osissa.
DB_CONNECTION_STRING=mongodb://localhost/minutietokanta
SECRET_KEY=mysecretkey

controllers (kontrollerit): Kontrollerit ovat tiedostoja tai osia sovelluksesta, jotka käsittelevät liiketoiminnan logiikkaa. Ne vastaanottavat pyynnöt reititykseltä, käsittelevät niitä, kutsuvat tarvittaessa tietokantamalleja ja palauttavat vastauksen, joka voidaan lähettää takaisin käyttäjälle. Kontrollerit auttavat erottamaan sovelluksen toimintalogiikan reitityksestä ja parantavat sovelluksen ylläpidettävyyttä.

const Tuote = require('../models/tuote.model');

exports.naytaKaikkiTuotteet = (req, res) => {
Tuote.find((err, tuotteet) => {
if (err) {
console.error(err);
} else {
res.render('tuotteet', { tuotteet: tuotteet });
}
});
};

validator (validointi): Validointi voi olla osa sovelluksen kontrollereita tai olla oma erillinen osansa. Validointi tarkistaa saapuvat tiedot, kuten käyttäjän syötteet, ja varmistaa, että ne ovat oikeassa muodossa ja täyttävät tiettyjä ehtoja. Tämä auttaa suojaamaan sovellusta virheiltä ja turvallisuusuhkilta.

Nämä tiedostot ja komponentit yhdessä muodostavat tyypillisen web-sovelluksen backendin ja auttavat organisoimaan koodia, erottamaan vastuualueet ja pitämään sovelluksen rakenteen järjestäytyneenä ja ylläpidettävänä. Jokaisen projektin vaatimukset ja organisaatio voivat vaihdella, mutta nämä ovat yleisiä osia monissa backend-projekteissa.

const { body, validationResult } = require('express-validator');

exports.tarkistaKayttajatiedot = [
body('kayttajanimi').isLength({ min: 5 }).withMessage('Käyttäjänimen tulee olla vähintään 5 merkkiä pitkä'),
body('salasana').isLength({ min: 8 }).withMessage('Salasanan tulee olla vähintään 8 merkkiä pitkä'),
];

exports.kasitteleRekisterointi = (req, res) => {
const virheet = validationResult(req);
if (!virheet.isEmpty()) {
return res.status(400).json({ virheet: virheet.array() });
}
// Tässä voit käsitellä rekisteröinnin tietokantaan tallentamisen jne.
};
