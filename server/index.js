import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import passport from 'passport';

import googleRoute from './endpoints/google_oauth';
import questionRoute from './endpoints/question_route';


const app = express();

const HOST = process.env.HOST;
const PORT = process.env.PORT || 8080;
mongoose.Promise = global.Promise;

console.log(`Server running in ${process.env.NODE_ENV} mode`);

app.use(express.static(process.env.CLIENT_PATH));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use('/auth/google', googleRoute);
app.use('/', questionRoute);

const runServer = (callback) => {
    let databaseUri = process.env.DATABASE_URI || global.databaseUri || 'mongodb://localhost/frenchX';
    mongoose
        .connect(databaseUri)
        .then(() => {
            console.log('db connected...');
            let port = process.env.PORT || 8080;
            let server = app.listen(port, () => {
                    console.log('Listening on localhost:' + port);
                    if (callback) {
                        callback(server);
                        console.log('server running');
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        });
};

if (require.main === module) {
    runServer();
}

export default app;