#Story Maker

storyMaker.js is a quick way to create multiple stories from a single story template. You can use this in an interetive, game, or for lots of other fun things.

Start with a story template, that could look like this:
```
template = "[hero] lived in a [place] and was a [prince of the realm, lonely wanderer, skilled magician]. One day he came across [a venomous toad, an evil fairy, a suspicious old crone] and immediately [reached for his sword, fell asleep, wondered what would happen next]. But in the next instant, [hero] felt [a drop of rain, strangely quesy, a small hand tugging at his sleeve] and realized [how bad the situation really was, that he was dreaming, that he had been followed by a dwarf].";
```
Any single words in square brackets are your *story keys*. Any phrases seperated by commas inside square brackets are you *story options*.

Use the `story.make` method to make your story from the template. 

```
var newStory = story.make({
    template: template,
    keys: {
      hero: "Gilfroblom",
      place: "palace in the clouds"
    },
    optionNumber: 1,
    gender: "male"
  });
```
Here's the result of the above code:

```
Gilfroblom lived in a palace in the clouds and was a prince of the realm. One day he came across a venomous toad and immediately reached for his sword. But in the next instant, Bilbo felt a drop of rain and realized how bad the situation really was.
```
Changing the `keys` and the `optionNumber` will give you a different story. 

The `keys` determine how the story keys should be interpreted. Each key name should match the same key in the story. The value should be whatever you want to use for that key. For example `hero: "Bilbo"` will replace `[hero]` with the word `Bilbo` when the story is created.

`optionNumber` lets you choose which of the story options should be chosen. For example, if your `optionNumber` is `2`, "an evil fairy" will be chosen from the story options below:
```
[a venomous toad, an evil fairy, a suspicious old crone]
```
If you set `optionNumber` to `undefined` the story maker will choose a random story option (which is a lot of fun to read!)

`gender` is optional, but can be "male" or "female". It sets the story pronouns: "she", "her" or "he" "him". If you leave this out or set it to `undefined` gender pronouns won't be changed.

Include `storyMaker.js` in any project in which you want to make stories like this. `example.js` is a simple example of how to use it. Check out `index.html` for a more complex, interactive application. Here's a working example:

