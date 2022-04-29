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

const docRef = db.collection("meme_v2");
// var query = docRef.where("score", "==", 0);
var query = docRef.where("score", "==", 0).limit(3);

function init() {
    query.get().then(function (querySnapshot) {
        data = querySnapshot;
        // console.log(data.docs);
        // querySnapshot.forEach(function (doc) {
        //     console.log(doc.id, " => ", doc.data());
        // });
        reason.innerHTML = data.docs[0].data()["reason"];
        if(data.docs[0].data()["info"] !== "") {
            info.innerHTML = data.docs[0].data()["info"];
            $("#info").show();
            $("#info_head").show();
        }
        else {
            $("#info").hide();
            $("#info_head").hide();
        }
        // info.innerHTML = data.docs[0].data()["info"];
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
var details = [];
var completes = [];
var accurates = [];
var sources = [];

function save_data() {
    data.forEach(function (doc) {
        ids.push(doc.id);
        reasons.push(doc.data()["reason"]);
        infos.push(doc.data()["info"]);
        images.push(doc.data()["image"]);
        scores.push(doc.data()["score"]);
        details.push(doc.data()["detail"]);
        completes.push(doc.data()["complete"]);
        accurates.push(doc.data()["accurate"]);
        sources.push(doc.data()["source"]);
    });
}

function update_progressbar() {
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
        scores[current] = $('.score_ul').find('.active')[0].value;
        details[current] = $('.detail_ul').find('.active')[0].value;
        completes[current] = $('.complete_ul').find('.active')[0].value;
        accurates[current] = $('.accurate_ul').find('.active')[0].value;

        $('.score_ul').find('.active')[0].classList.remove("active");
        $('.detail_ul').find('.active')[0].classList.remove("active");
        $('.complete_ul').find('.active')[0].classList.remove("active");
        $('.accurate_ul').find('.active')[0].classList.remove("active");

        docRef.doc(ids[current]).update({
            score: scores[current],
            detail: details[current],
            complete: completes[current],
            accurate: accurates[current],
        }).then(function () {
            console.log("Saved !!");
        }).catch(function (error) {
            console.log("Got an error: ", error);
        });
        current += 1;
        update_progressbar();
        if (current < reasons.length) {
            reason.innerHTML = reasons[current];
            // info.innerHTML = infos[current];
            if(infos[current] !== "") {
                info.innerHTML = infos[current];
                $("#info").show();
                $("#info_head").show();
            }
            else {
                $("#info").hide();
                $("#info_head").hide();
            }
            meme.src = images[current];
        }
        $('html, body').animate({scrollTop: 150}, 200);
    }
}

$(".score").click(function () {
    if ($(".score_ul").find('.active')[0])
        $('.score_ul').find('.active')[0].classList.remove("active");
    this.classList.add('active');
    console.log(this);
})

$(".detail").click(function () {
    if ($('.detail_ul').find('.active')[0])
        $('.detail_ul').find('.active')[0].classList.remove("active");
    this.classList.add('active');
    console.log(this);
})

$(".complete").click(function () {
    if ($('.complete_ul').find('.active')[0])
        $('.complete_ul').find('.active')[0].classList.remove("active");
    this.classList.add('active');
    // console.log(this);
})

$(".accurate").click(function () {
    if ($('.accurate_ul').find('.active')[0])
        $('.accurate_ul').find('.active')[0].classList.remove("active");
    this.classList.add('active');
    // console.log(this);
})

function Check(func) {
    var quality = 0; //判断是否被选择条件
    var ansQuality = $('ul').find('.active'); //获得得到所的复选框
    console.log(ansQuality.length)

    if (ansQuality.length == 4) {
        func();
    } else {
        $.alert({
            title: "Warning",
            content:
                "You need to answer the evaluation question",
            buttons: {
                ok: {
                    text: "Ok",
                    btnClass: "btn-primary",
                },
                //   cancle: { text: "No", btnClass: "btn-danger" },
            },
        });
        return false;
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