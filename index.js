'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')

const app = express()

app.set('port', (process.env.PORT || 5000))

// Allows us to process the data
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//ROUTES

app.get('/', function(req, res) {
	// res.send("Hi I am a chatbot")
	res.send("JaredGutierrez")

})




//Facebook


let token = "EAATZAJ36ZCgdsBAEZCgrF9bs76KEOAVgh8cJ6raksLOILGRnFZAam7PZCwH08RrWsNjQJg1Dz2fLaGviZC8NvarFDlGFrsromhOanmwmZCaEOuCyaf0he0W1ZCbwS1AFxx5IWydbTYm8ZBIQCAq8axn2BxsHoNyZA5BKFiRNnWfZB0rBQZDZD"

app.get('/webhook/', function(req, res) {
	if (req.query['hub.verify_token'] === "JaredGutierrez") {
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
			let myInt = Math.floor((Math.random() * 10) + 1);
			if (myInt < 2) {
				sendText(sender, "It is certain.")
			} else if (myInt < 4) {
				sendText(sender, "It is decidedly so.")
			} else if (myInt < 6) {
				sendText(sender, "As I see it, yes")
			} else if (myInt < 8) {
				sendText(sender, "Ask again later")
			} else if (myInt < 10) {
				sendText(sender, "Don't count on it")
			} else {
				sendText(sender, "Text echo: " + text.substring(0,100))
			}
		}
	}
	res.sendStatus(200)
})

app.listen(app.get('port'), function() {
	console.log("running: port")
})

// var x = "EAATZAJ36ZCgdsBAEZCgrF9bs76KEOAVgh8cJ6raksLOILGRnFZAam7PZCwH08RrWsNjQJg1Dz2fLaGviZC8NvarFDlGFrsromhOanmwmZCaEOuCyaf0he0W1ZCbwS1AFxx5IWydbTYm8ZBIQCAq8axn2BxsHoNyZA5BKFiRNnWfZB0rBQZDZD"