/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mce26e03ki131xv")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "dx8bwpbv",
    "name": "isPdfUploaded",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mce26e03ki131xv")

  // remove
  collection.schema.removeField("dx8bwpbv")

  return dao.saveCollection(collection)
})
