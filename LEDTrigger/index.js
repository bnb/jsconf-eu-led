const {
  createWaveParameters,
  createMovingWave,
  createColorCycleWave
} = require('rvl-node-animations');

module.exports = async function (context, req) {
  const key = process.env.MY_API_KEY;
  if (req.body.apiKey !== key) {
    context.log('Invalid API key');
    context.res = {
      status: 400,
      body: 'Not authorized'
    }
    return;
  }
  context.log('Successfully authorized, sending animation parameters');
  const body = {
    waveParameters: createWaveParameters(
      // Create a moving wave
      createMovingWave(180, 255, 8, 1),


      // Create a fully opaque, slow color cycle that will show throw the cyan wave
      createColorCycleWave(2, 255)
    )
  };
  context.res = { body };
  context.done();
};
