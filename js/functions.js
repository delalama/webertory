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

function insertArrows(key, directionAsc){
  var identificator = '.' + key;
  $(".arrow").hide();
  if(directionAsc){
    $("<div ><img class='arrow' src='../img/up.png'></div>").appendTo($(identificator));
  }else{
    $("<div ><img class='arrow' src='../img/down.png'></div>").appendTo($(identificator));
  }
}

function orderTableBy(key) {
  json = sortBy(json, key);
  clearTable();
  insertRows(json);
}

function showIcon() {
  $("<div ><img class='icon' src='https://github.com/delalama/webertory/blob/master/img/arrow.png'></div>").appendTo(document.body);
  $("<div ><img class='icon2' src='https://github.com/delalama/webertory/blob/master/img/arrow.png").appendTo(document.body);
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
  });

  $(".icon2").click(function () {
    $(".actualLyrics").hide();
    showTable();
  });
}

function insertRows(json) {
  $.each(json, function (key, value) {
    var intrumental = value.instrumental === 1 ? 'SI' : 'NO';

    $('.tableBody').append('<tr class="addedRow" style="cursor:pointer;" jsonId="" >' +
      '<td class="normalValue" onclick="showLyrics(event)" >' + value.id + '</td>' +
      '<td class="normalValue" onclick="showLyrics(event)" >' + value.artist + '</td>' +
      '<td class="normalValue" onclick="showLyrics(event)" >' + value.name + '</td>' +
      '<td class="normalValue" onclick="showLyrics(event)" >' + value.tempo + '</td>' +
      '<td class="normalValue" onclick="showLyrics(event)" >' + value.key + '</td>' +
      '<td class="normalValue" onclick="showLyrics(event)" >' + intrumental + '</td>' +
      '<td><a class="btn btn-primary spotiLink" href="">LINK</a></td>' +
      '</tr>');

  });

  // add spotify links to all table
  for (var j = 0; j < json.length; j++) {
    spotiLinks.push(json[j].spotify_link);
  }

  var i = 0;
  $('.spotiLink').each(function () {
    var oldLink = $(this).attr("href");
    var newLink = oldLink.replace("", spotiLinks[i]);
    $(this).attr("href", newLink);
    i++;
  });

  // add jsonId to all table
  i = 0;
  $('tr.addedRow').each(function () {
    var oldUrl = $(this).attr("jsonId");
    var newUrl = oldUrl.replace("", json[i].id);
    $(this).attr("jsonId", newUrl);
    i++;
  });

}
