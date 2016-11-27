# Extract Peaks from Audio File


> Nodejs app to process a sound file, identify peaks

This project provides Node.js code to decode a sound file, identify peaks, and identify beats. There are some sample code available that demonstrate this using HTML5 webaudio api, but this uses a nodejs port of same api.



## How It Works
- Decode audio file (add one to your sounds folder)
- Identify peaks
- Identify beats  


##Running

Start the application. (Note: you need sudo access)

    node beats.js     

# Dependencies List

- [web-audio-api](https://www.npmjs.com/package/web-audio-api) : implementation (partial) of the HTML5 web audio api, used to decode sound files.
- [underscorejs](https://www.npmjs.com/package/underscore) : functional programming helper library for data manipulation.

## License

MIT License
