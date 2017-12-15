/* eslint-disable no-unused-vars */
/* eslint-disable class-methods-use-this */
const { LimitedArray, getIndexBelowMax } = require('./hash-table-helpers');

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  addToTail(key, value) {
    const newNode = {
      next: null,
      value,
    };
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    }
    this.tail.next = newNode;
    this.tail = newNode;
  }
  removeHead() {
    if (this.head === null) return;
    if (this.head.next === null) {
      const head = this.head.next;
      this.head = null;
      this.tail = null;
      return head;
    }
    const head = this.head.value;
    this.head = this.head.next;
    return head;
  }
  contains(value) {
    if (this.head === null) return false;
    const searchLinkedList = (node) => {
      if (node.value === value) return true;
      if (node.next === null) return false;
      return searchLinkedList(node.next);
    };
    return searchLinkedList(this.head);
  }
}

class HashTable {
  constructor(limit = 8) {
    this.limit = limit;
    this.storage = new LimitedArray(this.limit);
    // Do not modify anything inside of the constructor
  }

  resize() {
    this.limit *= 2;
    const oldStorage = this.storage;
    this.storage = new LimitedArray(this.limit);
    oldStorage.each((bucket) => {
      if (!bucket) return;
      bucket.forEach((pair) => {
        this.insert(pair[0], pair[1]);
      });
    });
  }

  capacityIsFull() {
    let fullCells = 0;
    this.storage.each((bucket) => {
      if (bucket !== undefined) fullCells++;
    });
    return fullCells / this.limit >= 0.75;
  }

  // Adds the given key, value pair to the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // If no bucket has been created for that index, instantiate a new bucket and add the key, value pair to that new bucket
  // If the key already exists in the bucket, the newer value should overwrite the older value associated with that key
  insert(key, value) {
    if (this.capacityIsFull()) this.resize();
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index) || new LinkedList();
    // const head = this.head.value;
    // if bucket is empty
    if (this.head === null) {
      bucket.addToTail(key, value);
      return this.storage.set(index, bucket);
    }
    // if there is only one value
    if (this.head === this.tail && this.head.value[0] === key) {
      bucket.splice(0, 1);
      bucket.addToTail(key, value);
      return this.storage.set(index, bucket);
    }
    // if the tail has the value
    if (this.tail.value === value) {
      this.tail = [key, value];
      return;
    }
    // if the key already exists the new value should overwrite the old value;
    while (this.head.next) {
      if (this.head.next.key === key) {
        this.head.next = [key, value];
        return this.head.next;
      }
  }
  // Removes the key, value pair from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Remove the key, value pair from the bucket
  remove(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);

    // if the head has the key delete the key, value pair
    if (this.head.key === key) return this.removeHead();
    // if the tail has the key delete the key, value pair
    if (this.tail.key === key) return this.tail = null;
    // if the key is in the linked list
    while (this.head.next) {
      if (this.head.next.value[0] === key) {
        const node = this.head.next;
        node.previous = node.next;
        // node = null;
        return this.head.next;
      }
    }
  }
  // Fetches the value associated with the given key from the hash table
  // Fetch the bucket associated with the given key using the getIndexBelowMax function
  // Find the key, value pair inside the bucket and return the value
  retrieve(key) {
    const index = getIndexBelowMax(key.toString(), this.limit);
    const bucket = this.storage.get(index);
    // let retrieved;
    // if (bucket) {
    //   retrieved = bucket.filter(item => item[0] === key)[0];
    // }
    // return retrieved ? retrieved[1] : undefined;
  }
}

module.exports = HashTable;
