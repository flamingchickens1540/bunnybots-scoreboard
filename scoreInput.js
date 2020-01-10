const fs = require('fs');
let form = document.getElementById('form');

function input(){

  fs.writeFile('scores.js', ('redScore = "' + form.elements[0].value + '";' + '\n' + 'blueScore = "' + form.elements[1].value + '";'), (err) => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
}
