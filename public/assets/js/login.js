// $(document).ready(function() {



//     (function() {

//         let db = "";



//         new Vue({
//             el: '.login-wrapper',
//             data: {
//                 progress: false,
//                 rootUrl: "http://i-sabi.firebaseapp.com/",
//                 loginCover: false,
//                 error: false,
//                 db: {}
//             },
//             methods: {
//                 showError: function(msg) {

//                     this.$refs.errorMsg.innerText = msg;
//                     this.error = true;

//                     let vueApp = this;

//                     vueApp.progress = false;
//                     vueApp.loginCover = false;

//                     $('.login-title').css('margin-bottom', '0px');
//                     setTimeout(function() {
//                         vueApp.error = false;
//                         $('.login-title').css('margin-bottom', '50px');
//                     }, 7000);

//                 },
//                 loginUser() {

//                     let vueApp = this;
//                     this.loginCover = true;


//                     if (this.$refs.txtEmail.value != "" && this.$refs.txtPassword.value != "") {
//                         firebase.auth().signInWithEmailAndPassword(this.$refs.txtEmail.value, this.$refs.txtPassword.value).catch(function(error) {
//                             // Handle Errors here.
//                             var errorObj = {

//                                 errorCode: error.code,
//                                 errorMessage: error.message
//                             };

//                             vueApp.loginCover = false;
//                             vueApp.progress = false;
//                             vueApp.showError(error.message);
//                             console.log(errorObj);
//                             // ...
//                         });
//                     } else {
//                         vueApp.showError("Please enter login details");
//                     }



//                 },
//                 setupFirebase() {

//                     try {


//                         var config = {
//                             apiKey: "AIzaSyCuHVnh6Zm9lon8SHN4-U_tpge11PsXZNg",
//                             authDomain: "i-sabi.firebaseapp.com",
//                             databaseURL: "https://i-sabi.firebaseio.com",
//                             projectId: "i-sabi",
//                             storageBucket: "i-sabi.appspot.com",
//                             messagingSenderId: "625855939421"
//                         };



//                         firebase.initializeApp(config);
//                         db = firebase.firestore();


//                         db.settings({
//                             timestampsInSnapshots: true
//                         });

//                     } catch (error) {

//                         let vueApp = this;

//                         window.location.replace(vueApp.rootUrl + "error");

//                     }
//                 }
//             },
//             computed: {

//             },
//             mounted() {
//                 let vueApp = this;

//                 firebase.auth().onAuthStateChanged(function(user) {
//                     if (user) {
//                         // User is signed in.

//                         try {

//                             localStorage.setItem('LoggedIn', true);

//                             console.log("success");

//                             window.location.replace(vueApp.rootUrl + "Questions");


//                         } catch (error) {
//                             vueApp.progress = false;
//                             vueApp.loginCover = false;
//                             console.log(error);
//                         }


//                         // window.location.replace(vueApp.rootUrl + "Questions");


//                         // ...
//                     } else {
//                         // User is signed out.
//                         localStorage.setItem('LoggedIn', false);
//                         // ...
//                     }
//                 });
//             },
//             created() {



//                 if (localStorage.getItem('LoggedIn') === "true") {
//                     this.progress = true;
//                     this.loginCover = true;
//                     window.location.replace(this.rootUrl + "Questions");
//                 } else {

//                 }
//                 this.setupFirebase();
//             }


//         })




//     })()

// });