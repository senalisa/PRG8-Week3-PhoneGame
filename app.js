// Variables
const image = document.getElementById("image");
const result = document.getElementById("result");
const probability = document.getElementById("probability");
document.getElementById("getval").addEventListener("change", readURL, true);
let synth = window.speechSynthesis;

window.addEventListener("load", (event) => {
  speak('Welcome to the game: Is it a phone or an apple.')
});

// Browser Speech
// Instructions button Speech
let playButton = document.querySelector("#playbutton");
playButton.addEventListener("click", () => {
  speak(
    `To play this game, upload an image of a phone or an apple. The browser will tell what it is.`
  );
});

//Uploaded File / Image
// Read URL of the uploaded file, add Classifier add Speech and Text
function readURL() {
  var file = document.getElementById("getval").files[0];
  if (file) {
    var reader = new FileReader();

    reader.onload = function (e) {
      image.src = e.target.result;
      ml5
        .imageClassifier("./model.json", "model.weights.bin")
        .then((classifier) =>
          classifier.classify(image).then((results) => {
            result.innerText = results[0].label;
            speak(results[0].label);
            probability.innerText = results[0].confidence.toFixed(4);
          })
        );
    };

    reader.readAsDataURL(file);
  }
}

// Function Speak
function speak(text) {
  if (synth.speaking) {
    console.log("still speaking...");
    return;
  }
  if (text !== "") {
    let utterThis = new SpeechSynthesisUtterance(text);
    synth.speak(utterThis);
  }
}