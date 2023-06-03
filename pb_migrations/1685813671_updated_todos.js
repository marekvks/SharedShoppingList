migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bmcnlkcet4c313e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "zxd9djtg",
    "name": "page",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "0hokkglvl8a3vkg",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bmcnlkcet4c313e")

  // remove
  collection.schema.removeField("zxd9djtg")

  return dao.saveCollection(collection)
})
