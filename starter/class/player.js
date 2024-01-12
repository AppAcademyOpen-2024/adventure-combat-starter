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
    console.log(`You picked up the ${itemName}`);
  }

  dropItem(itemName) {
    // Fill this in
    const item = this.getItemByName(itemName);
    this.items = this.items.filter((i) => i.name !== itemName);
    this.currentRoom.items.push(item);
    console.log(`You dropped the ${itemName}`);
  }

  eatItem(itemName) {
    // Fill this in
    const item = this.getItemByName(itemName);
    if (item instanceof Food) {
      // Add health?
      this.health += 50;
      this.items = this.items.filter((i) => i.name !== itemName);
      console.log(`You ate the ${itemName} and restored 50 health`);
    }
  }

  getItemByName(name) {
    // Fill this in
    return this.items.find((item) => item.name === name);
  }

  hit(name) {
    // Fill this in
    const enemy = this.currentRoom.getEnemyByName(name);
    if (enemy) {
      enemy.applyDamage(this.strength);
      console.log(`Attacked the ${enemy.name}! Enemy health is ${enemy.health}`);
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
