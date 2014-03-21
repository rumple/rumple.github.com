var recognizing = false;
var ignore_onend;
if (!('webkitSpeechRecognition' in window)) {
	alert("Your browser does not support voice API")
} else {
  var recognition = new webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = false;

  recognition.onstart = function() {
    recognizing = true;
  };

  recognition.onerror = function(event) {
    if (event.error == 'no-speech') {
      ignore_onend = true;
    }
    if (event.error == 'audio-capture') {
      ignore_onend = true;
    }
    if (event.error == 'not-allowed') {
      ignore_onend = true;
    }
  };

  recognition.onend = function() {
    recognizing = false;
  };

  recognition.onresult = function(event) {
	var result = event.results[event.results.length - 1];
	var text = result[0].transcript;
	console.log(result[0].transcript);

	if (text.indexOf("up") != -1) {
		movecallback(0);
	} else if (text.indexOf("right") != -1) {
		movecallback(1);
	} else if (text.indexOf("down") != -1) {
		movecallback(2);
	} else if (text.indexOf("left") != -1) {
		movecallback(3);
	} else if (text.indexOf("restart") != -1) {
		restartcallback();
	}
  };
}

function startButton(event) {
  if (recognizing) {
    recognition.stop();
    return;
  }
  recognition.start();
  ignore_onend = false;
}

function VoiceInputManager() {
}

var movecallback;
var restartcallback;

VoiceInputManager.prototype.on = function (event, callback) {
	if (event == "move") {
		movecallback = callback;
	} else if (event == "restart") {
		restartcallback = callback;
	}
};


