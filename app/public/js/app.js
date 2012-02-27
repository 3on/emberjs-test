var App = Ember.Application.create()


App.Word = Ember.Object.extend({
  english : null,
  french : null,
  
  print: function() {
    console.log("English: " + this.english + " French: " + this.french)
  }
})

App.wordController = Ember.ArrayController.create({
  content : [],
  
  addWord : function(en,fr) {
    var n = App.Word.create({english: en, french : fr})
    this.pushObject(n)
  }
});




var words = [
  Word.create({english: "be", french: "etre"})
]

App.Word = Ember.View.extend({
  click: function(e) {
   alert("clicked") 
  }
});

App.



$(function() {
  
  var test = Word.create({
    english : "",
    french : ""
  });
  
  
  /*
  $.get('/word/fren/etre', function(data) {
    console.log(data)
  });
  */
})