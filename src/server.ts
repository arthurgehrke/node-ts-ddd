import express from 'express';

import routes from './routes';

const app = express();

app.listen(3000, () => 'Server running on 3000');
