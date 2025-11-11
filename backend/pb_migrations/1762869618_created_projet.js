/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text4286007220",
        "max": 0,
        "min": 0,
        "name": "titre",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "select1742040349",
        "maxSelect": 1,
        "name": "etude_annee",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "BUT MMI 1",
          "BUT MMI 2",
          "BUT MMI 3"
        ]
      },
      {
        "hidden": false,
        "id": "date1966353017",
        "max": "",
        "min": "",
        "name": "projet_annee",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
        "hidden": false,
        "id": "select989021800",
        "maxSelect": 4,
        "name": "categories",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "Design graphique",
          "Développement web",
          "Communication",
          "Gestion de projet"
        ]
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1623314592",
        "max": 0,
        "min": 0,
        "name": "resume",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text1843675174",
        "max": 0,
        "min": 0,
        "name": "description",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "select3662524634",
        "maxSelect": 10,
        "name": "outils",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "select",
        "values": [
          "Illustrator",
          "Figma",
          "Photoshop",
          "Krita",
          "Javascript",
          "TailwindCSS",
          "Astro",
          "Wordpress",
          "Notion",
          "Miro"
        ]
      },
      {
        "hidden": false,
        "id": "file3760176746",
        "maxSelect": 99,
        "maxSize": 0,
        "mimeTypes": [],
        "name": "images",
        "presentable": false,
        "protected": false,
        "required": false,
        "system": false,
        "thumbs": [],
        "type": "file"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_1728504295",
    "indexes": [],
    "listRule": null,
    "name": "projet",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1728504295");

  return app.delete(collection);
})
