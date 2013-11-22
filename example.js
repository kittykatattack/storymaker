(function () {
  "use strict";
  
  var fairyTale = "[hero] lived in a [place] and was a [prince of the realm, lonely wanderer, skilled magician]. One day he came across [a venemous toad, an evil fairy, a suspicious old crone] and immediately [reached for his sword, fell asleep, wondered what would happen next]. But in the next instant, [hero] felt [a drop of rain, strangely quesy, a small hand tugging at his sleeve] and realized [how bad the situation really was, that he was dreaming, that he had been followed by a dwarf].";
  
  //Make a new story like this: `story.make({...options...})`
  
  var newStory = story.make({
    template: fairyTale,
    keys: {
      hero: "Rex",
      place: "palace in the clouds"
    },
    optionNumber: 1,
    gender: "male"
  });
  
  //Read the new story
  console.log(newStory);
  
  //Here are the options you can use:
  
  //keys: 
  //The single words in square brackets from the template. 
  //For example,  `[name]`, `[place]`, `[villan]`.
  //Whatever value you give them will be replaced in the template by the story maker.
  
  //optionNumber: 
  //Determines which optional text is chosen from the text in
  //square brackets. For example you might have an option like this:
  //`[the first one, the second one, the third one.]` If `optionNumber` is 2
  //this text in the template will be replaced with `the second one`.
  //If you don't include an optionNumber, the optional text will 
  //be randomly chosen (which is fun).
  
  //gender: 
  //changes "he" to "she", "him" to "her" and vice
  //versa. If you leave this out the gender pronouns won't be changed.
  
  //If you want to find all the keys in the template, use
  //`story.findKeysInTemplate`. You could use this to let users
  //assign their own key values based on a story they've written.
  //Like this:
  
  var keysUsed = story.findKeysInTemplate(fairyTale);
  console.log("Keys in template: " + keysUsed.toString());
  
}());