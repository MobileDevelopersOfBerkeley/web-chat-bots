'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Routes
app.get('/', function(req, res) {
	res.send("Hi I am a chatbot")
})

let token = "EAAC6Oo4BiZAEBAAtQadSi3l8P4lGZBgoNz4dC7EzdTPVIfc0xdbbdV0RVzZBsS3RdJMu1GvPd71ZB8MoMXm6aRZBiBSyUO5yX6yGNAkwus5cZC3jhEq0jQms7jOxP16ba6MPQXFzEwFRQ7OSXwqmAacflIOzhv001exSa6CZCHfgAZDZD"

// Facebook

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "dummy") {
		res.send(req.query['hub.challenge'])
	}
	res.send("Wrong token")
})

function sendText(sender, text) {
	let messageData = {text: text}
	request({
		url: "https://graph.facebook.com/v2.6/me/messages",
		qs: {access_token: token},
		method: "POST",
		json: {
			recipient: {id: sender},
			message: messageData
		}
	}, function(error, response, body){
		if (error) {
			console.log("sending error")
		} else if (response.body.error) {
			console.log("response body error")
		}
	})
}

app.post('/webhook/', function(req, res) {
	let messaging_events = req.body.entry[0].messaging
	for (let i = 0; i < messaging_events.length; i++){
		let event = messaging_events[i]
		let sender = event.sender.id
		if (event.message && event.message.text) {
			let text = event.message.text
			let answerNum = Math.floor((Math.random() * 10) + 1);
			if (answerNum < 5) {
				sendText(sender, "Heads")

			} else {
				sendText(sender, "Tails")
			}
		}
	}
	res.sendStatus(200)
})

app.listen(app.get('port'), function() {
	console.log("running: port")
})