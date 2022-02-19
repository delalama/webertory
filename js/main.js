var jsonUrl = "./json/reper.json";
var json ;
var tableSelector = ".table" ;
var boloMode = false ;
var demoMode = false;
var credens ;

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
  // prepare screen
  $(".botonRack").hide();
  openFullscreen();
  var jsonId = $(elem)[0].currentTarget.parentElement.getAttribute('jsonId');
  var lyrics = getLyrics(jsonId);
  hideTable();
  showIcon();
  $("<div class='actualLyrics'>text</div>").appendTo(document.body);
  addListenersToArrows();
  window.scrollTo(0, 0);

  if(boloMode){
    var gigLyrics = [];
    gigList.forEach(elem => {
      var lyric = '<b>' + elem.artist + '</b>' + ' - ' + '<i>' + elem.name + '</i>      |' + '   ' + elem.key + '\n\n\n' + elem.lyrics + '\n\n\n ______________________________________\n\n\n';
      gigLyrics.push(lyric);
      }
    );
    $(".actualLyrics").last().html(gigLyrics);
  }else{
    $(".actualLyrics").last().html(lyrics);
  }
}

function showDemo(){
  $('.entrance').hide();
  $('.demo').show();
}
function getOutDemo(){
  $('.entrance').show();
  $('.demo').hide();
}

function login(){
  var email = $('.email').val();
  var password = $('.password').val();

  var log = email + password;

  var preEmailUser = allowedUsers.filter(function(elem){
    return elem.email == email;
  });

  preEmailUser[0].password == password ? demoMode= false: demoMode= true;

    fullVersion();

}

function fullVersion() {
  $('.demo').show();
  $('.demoButton').hide();
  $('.entrance').hide();
}

$('.demo').hide();
