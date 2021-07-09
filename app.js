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
        var checkNum = "";
        var checkBox = $('.form-check > input');
        for (var i = 0; i < checkBox.length; i++) {
            //如果有1个被选中时（jquery1.6以上还可以用if(checkBox[i].prop('checked')) 去判断checkbox是否被选中）
            if (checkBox[i].checked) {
                checkNum += `${i + 1}`;
                checkBox[i].checked = false;
                // chboxVal.push(checkBox[i].value)//将被选择的值追加到
            }
        }
        scores[current] = $('ul').find('.active')[0].value;
        $('ul').find('.active')[0].classList.remove("active");
        docRef.doc(ids[current]).update({
            score: scores[current],
            check: checkNum,
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
    var quality = false; //判断是否被选择条件
    var checkOne = false;
    // var chboxVal = [];                       //存入被选中项的值
    var ansQuality = $('ul').find('.active'); //获得得到所的复选框
    var checkBox = $('.form-check > input');

    if (ansQuality.length) quality = 1;

    for (var i = 0; i < checkBox.length; i++) {
        //如果有1个被选中时（jquery1.6以上还可以用if(checkBox[i].prop('checked')) 去判断checkbox是否被选中）
        if (checkBox[i].checked) {
            checkOne = true;
            // chboxVal.push(checkBox[i].value)//将被选择的值追加到
        }
    }
    console.log(checkOne);
    if (quality && checkOne) {
        func();
    } else if (quality) {
        $.alert({
            title: "Warning",
            content:
                "Are you sure that the explanation doesn't satisfy any criteria?",
            buttons: {
                ok: {
                    text: "Yes",
                    btnClass: "btn-primary",
                    action: function () {
                        func();
                    }
                },
                cancle: { text: "No", btnClass: "btn-danger" },
            },
        });
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