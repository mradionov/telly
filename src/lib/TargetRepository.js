class TargetRepository {
  constructor({ targets = [], onSave = () => {} } = {}) {
    this.targets = targets;
    this.onSave = onSave;
  }

  isEmpty() {
    return this.targets.length === 0;
  }

  add(target) {
    this.targets.push(target);
  }

  update(name, updatedTarget) {
    const targetIndex = this.targets.findIndex(target => target.name === name);
    if (targetIndex === -1) {
      return false;
    }

    const target = this.targets[targetIndex];
    const nextTarget = {
      ...target,
      ...updatedTarget,
    };

    this.targets.splice(targetIndex, 1, nextTarget);

    return true;
  }

  findAll() {
    return this.targets;
  }

  findOneByName(name) {
    return this.targets.find(target => target.name === name);
  }

  save() {
    return this.onSave(this.targets);
  }
}

module.exports = TargetRepository;
