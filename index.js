require('./site/index.html');
require('./site/style.css');
const fxController = require('./site/LiveFx/liveFxController.js');
global.DEBUG = false;

const url = "ws://localhost:8011/stomp";
const client = Stomp.client(url);
client.debug = function(msg) {
  if (global.DEBUG) {
    console.info(msg)
  }
};

function connectCallback() {
    client.subscribe('/fx/prices', function(message) {
      fxController.refresh(JSON.parse(message.body));
    });
}

client.connect({}, connectCallback, function(error) {
  alert(error.headers.message)
});
