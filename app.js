var firebaseConfig = {
    apiKey: "AIzaSyDcD1WBebfA5QaN9YhyB2OT0KHuWYkEd5M",
    authDomain: "meme-7ec6a.firebaseapp.com",
    databaseURL: "https://meme-7ec6a-default-rtdb.firebaseio.com",
    projectId: "meme-7ec6a",
    storageBucket: "meme-7ec6a.appspot.com",
    messagingSenderId: "63488114585",
    appId: "1:63488114585:web:82d0718ea497f6b5a55d08",
    measurementId: "G-VG6XQ6FG5H",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// firebase.analytics();

var data;
var db = firebase.firestore();
const reason = document.querySelector("#reason");
const info = document.querySelector("#info");
const meme = document.querySelector("#meme");
const next = document.querySelector("#nextButton");
const bar = document.getElementById("progressbar");


const docRef = db.collection("meme");
var query = docRef.where("score", "==", 0).limit(3);

function init() {
    query.get().then(function (querySnapshot) {
        data = querySnapshot;
        // console.log(data.docs);
        // querySnapshot.forEach(function (doc) {
        //     console.log(doc.id, " => ", doc.data());
        // });
        reason.innerHTML = data.docs[0].data()["reason"];
        info.innerHTML = data.docs[0].data()["info"];
        meme.src = data.docs[0].data()["image"];
        save_data();
    }).catch(function (error) {
        console.log("Error getting documents: ", error);
    });
}

var current = 0;
var ids = [];
var reasons = [];
var infos = [];
var images = [];
var scores = [];
var sources = [];

function save_data() {
    data.forEach(function (doc) {
        ids.push(doc.id);
        reasons.push(doc.data()["reason"]);
        infos.push(doc.data()["info"]);
        images.push(doc.data()["image"]);
        scores.push(doc.data()["score"]);
        sources.push(doc.data()["source"]);
    });
}

function update_progressbar () {
    var length = ids.length;
    var num = parseInt(current / ids.length * 100)

    bar.innerHTML = num + "%";
    bar.style.width = `${num}%`;
    // bar.attributes.aria-valuenow= num;
}

next.addEventListener("click", function () {
    Check(update);
})

function update() {
    if (current < reasons.length) {
        scores[current] = $('ul').find('.active')[0].value;
        $('ul').find('.active')[0].classList.remove("active");
        docRef.doc(ids[current]).update({
            score: scores[current],
        }).then(function () {
            console.log("Saved !!");
        }).catch(function (error) {
            console.log("Got an error: ", error);
        });
        current += 1;
        update_progressbar();
        if (current < reasons.length) {
        reason.innerHTML = reasons[current];
        info.innerHTML = infos[current];
        meme.src = images[current];
        }
    }
}

$(".page-item").click(function () {
    if ($('ul').find('.active')[0])
        $('ul').find('.active')[0].classList.remove("active");
    this.classList.add('active');
    // console.log(this);
})

function Check(func) {
    var checkOne = false; //判断是否被选择条件
    // var chboxVal = [];                       //存入被选中项的值
    var checkBox = $('ul').find('.active'); //获得得到所的复选框

    if (checkBox.length) checkOne = 1;

    if (checkOne) {
        func();
    } else {
      $.alert({
        title: "Warning",
        content:
          "You need to answer the evaluation question",
        buttons: {
          ok: {
            text: "Yes",
            btnClass: "btn-primary",
          },
        //   cancle: { text: "No", btnClass: "btn-danger" },
        },
      });
      return false;
      // checkBox[checkBox.length - 1].required = true;
      // if (!checkBox[checkBox.length - 1].checkValidity()) {
      //   checkBox[checkBox.length - 1].reportValidity();
      // }
    }
  }



// const outputHeader = document.querySelector("#hotDogOutput");
// const inputTextField = document.querySelector("#latestHotDogStatus");
// const saveButtton = document.querySelector("#saveButton");
// const loadButtton = document.querySelector("#loadButton");

// saveButtton.addEventListener("click", function() {
//     const textToSave = inputTextField.value;
//     console.log("I am going to save " + textToSave + " to Firestore");
//     docRef.set({
//         hotDogStatus: textToSave,
//     }).then(function () {
//         console.log("Status saved !!");
//     }).catch(function (error) {
//         console.log("Got an error: ", error);
//     });
// })

// loadButtton.addEventListener("click", function() {
//     docRef.get().then(function (doc) {
//         if(doc && doc.exists) {
//             const myData = doc.data();
//             outputHeader.innerHTML = "Hot dog status: " + myData.hotDogStatus; 
//         }
//     }).catch(function (error) {
//         console.log("Got an error: ", error);
//     });
// })

// getRealtimeUpdates = function() {
//     docRef.onSnapshot(function (doc) {
//         if(doc && doc.exists) {
//             const myData = doc.data();
//             outputHeader.innerHTML = "Hot dog status: " + myData.hotDogStatus; 
//         }
//     });
// }

// getRealtimeUpdates();