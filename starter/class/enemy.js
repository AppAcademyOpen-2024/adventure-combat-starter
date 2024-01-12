const {Character} = require('./character');

class Enemy extends Character {
  constructor(name, description, currentRoom) {
    // Fill this in
    super(name, description, currentRoom);
    this.cooldown = 3000;
    this.attackTarget = null;
    this.health = 50;
  }

  setPlayer(player) {
    this.player = player;
  }

  randomMove() {
    // Fill this in
    const exits = this.currentRoom.getExits();
    const random = Math.floor(Math.random() * exits.length);
    this.currentRoom = this.currentRoom.getRoomInDirection(exits[random]);
    this.cooldown = 3000;
  }

  takeSandwich() {
    // Fill this in
    const sandwich = this.currentRoom.getItemByName('sandwich');
    if (sandwich) {
      const index = this.currentRoom.items.indexOf(sandwich);
      this.currentRoom.items.splice(index, 1);
      this.items.push(sandwich);
    }
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = () => {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    // Fill this in
    this.attackTarget.applyDamage(this.strength);
    console.log(`${this.name} attacked you! Your health is ${this.attackTarget.health}`);
    this.cooldown = 3000;
  }

  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
    } else if (this.cooldown > 0) {
      this.rest();
    }
    else if (this.attackTarget !== null && this.attackTarget.currentRoom === this.currentRoom) {
      this.attack();
    } else {
      this.scratchNose();
    }
    this.rest();
  }

  scratchNose() {
    this.cooldown += 3000;
    this.alert(`${this.name} scratches its nose`);
  }
}

module.exports = {
  Enemy,
};
