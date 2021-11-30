jest.mock('cec-controller');
const CecController = require('cec-controller');
const cecCtrl = require('./cecCtrl');

describe('cecCtrl', () => {
  it('should work when ready', async () => {
    CecController.hooks.events.ready();
    const results = await cecCtrl();
    expect(results).toBe(CecController.hooks.initializedCecController);
  });

  it('should wait on ready', async () => {
    setTimeout(() => CecController.hooks.events.ready(), 1000);
    const results = await cecCtrl();
    console.log(results);
    expect(results).toBe(CecController.hooks.initializedCecController);
  });
});
