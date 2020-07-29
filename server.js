const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

const routes = require('./src/server/main.js');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/reminder', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/',routes);


if (process.env.NODE_ENV === 'production') {
    app.use(express.static('build'));
	app.get('*',(req,res) => {
		res.sendFile(path.join(__dirname,'build','index.html'));
	});
}

app.listen(PORT,() => {
	console.log(`Server Listening on port ${PORT}`);
});