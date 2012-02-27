var App = Em.Application.create();

App.Search = Em.Object.extend({
	  result 	: null
	, date		: (new Date()).getTime()
	, kind 		: 'fren'
	, keyWords	: 'blabla'
	, firstWordOrignal : function() {
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
		this.insertAt(0, search)
	}
})

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
