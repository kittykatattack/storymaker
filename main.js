(function () {
  "use strict";
  //require(storyMaker.js);
  
  var template = "[name] created [an excellent, a very good, a good] one-point perspective imaginary street scene. [Her] shading skills [are well developed and, are developing and, need practice but] [she] composed [a highly imaginative, an imaginative, an interesting] family picture. [She] has [an excellent, a very good, a good] understanding of the elements and principles of design, as exhibited by [her] art quiz. [name] [produced artwork of a high standard and [she] has shown an impressive commitment in class, produced good quality work this term and [her] art skills will continue to improve with practice, shows an ability in art but should remember to maintain focus when in class].";
  
  var newStory = story.make({
    template: template,
    name: "Rex",
    level: 1,
    gender: "male"
  });
  console.log(newStory);
}());