var story = {
  name: "",            //String
  level: undefined,    //Any integer, starting from 1
  gender: "",          //"boy", "girl", "male" or "female"
  template: "",        //A string that defines the story template

  make: function (config) {
    "use strict";
    var matches, stringArrays, self = this;
    
    this.name = config.name;
    this.level = config.level;
    this.gender = config.gender;
    this.template = config.template;
    var story = this.template;
    
    //Replace the  [name]
    //anecdote = template.replace(/\[name\]/g, name);
    story = story.split("[name]").join(this.name);
    
    //Set the correct gender
    if (this.gender.charAt(0) === "b" || this.gender.charAt(0) === "m") {
      story = story.split("to [her]").join("to him");
      story = story.split("[her]").join("his");
      story = story.split("[Her]").join("His");
      story = story.split("[she]").join("he");
      story = story.split("[She]").join("He");
      story = story.split("[his]").join("his");
      story = story.split("[His]").join("His");
      story = story.split("[he]").join("he");
      story = story.split("[He]").join("He");
    }
    if (this.gender.charAt(0) === "g" || this.gender.charAt(0) === "f") {
      story = story.split("[his]").join("her");
      story = story.split("[His]").join("Her");
      story = story.split("[he]").join("she");
      story = story.split("[He]").join("She");
      story = story.split("[her]").join("her");
      story = story.split("[Her]").join("Her");
      story = story.split("[she]").join("she");
      story = story.split("[She]").join("She");
    }
    
    //Next, set optional text based on the level number
    //1. Find all the text in square brackets and convert them to arrays
    matches = story.match(/\[(.*?)\]/g);

    //2. Convert each submatch into an array of strings
    stringArrays = matches.map(function (match) {
      match = match.slice(1, -1).split(/\s*,\s*/);
      return match;
    });
    //If the stringArrays have more than one element, then we
    //know that it contains some options
    stringArrays.forEach(function (stringArray, index) {
      if (stringArray.length !== 0) {
        //This is the fun part
        //a. Get a reference to the original string that's 
        //surrounded by square brackets
        var originalString = matches[index];
        //b. Select the element from the new stringArray that matches
        //the leve (1,2, 3, 4, etc)
        var newString = stringArray[self.level - 1];
        //c. Replace the orginalString with the newString
        story = story.split(originalString).join(newString);
      }
    });
    //Return the newly written story
    return story;
  }
};