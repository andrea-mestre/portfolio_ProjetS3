/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3711015378")

  // update collection data
  collection.createRule = ""

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3711015378")

  // update collection data
  collection.createRule = null

  return app.save(collection)
})
