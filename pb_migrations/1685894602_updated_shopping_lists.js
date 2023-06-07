migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0hokkglvl8a3vkg")

  collection.indexes = [
    "CREATE INDEX `pub_id` ON `shopping_lists` (`pub_id`)"
  ]

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gm7meole",
    "name": "pub_id",
    "type": "number",
    "required": false,
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

  collection.indexes = []

  // remove
  collection.schema.removeField("gm7meole")

  return dao.saveCollection(collection)
})
