var router = require("express").Router();

// Responds with the message supplied by the client
function echo(req, res) {
  var message = req.query.message; // Gets the message parameter
  console.log(message);
  var success = true; // Everything went well server-side
  // Respond wih JSON
  if(success) {
    res.status(200).json({
      result: message
    });
  } else {
    res.status(400).json({
      error: "Something went wrong"
    });
  }
}

router.get("/echo", echo);
module.exports = router;