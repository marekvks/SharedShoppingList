migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bmcnlkcet4c313e")

  collection.listRule = ""
  collection.updateRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("bmcnlkcet4c313e")

  collection.listRule = null
  collection.updateRule = null

  return dao.saveCollection(collection)
})
