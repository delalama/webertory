var url = "./json/reper.json";
var json ;
var tableSelector = ".table" ;

$.ajax({
  url: url,
  type: 'GET',
  dataType: 'json'
}).done(function (resp) {
  json  = resp.reper;
  var sortedJson = sortBy(json, "id", "ASC");
  insertRows(sortedJson);
});
