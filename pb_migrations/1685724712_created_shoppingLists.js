migrate((db) => {
  const collection = new Collection({
    "id": "0hokkglvl8a3vkg",
    "created": "2023-06-02 16:51:52.235Z",
    "updated": "2023-06-02 16:51:52.235Z",
    "name": "shoppingLists",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "y5zefnsv",
        "name": "title",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("0hokkglvl8a3vkg");

  return dao.deleteCollection(collection);
})
