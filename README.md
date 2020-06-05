# uppgift 3

## Beskrivning
Som tredje uppgift har jag valt att skapa en webbapplikation som hämtar recept för drinkar från ett API. Pakethantering har skett med NPM och applikationen har versionshanterats här på GitHub. Applikationen använder sig av JS-ramverket Vue tillsammans med officiella plugins.

### Vue
* Vuex
* Vue-Router

### Externa bibliotek
* VueDraggable + Sortable.js: för sortering av sparade drinkrecept
* MaterializeCSS: (med JS-funktionalitet)
* Axios: för hämtning av data från API:et
* Vue2Filters för kraftfull filtrering av drinkar

### Routes i webbapplikationen:

```
/drinks
```
(Hemsida, här söker man på drinkar och får resultat i ett rutnät)

```
/drinks/{drink id-nummer}
```
Här visas detaljerad information om drinken och dess recept upp

```
/favorites
```
Här visas sparade drinkrecept. Användare kan aktivera sorteringsläget för att ändra på receptens ordning.

## Klona ner projektet
```
git clone https://github.com/97danne97/flerplattform-uppgift-3
```

## Hämta nödvändiga paket
```
npm install
```

### Kompilerar automatiskt vid sparning under utveckling
```
npm run serve
```

### Kompilerar och miniferar för produktion
```
npm run build
```

### Licens
Projektet använder sig av licensen MIT.
