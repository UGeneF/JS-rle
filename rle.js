function encode(input) {
    var output = "";
    for (var i = 0; i < input.length; i++) {
        if (input[i] === '#') {
            var code = encodeSharp(input, i);
            output += code.substring(1);
            i += code.charCodeAt(0) - 1;
        } else if (input[i] != input[i + 1] && input[i] != '#') {
            output += input[i];
        } else {
            var code = encodeOrdinary(input, i);
            output += code.substring(1);
            i += code.charCodeAt(0) - 1;
        }
    }
    return output;
}

function decode(input) {
    var output = ""
    for (var i = 0; i < input.length; i++) {
        if (input[i] != '#')
            output += input[i];
        else {
            output += decodeTriade(input.substring(i + 1, i + 3));
            i += 2;
        }
    }
    return output;
}

function encodeSharp(input, index) {
    var counter = 1;
    while (index < input.length - 1 && input[index] === input[index + 1] && counter < 255) {
        counter++;
        index++;
    }
    var code = String.fromCharCode(counter);
    code += '#';
    code += String.fromCharCode(counter);
    code += '#';
    return code;
}

function encodeOrdinary(input, index) {
    var counter = 1;
    var i = index;
    while (i < input.length - 1 && input[i] === input[i + 1] && counter < 255) {
        counter++;
        i++;
    }
    var code = String.fromCharCode(counter);
    if (counter > 3) {
        code += '#';
        code += String.fromCharCode(counter);
        code += input[index];
    } else
        for (var n = 0; n < counter; n++)
            code += input[index];
    return code;
}

function decodeTriade(code, index) {
    character = code[1];
    var output = "";
    for (var i = 0; i < code.charCodeAt(0); i++)
        output += character;
    return output;
}


var fs = require("fs");
var command = process.argv;
if (command[2] === "encode") {
    var input = fs.readFileSync(command[3]).toString();
    fs.writeFileSync(command[4], encode(input));
} else {
    var input = fs.readFileSync(command[3]).toString();
    fs.writeFileSync(command[4], decode(input));
}



