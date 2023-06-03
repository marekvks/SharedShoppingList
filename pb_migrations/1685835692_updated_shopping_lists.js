migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0hokkglvl8a3vkg")

  // remove
  collection.schema.removeField("ziaqajp7")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0hokkglvl8a3vkg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ziaqajp7",
    "name": "ee",
    "type": "editor",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
})
