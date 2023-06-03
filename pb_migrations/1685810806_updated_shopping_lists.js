migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("0hokkglvl8a3vkg")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vso0zq7h",
    "name": "authors",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
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

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "vso0zq7h",
    "name": "author",
    "type": "relation",
    "required": false,
    "unique": false,
    "options": {
      "collectionId": "_pb_users_auth_",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": null,
      "displayFields": []
    }
  }))

  return dao.saveCollection(collection)
})
