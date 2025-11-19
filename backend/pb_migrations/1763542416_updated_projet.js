/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1728504295")

  // update field
  collection.fields.addAt(5, new Field({
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
      "Gestion de projet",
      "Réalisation vidéo"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1728504295")

  // update field
  collection.fields.addAt(5, new Field({
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
  }))

  return app.save(collection)
})
