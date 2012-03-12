var App = Em.Application.create();

App.Search = Em.Object.extend({
	  result 	: null
	, date		: (new Date()).getTime()
	, kind 		: 'fren'
	, keyWords	: 'blabla'
	, firstWordOriginal : function() {
	  var words = this.keyWords.split(' ')
	  return words[0]
	}.property()
	
	, firstWordTranslation : function() {
	  
	  if (this.result['term0']['PrincipalTranslations'])
	    return this.result['term0']['PrincipalTranslations']['0']['FirstTranslation']['term']
	  
	  if (this.result['term0']['Entries']['0']['FirstTranslation']['term'])
  	  return this.result['term0']['Entries']['0']['FirstTranslation']['term']
  	  
	}.property()
	
});

App.searchesController = Em.ArrayController.create({
	  content 	: []
	, add		: function(search) {
		  this.pushObject(search)
	}
	, click : function() {
	    alert("clicked")
	}
})

App.SearchesView = Em.View.extend({
    click : function() {
      console.log(this)
      console.log(this.get('keyWords'), this.get('kind'))
	    //alert(this.get('content'))
	  }
  , searchesBinding : 'App.searchesController.content'
  , filtered : function () {
    return this.get('searches');
    /*
    return this.get('searches').filter(function(item, index, self) {
      console.log(item)
      return (index == 1)
    })*/
  }.property('searches')
})

App.SearchView = Em.View.extend({
    templateName : 'searchView'
  , originalBinding : 'App.searchesController.content.firstWordOriginal'
	, translationBinding : 'App.searchesController.content.firstWordTranslation'
	, keyWordsBinding : 'App.searchesController.content.Search.keyWords'
	, life : "42"
	, click : function() {
    console.log(this)
    console.log(this.get('keyWords'), this.get('kind'))
    //alert(this.get('content'))
  }
});


App.AddSearchView = Em.TextField.extend({
	insertNewline : function() {
		var value = this.get('value')
		var trans = $('#translation option:selected').val();
		
		if (value) {
			$.get('/word/' + trans + '/' + value, function(data) {
				var res = JSON.parse(data);
				console.log(trans, res)
				App.searchesController.add(App.Search.create({kind : trans, keyWords: value, result: res}));
			})
		}
	}
})


$(function() {
  
})