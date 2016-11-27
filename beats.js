var AudioContext = require('web-audio-api').AudioContext
context = new AudioContext
var fs = require('fs')
var exec = require('child_process').exec;
var _ = require('underscore');

var pcmdata = [] ;

//Note: I have no rights to these sound files and they are not created by me.
//You may downlaod and use your own sound file to further test this.
//
var soundfile = "sounds/tiger.wav"
decodeSoundFile(soundfile);

/**
 * [decodeSoundFile Use web-audio-api to convert audio file to a buffer of pcm data]
 * @return {[type]} [description]
 */
function decodeSoundFile(soundfile){
  console.log("decoding mp3 file ", soundfile, " ..... ")
  fs.readFile(soundfile, function(err, buf) {
    if (err) throw err
    context.decodeAudioData(buf, function(audioBuffer) {
      console.log(audioBuffer.numberOfChannels, audioBuffer.length, audioBuffer.sampleRate, audioBuffer.duration);
      pcmdata = (audioBuffer.getChannelData(0)) ;
      samplerate = audioBuffer.sampleRate;
      maxvals = [] ; max = 0 ;
      playsound(soundfile)
      findPeaks(pcmdata, samplerate)
    }, function(err) { throw err })
  })
}


/**
 * [findPeaks Naive algo to identify peaks in the audio data, and wave]
 * @param  {[type]} pcmdata    [description]
 * @param  {[type]} samplerate [description]
 * @return {[type]}            [description]
 */
function findPeaks(pcmdata, samplerate){
  var interval = 0.05 * 1000 ; index = 0 ;
  var step = Math.round( samplerate * (interval/1000) );
  var max = 0 ;
  var prevmax = 0 ;
  var prevdiffthreshold = 0.3 ;

  //loop through song in time with sample rate
  var samplesound = setInterval(function() {
    if (index >= pcmdata.length) {
      clearInterval(samplesound);
      console.log("finished sampling sound")
      return;
    }

    for(var i = index; i < index + step ; i++){
      max = pcmdata[i] > max ? pcmdata[i].toFixed(1)  : max ;
    }

    // Spot a significant increase? Potential peak
    bars = getbars(max) ;
    if(max-prevmax >= prevdiffthreshold){
      bars = bars + " == peak == "
    }

    // Print out mini equalizer on commandline
    console.log(bars, max )
    prevmax = max ; max = 0 ; index += step ;
  }, interval,pcmdata);
}

/**
 * TBD
 * @return {[type]} [description]
 */
function detectBeats(){

}

/**
 * [getbars Visualize image sound using bars, from average pcmdata within a sample interval]
 * @param  {[Number]} val [the pcmdata point to be visualized ]
 * @return {[string]}     [a set of bars as string]
 */
function getbars(val){
  bars = ""
  for (var i = 0 ; i < val*50 + 2 ; i++){
    bars= bars + "|";
  }
  return bars ;
}

/**
 * [Plays a sound file]
 * @param  {[string]} soundfile [file to be played]
 * @return {[type]}           [void]
 */
function playsound(soundfile){
  // linux or raspi
  // var create_audio = exec('aplay'+soundfile, {maxBuffer: 1024 * 500}, function (error, stdout, stderr) {
  var create_audio = exec('ffplay -autoexit '+soundfile, {maxBuffer: 1024 * 500}, function (error, stdout, stderr) {
    if (error !== null) {
      console.log('exec error: ' + error);
    }else {
      //console.log(" finshed ");
      //micInstance.resume();
    }
  });
}
