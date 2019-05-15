const functions = require('firebase-functions');
const admin = require('firebase-admin')
const math = require('mathjs')
admin.initializeApp(functions.config().firebase)

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

//deploy to firebase using "firebase deploy --only functions"
const ref = admin.firestore()

exports.DBupdate = functions.https.onRequest((req, res) => {
    ref.collection('locations').get().then(snapshot => {
        var twoHoursAgo = Date.now() - (10 * 60 * 1000);
        var twoHoursAgo_ = new Date(twoHoursAgo);
        snapshot.forEach( address => {
            ref.collection('locations').doc(address.id).collection('votes').get().then(query => {
                if (query.size <=0) {
                    ref.collection('locations').doc(address.id).delete();
                }
                return "";
            }).catch( reason0 => {
                res.send(reason0);
            });
            ref.collection('locations').doc(address.id).collection('votes').where('voteTime', '<', twoHoursAgo_).get()
                .then( snapshot_ => {
                    snapshot_.forEach( vote => {
                        ref.collection('locations').doc(address.id).collection('votes').doc(vote.id).delete();
                    })
                    return "";
                }).catch( reason1 => {
                    res.send(reason1);
                })
        })
        res.send("success!");
        return "";
    }).catch( reason2 => {
        res.send(reason2);
    })
});

exports.replenishCounts = functions.https.onRequest((req, res) => {
    var stuff = [];
    ref.collection('locations').get().then(snapshot => {
        snapshot.forEach(doc => {
            var newelement = {
                "id": doc.id,
                "count": math.ceil(doc.data().count+math.floor(math.random()*100)+1),
                "timeCreated": doc.data().timeCreated
            }
            stuff = stuff.concat(newelement);
            ref.collection('locations').doc(newelement.id).update({
                count: newelement.count
            });
        });
        res.send(stuff)
        return "";
    }).catch(reason => {
        res.send(reason)
    })
});

exports.updatedVote = functions.firestore.document('locations/{address}/votes/{voterID}')
    .onWrite((change,context) => {
        console.log('updateVote')
        // if (change.type !== 'delete') {
            //value of the new vote for this location
            var newVote = null;
            var oldVote = null;
            // Updates the old vote for this location
            // should ouptut an error if it stays null. Need to learn how
            if (change.before.data() === undefined) {
                oldVote = 0;
                newVote = change.after.data().vote;
            } else if (change.after.data() === undefined) {
                oldVote = change.before.data().vote;
                newVote = 0;
            } else {
                oldVote = change.before.data().vote;
                newVote = change.after.data().vote;
            }
            //reference to the current location
            var locationRef = ref.collection('locations').doc(context.params.address);

            //update count at current location based on either an update of a vote or a new vote
            return ref.runTransaction(transaction => {
                return transaction.get(locationRef).then(locationDoc => {
                    //compute new count
                    var currentCount = locationDoc.data().count - oldVote + newVote;
                    //compute upVotes if the new vote is an up vote
                    var upVotes_ = locationDoc.data().upVotes;

                    if(newVote === 1) {
                        upVotes_ += 1;
                    }
                    if(oldVote === 1) {
                        upVotes_ -= 1;
                    }
                    //compute downVotes
                    var downVotes_ = locationDoc.data().downVotes;
                    if(newVote === -1) {
                        downVotes_ += 1;
                    }
                    if(oldVote === -1) {
                        downVotes_ -= 1;
                    }
                    //compute percentVotesLastThirty

                    //compute percentVotesLastHour

                    //update location info
                    return transaction.update(locationRef, {
                        count: currentCount,
                        upVotes: upVotes_,
                        downVotes: downVotes_,
                    });
                });
            });
        // }
    });

    