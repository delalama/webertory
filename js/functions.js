var spotiLinks = [];

function clearTable() {
  $('.addedRow').remove();
}

var id = false;
var artist = false;
var songName = false;
var tempo = false;
var key = false;
var instrumental = false;

function isAsc(value) {
  switch (value) {
    case "id":
      id = !id;
      return id;
      break;
    case "artist":
      artist = !artist;
      return artist;
      break;
    case "name":
      songName = !songName;
      return songName;
      break;
    case "tempo":
      tempo = !tempo;
      return tempo;
      break;
    case "key":
      key = !key;
      return key;
      break;
    case "instrumental":
      instrumental = !instrumental;
      return instrumental;
      break;
    default:
  }

}

function sortBy(json, key) {
  var direction = isAsc(key);
  insertArrows(key, direction);

  return json.sort(function (a, b) {
    var x = a[key];
    var y = b[key];
    if (direction) {
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    } else {
      return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    }
  });
}

function hideTable() {
  $(tableSelector).hide();
}

function showTable() {
  $('.icon').hide();
  $('.icon2').hide();
  $(tableSelector).show();
}

function getSpotiLinks() {
  spotiLinks = [];

  $.each(json, function (key, value) {
    spotiLinks.push(value);
  });
}
var prevIdentificator ;

function insertArrows(key, directionAsc){
  $(prevIdentificator).css("color", "");

  var identificator = '.' + key;
  prevIdentificator = identificator;
  $(".arrow").remove();
  if(directionAsc){
    $("<a class='arrow'>↑</a>").appendTo($(identificator));
  }else{
    $("<a class='arrow'>↓</a>").appendTo($(identificator));
  }
  $(identificator).css("color", "orange");
}

function orderTableBy(key) {
  json = sortBy(json, key);
  clearTable();
  insertRows(json);
}

function showIcon() {
  $("<div ><p class='icon'>←</p></div>").appendTo(document.body);
  $("<div ><p class='icon2'>←</p></div>").appendTo(document.body);
}

function getLyrics(jsonId) {
  var filteredRow = json.filter(function (entry) {
    return entry.id === parseInt(jsonId);
  });
  return filteredRow[0].lyrics;
}

function addListenersToArrows() {
  $(".icon").click(function () {
    $(".actualLyrics").hide();
    showTable();
    $(".botonRack").css("display", "block");
  });

  $(".icon2").click(function () {
    $(".actualLyrics").hide();
    showTable();
    $(".botonRack").css("display", "block");
  });
}


// fullscreen code
var elem = document.documentElement;
function openFullscreen() {
  $('.closeFullscreen').show();
  $('.openFullscreen').hide();
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

function closeFullscreen() {
  $('.openFullscreen').show();
  $('.closeFullscreen').hide();

  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
}

$('.closeFullscreen').hide();

var gigList = [];
function setCheck(event){
  var jsonId = event.target.parentElement.parentElement.getAttribute('jsonid');

  var filteredRow = json.filter(function (entry) {
    return entry.id === parseInt(jsonId);
  });

  //add check to json if checked
  if(event.currentTarget.checked){
    filteredRow[0].checked = true;
    gigList.push(filteredRow[0]);
  }else{
    filteredRow[0].checked = false;
    gigList = gigList.filter(function(elem){
      return elem != filteredRow[0];
    });
  }

  console.log(filteredRow[0]);

}
// TODO delete "reading lyrics mode" on instrumental song
