class Character {

  constructor(name, description, currentRoom) {
    // Fill this in
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.items = [];
    this.strength = 10;
    this.health = 100;
  }

  applyDamage(amount) {
    // Fill this in
    this.health -= amount;
    if (this.health <= 0) {
      this.die();
    }
  }

  die() {
    // Fill this in
    this.currentRoom.items.push(...this.items);
    this.items = [];
    this.currentRoom = null;
  }

}

module.exports = {
  Character,
};
