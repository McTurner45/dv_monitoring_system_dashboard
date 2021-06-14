import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-database'
import 'firebase/storage'

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDykTh4noiYGUU_4l4fn-ML1xikNxsS1Ak",
    authDomain: "panicbutton-2fbd2.firebaseapp.com",
    databaseURL: "https://panicbutton-2fbd2-default-rtdb.firebaseio.com",
    projectId: "panicbutton-2fbd2",
    storageBucket: "panicbutton-2fbd2.appspot.com",
    messagingSenderId: "927781819949",
    appId: "1:927781819949:web:ad03f1f1e2d5181a220aa4",
    measurementId: "G-CJ0VTVW9EN"
};


class Firebase {
    constructor() {
        app.initializeApp(firebaseConfig)
        this.auth = app.auth()
        this.db = app.database()
        this.storageRef = app.storage()
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    logout() {
        return this.auth.signOut()
    }

    async register(name, email, password) {
        await this.auth.createUserWithEmailAndPassword(email, password)
        return this.auth.currentUser.updateProfile({
            displayName: name
        })
    }

    getCurrentUsername() {
        return this.auth.currentUser && this.auth.currentUser.displayName
    }

    getCurrentUserId() {
        let user;
        user = app.auth().currentUser;
        return user.uid;
    }

    getMarkers() {
        const locations = [];
        const temp=[];
        this.db.ref('DVML Audio Detector Mobile').child("distressCalls").on('value', (snapshot) => {
            snapshot.forEach(data => {
                const dataVal = data.val();
                this.db.ref("Users").on('value', (snapshot) => {
                    snapshot.forEach(userData => {
                        if (userData.key===data.key){
                            const userDataVal=userData.val();
                            const surname=userDataVal.personFamilyName;
                            const name=userDataVal.personGivenName;
                            const personPhoto=userDataVal.personPhoto;

                            locations.push(...locations,{
                                name: name,
                                surname:surname,
                                personPhoto:personPhoto,
                                lat:dataVal.Latitude,
                                lng: dataVal.Longitude
                            })
                        }
                    })

                })

            })
        })
        return locations;
    }


}

export default new Firebase()