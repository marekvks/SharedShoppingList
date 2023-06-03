migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bmcnlkcet4c313e")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "z01jbdxj",
    "name": "done",
    "type": "bool",
    "required": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bmcnlkcet4c313e")

  // remove
  collection.schema.removeField("z01jbdxj")

  return dao.saveCollection(collection)
})
