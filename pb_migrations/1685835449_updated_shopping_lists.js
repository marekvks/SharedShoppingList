migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0hokkglvl8a3vkg")

  collection.indexes = []

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "byqjisjv",
    "name": "public_id",
    "type": "number",
    "required": true,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0hokkglvl8a3vkg")

  collection.indexes = [
    "CREATE INDEX `idx_GVtKoIW` ON `shopping_lists` (`public_id`)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "byqjisjv",
    "name": "public_id",
    "type": "number",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null
    }
  }))

  return dao.saveCollection(collection)
})
