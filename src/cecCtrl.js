const CecController = require('cec-controller');

const cecController = new CecController();

let initializedCecController = null;
function setControllerReady(controller) {
  initializedCecController = controller;
}

cecController.on('ready', setControllerReady);
cecController.on('error', console.error);

module.exports = async function cecCtrl() {

  async function checkReady() {
    return new Promise((res) => setTimeout(async () => {
      if (initializedCecController) { return res(initializedCecController); }
      return await checkReady();
    }, 1000));
  }

  return await checkReady();
};
