const {
  createWaveParameters,
  createMovingWave,
  createColorCycleWave
} = require('rvl-node-animations');

module.exports = async function (context, req) {
  const secretKey = process.env.MY_API_KEY; // you can define this in tthe Azure Portal for your deployment once it's in the Cloud.
  const incomingKey = req.body ? req.body.apiKey : undefined

  if (incomingKey !== secretKey) {
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
