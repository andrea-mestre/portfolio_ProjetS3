/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1728504295")

  // add field
  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "file1747702602",
    "maxSelect": 99,
    "maxSize": 0,
    "mimeTypes": [],
    "name": "image_resultat",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1728504295")

  // remove field
  collection.fields.removeById("file1747702602")

  return app.save(collection)
})
