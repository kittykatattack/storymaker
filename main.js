(function () {
  "use strict";
  //Define the variables
  var templateText, templateTextArea, scrollHeight, inputsDiv,
    keysInTemplate, template, makeStoryButton, newStory,
    updateTemplateButton, randomRadios, keyInputs,
    optionInput, optionNumberInput, genders, gender, optionSelected,
    keyIntructions,
    keyObject = {};

  //HTML elements
  templateTextArea = document.querySelector("#template");
  inputsDiv = document.querySelector("#inputs");
  makeStoryButton = document.querySelector("#makeStoryButton");
  newStory = document.querySelector("#newStory");
  updateTemplateButton = document.querySelector("#updateTemplateButton");
  randomRadios = document.querySelectorAll("[name=random]");
  randomRadios = Array.prototype.slice.call(randomRadios);
  optionInput = document.querySelector("#optionInput");
  optionNumberInput = document.querySelector("#optionNumberInput");
  genders = document.querySelectorAll("[name=gender]");
  genders = Array.prototype.slice.call(genders);
  keyIntructions = document.querySelector("#keyIntructions");

  //Initilize the template
  templateText = "[hero] lived in a [place] and was a [prince of the realm, lonely wanderer, skilled magician]. One day he came across [a venomous toad, an evil fairy, a suspicious old crone] and immediately [reached for his sword, fell asleep, wondered what would happen next]. But in the next instant, [hero] felt [a drop of rain, strangely quesy, a small hand tugging at his sleeve] and realized [how bad the situation really was, that he was dreaming, that he had been followed by a dwarf].";
  //store.clear()
  loadTemplate();

  function loadTemplate() {
    //Load the template from local storage if it exists
    var storedTemplate = store.get("template");
    //console.log(storedTemplate.name)
    if (storedTemplate !== undefined) {
      if (storedTemplate.name !== undefined) {
        //Retrieve the template and turn <br> line breaks back
        //into newline characters: \n
        template = storedTemplate.name.replace(/<br\s*\/?>/mg, "\n");
      } else {
        template = templateText;
      }
    } else {
      template = templateText;
    }
    console.log(template)
    templateTextArea.value = template;
    //Set the scroll height to match the content
    scrollHeight = templateTextArea.scrollHeight;
    templateTextArea.style.height = scrollHeight + "px";
  }

  //Find the keys in the template and display them as
  //input text field elements
  findKeysInTemplate();
  function findKeysInTemplate() {
    var input, span, p;
    keysInTemplate = story.findKeysInTemplate(template);
    if (keysInTemplate !== null) {
      keyIntructions.style.display = "block";
      inputsDiv.style.display = "block";
      keysInTemplate.forEach(function (key) {
        p = document.createElement("p");
        inputsDiv.appendChild(p);
        span = document.createElement("span");
        span.innerHTML = "[ " + key + " ]";
        span.setAttribute("class", "label");
        p.appendChild(span);
        input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("placeholder", "Enter something...");
        p.appendChild(input);
      });
      //Get a reference to the key input text fields that were
      //created in the code above
      keyInputs = document.querySelectorAll("input[type=text]");
      keyInputs = Array.prototype.slice.call(keyInputs);
    } else {
      keyIntructions.style.display = "none";
      inputsDiv.style.display = "none";
    }
  }

  //The "Make Story" button
  makeStoryButton.addEventListener("mousedown", makeStoryHandler, false);
  function makeStoryHandler() {
    if (templateTextArea.value !== "" || templateTextArea.value !== undefined) {
      console.log(templateTextArea.value);
      //Get the keys from the key text input boxes
      if (keysInTemplate !== null) {
        keysInTemplate.forEach(function (key, index) {
          keyObject[key] = keyInputs[index].value;
        });
      }
      //Set the gender for pronouns, if it's been defined
      genders.some(function (genderRadio) {
        if (genderRadio.checked) {
          gender = genderRadio.value;
          if (gender === "none") {
            gender = undefined;
          }
          return true;
        }
      });
      //Get the text from the template textarea and assign it
      //to the template variable
      template = templateTextArea.value;
      //Preserve line breaks from the textarea. This converts 
      //Text line break characters to <br>
      template = template.replace(/\n\r?/g, '<br>');
      //store the template in local storage
      //store.set("template", template);
      store.set("template", {
        name: template
      })
      //Make a new story and assign it to the innerHTML of
      //the <p> tag on the right side of the screen
      newStory.innerHTML = story.make({
        template: template,
        keys: keyObject,
        optionNumber: optionSelected,
        gender: gender
      });
    }
  }

  //The "Update Template" button
  updateTemplateButton.addEventListener("mousedown", updateTemplateHandler, false);
  function updateTemplateHandler() {
    //Remove an previous story key inputs that might 
    //have been displayed
    while (inputsDiv.firstChild) {
      inputsDiv.removeChild(inputsDiv.firstChild);
    }
    //Assign the template textarea to the template variable
    template = templateTextArea.value;
    //scrollHeight = templateTextArea.scrollHeight;
    //templateTextArea.style.height = scrollHeight + "px";
    //Find the new keys in the updated template
    findKeysInTemplate();
  }

  //Random option radio buttons
  randomRadios.forEach(function (radio) {
    radio.addEventListener("change", randomRadiosHandler, false);
  });
  function randomRadiosHandler(event) {
    if (event.target.value === "off") {
      optionInput.style.display = "block";
      optionSelected = optionNumberInput.value;
    } else {
      optionInput.style.display = "none";
      optionSelected = undefined;
    }
  }

  //Number option input
  optionNumberInput.addEventListener("change", optionSelectedHandler, false);
  function optionSelectedHandler() {
    optionSelected = optionNumberInput.value;
  }
}());