# Format

## Name
Het format van de name op de server zijn als volgt:
```
<bouwprojectnaam-<year>-<lang>.json
```

#### Talen
|Taal|lang|
|-|-|
|Nederlands|nl|
|Engels|en|

## Json format

```json
{
  "name": "<text>",
  "destination": "<dest>",
  "dest-mix": ["housing", "commercial"],
  "begin-year": "<YYYY>",
  "exp-end-year": "<YYYY>",
  "description": "<text>",
  "huur-percentage": "<num>",
  "koop-percentage": "<num>",
  ""
}

```

|attribute|description|type|
|-|-|-|
|name|name of project|text|
|destination|destination of the building|choice: `mixed`, `commercial`, `industry`, `housing`|
|dest-mix|if mixed show give all destinations|text array|






#### informatie
omschrijving
hoogtepunten omgeving (winkels? horica? voorzieningen?)


hoogte(s)
aannemener
architect
aantal woningen
bouwfonds
doelgroep

totaal aantal woningen
Huur:
  Top segment
  Hoog segment
  Midden segment
  Sociaal segment
Koop:
  Top segment
  Hoog segment
  Midden segment




## Requirements
Moet de data van een server kunnen afhalen
moet dynamisch zijn zodat er geen aanpassingen gemaakt moeten worden tussen verschillende content


https://www.woneninrotterdam.nl/project/de-sax/
https://www.woneninrotterdam.nl/nieuws/sax/