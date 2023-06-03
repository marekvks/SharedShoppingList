migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0hokkglvl8a3vkg")

  collection.name = "shopping_lists"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0hokkglvl8a3vkg")

  collection.name = "shoppingLists"

  return dao.saveCollection(collection)
})
