var express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var router = express.Router()
module.exports = router
var port = process.env.PORT || 5000;

// tell it to use the public directory as one where static files live
express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('postageForm'))
  .use(bodyParser.urlencoded({extended: false}))

// set up a rule that says requests to "/rates" should be handled by the
// handleMath function below
  .get('/rates', jsonParser, handleRates)
// start the server listening
  .listen(port, function() {
  console.log('Node app is running on port', port);
});

function handleRates(request, response) {
  var mailtype = request.query.mail;
  var weight = request.query.weight;
  createPostage(response, mailtype, weight);
}

function createPostage(response, mailtype, weight) {

  var price = 0;
  if (mailtype == "Letters (Stamped)") {
    if (weight < 1) {
      price = 0.55;
    }
    else if (weight < 2) {
      price = 0.70;
    }
    else if (weight < 3) {
      price = 0.85;
    }
    else if (weight >= 3) {
      price = 1.00;
    }
  }
  else if (mailtype== "Letters (Metered)")  {
    if (weight < 1) {
      price = 0.50;
    }
    else if (weight < 2) {
      price = 0.65;
    }
    else if (weight < 3) {
      price = 0.80;
    }
    else if (weight >= 3) {
      price = 0.95;
    }    
  }
  else if (mailtype == "Large Envelopes (Flats)") {
    if (weight < 1) {
      price = 1.00;
    }
    else if (weight < 2) {
      price = 1.15;
    }
    else if (weight < 3) {
      price = 1.30;
    }
    else if (weight < 4) {
      price = 1.45;
    }
    else if (weight < 5) {
      price = 1.60;
    }
    else if (weight < 6) {
      price = 1.75;
    }
    else if (weight < 7) {
      price = 1.90;
    }
    else if (weight < 8) {
      price = 2.05;
    }
    else if (weight < 9) {
      price = 2.20;
    }
    else if (weight < 10) {
      price = 2.35;
    }
    else if (weight < 11) {
      price = 2.50;
    }
    else if (weight < 12) {
      price = 2.65;
    }
    else if (weight >= 12) {
      price = 2.80;
    }
  }
  else if (mailtype == "First-Class Package Service—Retail") {
    if (weight <= 4) {
      price = 3.66;
    }
    else if (weight > 4 && weight <= 8) {
      price = 4.39;
    }
    else if (weight > 8 && weight <= 12) {
      price = 5.19;
    }
    else if (weight > 12) {
      price = 5.71;
    }
  }
  else {
    price = -1;
  }

  	// Set up a JSON object of the values we want to pass along to the EJS result page
	var params = {type: mailtype, weight: weight, price: price};

	// Render the response, using the EJS page "result.ejs" in the pages directory
	// Makes sure to pass it the parameters we need.
	response.render('results', params);
  //end

}