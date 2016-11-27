# Extract Peaks from Audio File
<img src="/images/beats.gif" width="100%">

> Nodejs app to process a sound file, identify peaks

This project provides Node.js code to decode a sound file, identify peaks, and identify beats. There are some sample code available that demonstrate this using HTML5 webaudio api, but this uses a nodejs port of same api.



## How It Works
- Decode audio file (add one to your sounds folder)
- Identify peaks
- Identify beats  


##Running

Note: To ensure correctness, the sound file is played back while being analyzed. ffmpeg is used to play back sound, and this must be installed. To install ffmpeg on a mac
    brew install ffmpeg

Start the application. (Note: you need sudo access)

    node beats.js     

# Dependencies List

- [web-audio-api](https://www.npmjs.com/package/web-audio-api) : implementation (partial) of the HTML5 web audio api, used to decode sound files.
- [underscorejs](https://www.npmjs.com/package/underscore) : functional programming helper library for data manipulation.

# Next Steps

Beat extraction. The general approach is to identify peaks most repetitive peaks to be indicative of a beat, and then compute inter-peak interval. Two 60 peaks within a 60 second interval might correspond to 60 beats per minute.

## License

MIT License
