'use strict'; // strict mode

import { Low } from "lowdb"; // imports the lowdb database class
import { JSONFile } from "lowdb/node"; // imports the adapter to store data in a json file

class JsonStore { // defines a class for managing json storage
  constructor(file, defaults) { // constructor runs when a new jsonstore object is created
    this.db = new Low(new JSONFile(file), defaults); // creates a lowdb instance using the json file and default structure
    this.db.read(); // reads the json file data into memory
  }

  findAll(collection) { // function that returns all items in a specified collection
    return this.db.data[collection]; // accesses the collection in the database and returns it
  }

  findBy(collection, filter) { // function that finds items in a collection using a filter condition
    const results = this.db.data[collection].filter(filter); // filters the collection using the provided function
    return results; // returns the filtered results
  }

findOneBy(collection, criteria) { // function that finds a single item in a collection matching a object
  const items = this.db.data[collection] || []; // retrieves the collection or uses an empty array if it doesn't exist
  const key = Object.keys(criteria)[0]; // gets the property name from the object
  const value = criteria[key]; // gets the value associated with that property
  return items.find(item => item[key] === value); // returns the first item where the property matches the value
}

  async addCollection(collection, obj) { // adds a new object to a collection
    this.db.data[collection].push(obj); // pushes the object into the collection array
    await this.db.write(); // writes the updated data back to the json file
  }

  async addItem(collection, id, arr, obj) { // adds an item to a array inside a collection object
    const data = this.db.data[collection].filter((c) => c.id === id); // finds the parent object in the collection using its id
    data[0][arr].push(obj); // pushes the new object into the specified nested array
    await this.db.write(); // saves the updated data to the json file
  }

  async removeCollection(collection, obj) { // removes an object from a collection
    const index = this.db.data[collection].indexOf(obj); // finds the index of the object inside the collection
    if (index > -1) { // checks if the object exists in the collection
      this.db.data[collection].splice(index, 1); // removes the object from the array
    }
    await this.db.write(); // writes the updated database back to the file
  }

  async removeItem(collection, id, arr, itemId) { // removes an item from a nested array within a collection object
    const data = this.db.data[collection].filter((c) => c.id === id); // finds the parent object using its id
    const item = data[0][arr].filter((i) => i.id === itemId); // finds the nested item using its id
    const index = data[0][arr].indexOf(item[0]); // gets the index of the nested item
    if (index > -1) { // checks if the item exists
      data[0][arr].splice(index, 1); // removes the item from the nested array
    }
    await this.db.write(); // saves the changes to the json file
  }

  async editCollection(collection, id, obj) { // updates an existing object in a collection
    let index = this.db.data[collection].findIndex((c) => c.id === id); // finds the index of the object with the matching id
    if (index > -1) { // checks if the object exists
      this.db.data[collection].splice(index, 1, obj); // replaces the old object with the new one
    }
    await this.db.write(); // writes the updated data to the json file
  }

  async editItem(collection, id, itemId, arr, obj) { // updates an item inside a nested array
    const data = this.db.data[collection].filter((c) => c.id === id); // finds the parent object using its id
    let index = data[0][arr].findIndex((i) => i.id === itemId); // finds the index of the nested item
    data[0][arr].splice(index, 1, obj); // replaces the old nested item with the new object
    await this.db.write(); // saves the updated database to the json file
  }
}

export default JsonStore; // exports the jsonstore class so it can be used in other files