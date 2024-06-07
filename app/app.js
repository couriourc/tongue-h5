const express = require("express")
const path = require("path")
const fs = require("fs")
const https = require("https")


const app = express()


app.use(express.static(path.join(__dirname, "frontend")))

app.get("/", function (req, res) {
	res.sendFile(path.join(__dirname, "frontend", "index.html"))
})

app.listen(80, () => {
	console.log("http://localhost")
})

try {
	const privateKey = fs.readFileSync("ssl/server.key")
	const certificate = fs.readFileSync("ssl/server.pem")
	const credentials = {key: privateKey, cert: certificate}
	const httpsApp = https.createServer(credentials, app)
	httpsApp.listen(443)
} catch (e) {
	console.debug("NO HTTPS")
}
