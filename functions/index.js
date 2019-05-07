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
    var stuff = [];
    ref.collection('locations').get().then(snapshot => {
        snapshot.forEach(doc => {
            var twoHoursAgo = Date.now() + 1 * 60 * 60 * 1000;
            
            ref.collection('locations').doc(doc.id).collection('votes').where("vote", "=", 1).get().then(snapshot => {
                snapshot.forEach( vote => {
                    console.log('succesfully deleted', vote.id, " ", twoHoursAgo);
                    ref.collection('locations').doc(doc.id).collection('votes').doc(vote.id).delete();
                })
                return "";
            }).catch(reason => {
                res.send(reason)
            });

            var newelement = {
                "id": doc.id,
                // "count": math.floor(doc.data().count-doc.data().count*0.2),
                "timeCreated": doc.data().timeCreated,
                "votes": votes_
            }
            stuff = stuff.concat(newelement);
            // if (newelement.count > 0) {
            //     ref.collection('locations').doc(newelement.id).update({
            //         count: newelement.count
            //     });
            // } else {
            //     ref.collection('locations').doc(newelement.id).delete();
            // }

        });
        res.send(stuff)
        return "";
    }).catch(reason => {
        res.send(reason)
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

    // exports.deleteVote = functions.firestore.document('locations/{address}/votes/{voterID}')
    //     .onDelete((change,context) => {
    //         var deletedVote = change.before.data().vote;
    //         var locationRef = ref.collection('locations').doc(context.params.address);
    //         return ref.runTransaction(transaction => {
    //             return transaction.get(locationRef).then(locationDoc => {
    //                 //compute new count
    //                 var currentCount = locationDoc.data().count - deletedVote;
    //                 //compute upVotes if the new vote is an up vote
    //                 var upVotes_ = locationDoc.data().upVotes;
    //                 if(deletedVote === 1) {
    //                     upVotes_ -= 1;
    //                 }
    //                 //compute downVotes
    //                 var downVotes_ = locationDoc.data().downVotes;
    //                 if(deletedVote === -1) {
    //                     downVotes_ -= 1;
    //                 }
    //                 //compute percentVotesLastThirty

    //                 //compute percentVotesLastHour

    //                 //update location info
    //                 console.log("update successful");
    //                 return transaction.update(locationRef, {
    //                     count: currentCount,
    //                     upVotes: upVotes_,
    //                     downVotes: downVotes_,
    //                 });
    //             });
    //         });
    //     })
    