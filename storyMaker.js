var story = {
  keys: null, //An object that defines the template keys
  optionNumber: undefined, //Any integer, starting from 1
  gender: "", //"boy", "girl", "male" or "female"
  template: "", //A string that defines the story template

  make: function (config) {
    "use strict";
    var arraysInTemplate, stringArrays, self = this;

    this.keys = config.keys;
    this.optionNumber = config.optionNumber;
    this.gender = config.gender;
    this.template = config.template;
    var story = this.template;
    
    //Replace the  [name]
    //anecdote = template.replace(/\[name\]/g, name);
    //story = story.split("[name]").join(this.name);
    Object.keys(this.keys).forEach(replaceKeysWithValues);

    function replaceKeysWithValues(key) {
      //Get the value of the current key
      var value = self.keys[key];
      //Replace the template key with the value
      story = story.split("[" + key + "]").join(value);
    }
    if (this.gender !== undefined) {
      //Set the correct gender
      if (this.gender.charAt(0) === "b" || this.gender.charAt(0) === "m") {
        story = story.split(" to her ").join(" to him ");
        story = story.split(" her ").join(" his ");
        story = story.split(" Her ").join(" His ");
        story = story.split(" she ").join(" he ");
        story = story.split(" She ").join(" He ");
      }
      if (this.gender.charAt(0) === "g" || this.gender.charAt(0) === "f") {
        story = story.split(" his ").join(" her ");
        story = story.split(" His ").join(" Her ");
        story = story.split(" he ").join(" she ");
        story = story.split(" He ").join(" She ");
      }
      if (this.gender.charAt(0) === "i" || this.gender === "it") {
        story = story.split(" his ").join(" its ");
        story = story.split(" His ").join(" Its ");
        story = story.split(" he ").join(" it ");
        story = story.split(" He ").join(" It ");
        story = story.split(" her ").join(" its ");
        story = story.split(" Her ").join(" Its ");
        story = story.split(" she ").join(" it ");
        story = story.split(" She ").join(" It ");
        story = story.split(" him ").join(" it ");
      }
    }
    //Next, set optional text based on the optionNumber number
    //First, turn all the text that's surrounded by square brackets
    //into arrays of strings
    arraysInTemplate = this.getArraysInTemplate(story);

    //Only go further if there are actually arrays in the 
    //template, otherwise return the story unchanged.
    if (arraysInTemplate !== null) {
      stringArrays = this.makeArraysOfStrings(arraysInTemplate);

      //If the stringArrays have more than one element, then we
      //know that it contains some options
      stringArrays.forEach(function (stringArray, index) {
        var originalString, newString, optionToChoose;
        if (stringArray.length !== 0) {
          //This is the fun part
          //a. Get a reference to the original string that's 
          //surrounded by square brackets
          originalString = arraysInTemplate[index];
          //b. Select the element from the new stringArray that matches
          //the optionNumber (1,2, 3, 4, etc). If the optionNumber is greater than
          //the number of elements in the string, choose
          //the last element
          if (self.optionNumber === undefined) {
            optionToChoose = self.getRandomOption(stringArray);
          } else {
            optionToChoose = self.optionNumber;
          }
          if (optionToChoose <= stringArray.length) {
            newString = stringArray[optionToChoose - 1];
          } else {
            newString = stringArray[stringArray.length - 1];
          }
          //c. Replace the orginalString with the newString
          story = story.split(originalString).join(newString);
        }
      });
      //Return the newly written story
      return story;
    } else {
      return story;
    }
  },
  //Find all the text in square brackets and convert them to arrays
  getArraysInTemplate: function (story) {
    "use strict";
    var matches = [];
    matches = story.match(/\[(.*?)\]/g);
    return matches;
  },
  //Converts all everything inside the template's 
  //square brackets into arrays of strings. It returns an array
  //that contains all these sub-arrays. Needs a "matches" array
  //that's returned by the getMatches function
  makeArraysOfStrings: function (matches) {
    "use strict";
    var stringArrays = [];

    //Convert each submatch into an array of strings
    stringArrays = matches.map(function (match) {
      match = match.slice(1, -1).split(/\s*,\s*/);
      return match;
    });
    return stringArrays;
  },
  //Find all the keys used in the template. The keys are single words
  //surrounded by square brackets, like [this]. (This excludes
  //option arrays, which sqaure brackets containing multiple 
  //words or phrases separated by commas.) 
  findKeysInTemplate: function (template) {
    "use strict";
    //Find single words surrounded by square brackets
    var keysInTemplate = template.match(/\[(\S*)\]/g);
    
    //Only proceed if there actually are keys in the template
    if (keysInTemplate !== null) {
      //Remove duplicates
      keysInTemplate = keysInTemplate.filter(function (key, index, self) {
        return self.indexOf(key) === index;
      });
      //Remove the square brackets from the strings
      keysInTemplate = keysInTemplate.map(function (newString) {
        newString = newString.replace(/[\[\]']+/g, "");
        return newString;
      });
      console.log(keysInTemplate);
      return keysInTemplate;
    } else {
      return keysInTemplate;
    }
  },
  //If optionNumber isn't defined, return a random number 
  //between 1 and the option array with the 
  //greatest number of elements.
  getRandomOption: function (stringArray) {
    "use strict";
    var randomNumber = Math.floor(Math.random() * stringArray.length) + 1;
    return randomNumber;
  },
  //Find out what the maximum number of options are in the
  //story options
  getMaximumNumberOfOptions: function (template) {
    "use strict";
    var arraysInTemplate, stringArrays, biggestNumber = 0;
    arraysInTemplate = this.getArraysInTemplate(template);
    if (arraysInTemplate !== null) {
      stringArrays = this.makeArraysOfStrings(arraysInTemplate);
      stringArrays.forEach(function (stringArray) { 
        if (stringArray.length > biggestNumber) {
          biggestNumber = stringArray.length;
        }
      });
      if (biggestNumber > 1) {
        return biggestNumber;
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  }
};