migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0hokkglvl8a3vkg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wovll4d2",
    "name": "todos",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "bmcnlkcet4c313e",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0hokkglvl8a3vkg")

  // remove
  collection.schema.removeField("wovll4d2")

  return dao.saveCollection(collection)
})
