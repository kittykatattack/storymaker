(function () {
  "use strict";
  //require(storyMaker.js);
  
  var template = "[name] created [an excellent, a very good, a good] one-point perspective imaginary street scene. Her shading skills [are well developed and, are developing and, need practice but] she composed [a highly imaginative, an imaginative, an interesting] family picture. She has [an excellent, a very good, a good] understanding of the elements and principles of design, as exhibited by her art quiz. [name] [produced artwork of a high standard and she has shown an impressive commitment in class, produced good quality work this term and her art skills will continue to improve with practice, shows an ability in art but should remember to maintain focus when in class].";
  
  var fairyTale = "[hero] lived in a [place] and was a [prince of the realm, lonely wanderer, skilled magician]. One day he came across [a venemous toad, an evil fairy, a suspicious old crone] and immediately [reached for his sword, fell asleep, wondered what would happen next]. But in the next instant, [hero] felt [a drop of rain, strangely quesy, a small hand tugging at his sleeve] and realized [how bad the situation really was, that he was dreaming, that he had been followed by a dwarf].";
  
  //Make a new story like this: `story.make({...options...})`
  
  var newStory = story.make({
    template: fairyTale,
    keys: {
      hero: "Rex",
      place: "palace in the clouds"
    },
    //optionNumber: 1,
    gender: "male"
  });
  
  //Read the new story
  console.log(newStory);
  
  //Here are the options you can use:
  //keys: The single words in square brackets from the template. 
  //For example,  `[name]`, `[place]`, `[villan]`.
  //Whatever value you give them will be replaced in template by the story maker.
  //level: Determines which optional text is chosen from the text in
  //square brackets. For example you might have an option like this:
  //`[the first one, the second one, the third one.]` If `level` is 2
  //The this text in the template will be replaced with `the second one`
  //If you don't inlude a level number, the optional text be random.
  //gender: changes "he" to "she", "him" to "her" and vice
  //versa. If you leave this out the gender pronouns won't be changed.
  
  //If you want find all the keys in the template, use
  //`story.findKeysInTemplate`. You could use this to let users
  //assign their own key values based on a story they've written.
  var keysUsed = story.findKeysInTemplate(fairyTale);
  console.log("Keys in template: " + keysUsed.toString());
  
}());