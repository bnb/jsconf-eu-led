const {
  createWaveParameters,
  createMovingWave,
  createColorCycleWave
} = require('rvl-node-animations');

/*

If you want to just submit different colors and patterns,
you only need to edit this call to createWaveParameters.

To learn more about the API of rvl-node-animations, see:
https://github.com/nebrius/rvl-node-animations

*/

const ledPatternThatWillRender = createWaveParameters(
  // Create a moving wave
  createMovingWave(180, 255, 8, 1),

  // Create a fully opaque, slow color cycle that will show throw the cyan wave
  createColorCycleWave(2, 255)
);

module.exports = async function (context, req) {
  const secretKey = process.env.MY_API_KEY; // you can define this in tthe Azure Portal for your deployment once it's in the Cloud.
  const incomingKey = req.body ? req.body.apiKey : undefined

  // Checks to make sure that if a key is provided it is the correct one, and handles the case where that is not true.
  if (secretKey && incomingKey !== secretKey) {
    context.log('Invalid API key');
    context.res = {
      status: 400,
      body: 'Not authorized'
    }
    return;
  }
  
  context.log('Successfully authorized, sending animation parameters');
  
  const body = {
    waveParameters: ledPatternThatWillRender
  };
  
  context.res = { body };
  context.done();
};
