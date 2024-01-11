const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {
    // Fill this in
    const item = this.currentRoom.getItemByName(itemName);
    this.currentRoom.items = this.currentRoom.items.filter((i) => i.name !== itemName);
    this.items.push(item);
  }

  dropItem(itemName) {
    // Fill this in
    const item = this.getItemByName(itemName);
    this.items = this.items.filter((i) => i.name !== itemName);
    this.currentRoom.items.push(item);
  }

  eatItem(itemName) {
    // Fill this in
    const item = this.getItemByName(itemName);
    if (item instanceof Food) {
      // Add health?
      this.items = this.items.filter((i) => i.name !== itemName);
    }
  }

  getItemByName(name) {
    // Fill this in
    return this.items.find((item) => item.name === name);
  }

  hit(name) {
    // Fill this in
    const enemy = this.currentRoom.getEnemyByName(name);
    console.log('enemy:', enemy);
    if (enemy) {
      console.log('yes enemy');
      enemy.applyDamage(this.strength);
      enemy.attackTarget = this;
    }
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }
}

module.exports = {
  Player,
};
