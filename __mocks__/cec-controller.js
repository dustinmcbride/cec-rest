const initializedCecController = jest.fn();

const callBacks = {};

const events = {
  ready: () => callBacks.ready(initializedCecController),
};

const hooks = {
  initializedCecController,
  callBacks,
  events,
};

const on = (event, callBack) => {
  callBacks[event] = callBack;
};

class CecController {
  static hooks = hooks;

  constructor() {
    this.on = on;
  }
}

module.exports = CecController;
