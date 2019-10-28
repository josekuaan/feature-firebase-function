const functions = require('firebase-functions');
const uuid = require('uuid');
const cors = require('cors')({ origin: true });
const admin = require('firebase-admin');


admin.initializeApp();
const database = admin.database().ref('/users');




   

exports.addUser = functions.https.onRequest((req, res) => {
    return cors(req, res, () => {
        if (req.method !== 'POST') {
            return res.status(401).json({
                message: 'Not allowed'
            })
        }
     
        const user = req.body
        // user[id] =uuid()
        database.push( user );
       
    })
})

exports.updateUuid = functions.database.ref('/users/{usersId}/user')
    .onCreate((snapshot, context) => {
        // Grab the current value of what was written to the Realtime Database.
        const original = snapshot.val();
        console.log('updating', context.params.pushId, original);
        const newUUID = uuid();
        
        return snapshot.ref.update(
            {uuid:newUUID}
        );
    });
