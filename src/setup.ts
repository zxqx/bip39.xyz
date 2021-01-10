// @ts-nocheck
import Recorder from 'recorderjs';

let audioCtx;
let recorder;

function startUserMedia(stream) {
  const input = audioCtx.createMediaStreamSource(stream);
  console.log('Media stream created.');

  recorder = new Recorder(input);
  console.log(recorder);
  console.log('Recorder initialised.');
}

export default function setup() {
  try {
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia;
    window.URL = window.URL || window.webkitURL;

    audioCtx = new AudioContext();
    console.log('Audio context set up.');
    console.log('navigator.getUserMedia ' + (navigator.getUserMedia ? 'available.' : 'not present!'));
  } catch (e) {
    alert('No web audio support in this browser!');
  }

  navigator.getUserMedia({ audio: true }, startUserMedia, function(e) {
    console.log('No live audio input: ' + e);
  });
}

export { recorder };
