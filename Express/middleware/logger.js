const { response } = require("express");

const logger = (req, res, next) =>  {
    // console.log(` ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    console.log("run");
    next();
}

module.exports = logger;

/*
middleware hai wo ese functions hoto hai joki request and response ko access kar sakte hai.
middleware create karne ke liye ham request , response and next paramater ko callback function me pass karte hai
next yani ki hame koi next middleware ko call karna ho to ham kar sakte hai.

middleware ko access karne ke liye ham .use() method ka use karte hai
*/