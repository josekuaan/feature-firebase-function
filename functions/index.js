
const uuidv5 = require('uuidv5');
const express = require('express');
const cors = require('cors');
// const cors = require('cors')({ origin: true });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
// const database = admin.database().ref('/users');


const app = express();
app.use(cors({ origin: '*' }));

// app.use('/users', usersRoute);

// export const api = functions.https.onRequest(app);



app.post("/", (req, res) => {
    const user = req.body;

    return admin
        .database()
        .ref("/users")
        .push(user)
        .then(() => {
            return res.status(200).send(user);
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send("Oh no! Error: " + error);
        });
});
   
exports.addUser = functions.https.onRequest(app)

// exports.addUser = functions.https.onRequest((req, res) => {
//     return cors(req, res, () => {
//         if (req.method !== 'POST') {
//             return res.status(401).json({
//                 message: 'Not allowed'
//             })
//         }
     
//         const user = req.body
//         database.push( user );
       
//     })
// })

exports.updateUuid = functions.database.ref('/users/{usersId}/user')
    .onCreate((snapshot, context) => {
        // Grab the current value of what was written to the Realtime Database.
        const original = snapshot.val();

        console.log('updating', context.params.pushId, original);
        const newUUID = uuidv5('dns', 'cocky-goldstine-75ff2c.netlify.com');

        return snapshot.ref.update(
            { uuid: newUUID }    
        );
    });
