const express = require('express');
// Initialising app variable for express
const app = express();
// endpoint for testing
app.get('/', (req, res) => res.send('API Running'));
// Setting Port tobe an environmental variable. If there is no env var, it will use port 5000
const PORT = process.env.PORT || 5000;
// setting to listen port with callback fn which will execute once app will connect
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
