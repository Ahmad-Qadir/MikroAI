const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const MikroNode = require('mikronode-ng');
const bodyParser = require('body-parser')

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI("API KEY"); // Replace with your API key

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.use(express.static('public')); // serve frontend from /public folder




io.on('connection', (socket) => {
  console.log('✅ User connected');

  socket.on('userMessage', async (msg) => {

    app.post('/operate', (req, res) => {

      var input = req.body.code.replace("<br>", "").replace("<br>", "");

      const jsonStr = input.replace(/'/g, '"');

      const arr = JSON.parse(jsonStr);

      console.log(req.body.code)

      MikroNode.getConnection("XXIPADDRESSXX", "XUSERNAMEX", "XPASSWORDX", {
        timeout: 3, closeOnTimeout: true, closeOnDone: true
      }).connect(function (con) {
        var terminal = con.openChannel();
        terminal.write(arr, function (a) {
          terminal.on('done', function (data) {
            var parsed = MikroNode.parseItems(data);
            parsed.forEach(function (item) {
              socket.emit('botReply', item);
            });
          });

          terminal.once('trap', function (trap, terminal) {
            socket.emit('botReply', trap);
          });
          terminal.once('error', function (err, terminal) {
            socket.emit('botReply', err);
          });
        });
      });


    });




    let reply = '';

    // Use the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = msg + " in mikrotik,Answer in 1-2 short sentences max. Be concise. and only answer questions based on mikrotik brand and show only code in api format like ['/ip/address/add','=address=192.168.1.1/24','=interface=ether9'،'=dst-address=1.1.1.1']";

    try {
      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();
      reply = text;
    } catch (error) {
      console.error("Error:", error);
    }
    socket.emit('botReply', reply);
  });

  socket.on('disconnect', () => {
    console.log('❌ User disconnected');
  });
});

server.listen(80, () => {
  console.log('🚀 Server running at http://localhost');
});