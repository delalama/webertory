var spotiLinks = [];

function clearTable() {
  $('.addedRow').remove();
}


function sortBy(json, key, way){
  return json.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    if (way === 'ASC') { return ((x < y) ? -1 : ((x > y) ? 1 : 0)); }
    if (way === 'DEC') { return ((x > y) ? -1 : ((x < y) ? 1 : 0)); }
  });
}

function hideTable(){
  $(tableSelector).hide();
}

function showTable(){
  $(tableSelector).show();
}

function getSpotiLinks() {
  spotiLinks = [];

  $.each(json, function (key, value) {
    spotiLinks.push(value);
  });
}

function orderTableBy(key) {
  var sortedJson = sortBy(json, key, "ASC");
  spotiLinks = getSpotiLinks();
  clearTable();
  insertRows(sortedJson);
}

function showLyrics(text) {
  console.log(this);

  hideTable();

  $("<p class='actualLyrics'>text</p>").appendTo(document.body);

  $( ".actualLyrics" ).last().html( text );

}



function insertRows(json) {
  $.each(json, function (key, value) {
    var intrumental = value.instrumental===1 ? 'SI' : 'NO';

    $('.table').append('<tr class="addedRow" style="cursor:pointer;" jsonId="" >' +
      '<td class="normalValue" onclick="showLyrics()" >' + value.id + '</td>' +
      '<td class="normalValue" onclick="showLyrics()" >' + value.artist + '</td>' +
      '<td class="normalValue" onclick="showLyrics()" >' + value.name + '</td>' +
      '<td class="normalValue" onclick="showLyrics()" >' + value.tempo + '</td>' +
      '<td class="normalValue" onclick="showLyrics()" >' + value.key + '</td>' +
      '<td class="normalValue" onclick="showLyrics()" >' + intrumental + '</td>' +
      '<td><a class="btn btn-primary spotiLink" href="">LINK</a></td>' +
      '</tr>');

  });

  // add spotify links to all table
  for( var j = 0 ; j<json.length; j++){
    spotiLinks.push(json[j].spotify_link);
  }

  var i = 0;
  $('.spotiLink').each(function(){
    var oldLink = $(this).attr("href");
    var newLink = oldLink.replace("", spotiLinks[i]);
    $(this).attr("href", newLink);
    i++;
  });

  // add jsonId to all table
  i = 0;

  $('tr.addedRow').each(function(){
    var oldUrl = $(this).attr("jsonId");
    var newUrl = oldUrl.replace("", json[i].id);
    $(this).attr("jsonId", newUrl);
    i++;
  });

  // add lyrics function

  $('td.normalValue').each(json, function (key, value) {
    console.log(key);
    console.log(value);

    var parent = value.parent();
    console.log(parent);
  });

    $('.normalValue').each(function(){
    var jsonId = $(this).parent().attr("jsonId");
    var lyrics = json[jsonId].lyrics;
    $(this).attr("onClick", showLyrics(lyrics));
  });

}
