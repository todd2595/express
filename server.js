var express = require("express");
var path = require("path");


var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
var userResults = [
  {
    name: "bob",
    image:"https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12233839/Doberman-Pinscher-On-White-08.jpg",
    record: [1, 2, 3, 4, 5, 1, 2, 3, 4, 5],
    score: "30"
  },
  {
    name: "greg",
    image:"https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12224955/Rottweiler-On-White-06.jpg",
    record: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    score: "10"
  },
  {
    name: "steph",
    image: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/12225004/Rottweiler-On-White-03.jpg",
    record: [2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
    score: "20"
  },
  {
    name: "James",
    image: "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2017/11/13221219/DobermanPinscher4_head-2-800x600.jpg",
    record: [3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    score: "30"
  },
{
  name:"JoJo",
  image:"https://pixel.nymag.com/imgs/daily/vulture/2017/05/16/16-spongebob-explainer.w700.h700.jpg",
  record: [4,4,3,5,4,5,3,2,3,5],
  score:"38"
}]

function findDiff(p1, p2, num) {
  let sum = 0
  for (let i = 0; i < num; i++) {
    sum = Math.abs(p1[i] - p2[i])
    console.log(sum);
  }
  return sum
}


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/app/public/home.html"));
});

app.get("/survey", function (req, res) {
  res.sendFile(path.join(__dirname, "/app/public/survey.html"));
});

app.post("/survey", function (req, res) {
  res.json(userResults);
})

app.get("/api/friends", function (req, res) {
  return res.json({
    userResults: userResults,
  });
});

app.post("/api/friends", function (req, res) {
  let newUser = req.body;
  userResults.push(newUser)
  let currDiff = 0;
  let smallestdif = 4;
  let  smalldiffInd;
  for (let i = 0; i < userResults.length; i++) {
    diff = findDiff(newUser.record, userResults[i].record, 10);
    if (diff < smallestdif) {
      smallestdif = diff
      smalldiffInd = i;
    }
  }
  return res.json(userResults[smalldiffInd]);
  

});



app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});


