var jsonUrl = "./json/reper.json";
var json ;
var tableSelector = ".table" ;

$.ajax({
  url: jsonUrl,
  type: 'GET',
  dataType: 'json'
}).done(function (resp) {
  json  = resp.reper;
  var sortedJson = sortBy(json, "id");
  insertRows(sortedJson);
});

function showLyrics(elem) {
  $(".botonRack").css("display", "none");
  openFullscreen();
  var jsonId = $(elem)[0].currentTarget.parentElement.getAttribute('jsonId');
  var lyrics = getLyrics(jsonId);
  hideTable();
  showIcon();
  $("<div class='actualLyrics'>text</div>").appendTo(document.body);
  $(".actualLyrics").last().html(lyrics);
  addListenersToArrows();
}

