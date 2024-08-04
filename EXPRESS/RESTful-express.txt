RESTful

Representative state transfer

path should be representatavie to the resource given




const express = require("express")
const fs = require("fs/promises")

// get owners/:id - responds with owner
app.get("/owners/:id", 
(req,res) => {
	console.log(req.params.id)
	fs.readFile(__dirname + `data/owners/${id}.json`, 'utf-8')
	.then((stringOwner) => {
		const owner = JSON.parse(stringOwner)
		res.status(200).send({ owner })
	})
	.catch((err) => {
		res.status(400).send({ err })
	})
})

// get /owners - responds with all the relivent owners
app.get("/owners", (req, res) => {
	fs.readdir(__dirname + "/data/owners")
	.then((files) => {
		console.log(files)
		const promisesList = files.map((files) {return fs.readFile(__dirname + `/data/owners/${file}`, "utf-8")})
		return Promise.all(promisesList)
	})
	.then(owners => {
		const parsedOwners = owners.map(owner => JSON.parse(owner))
		res.status(200).send({ owners: parsedOwners })
	})
	.catch((err) => {
		res.status(400).send({ err })
	})
})
