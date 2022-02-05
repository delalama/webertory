
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
  console.log('holi');
  $(tableSelector).hide();
}

function showTable(){
  $(tableSelector).show();
}


function orderTableBy(key) {
  var sortedJson = sortBy(json, key, "ASC");
  clearTable();
  insertRows(sortedJson);
}

function showLyrics() {

}



function insertRows(json) {
  $.each(json, function (key, value) {
    var spotiLink = value.spotify_link;

    var intrumental = value.instrumental===1 ? 'SI' : 'NO';

    $('.table').append('<tr class="addedRow" style="cursor:pointer;">' +
      '<td>' + value.id + '</td>' +
      '<td>' + value.artist + '</td>' +
      '<td>' + value.name + '</td>' +
      '<td>' + value.tempo + '</td>' +
      '<td>' + value.key + '</td>' +
      '<td><a class="btn btn-primary spotiLink" href="">LINK</a></td>' +
      '<td>' + intrumental + '</td>' +
      '</tr>');

  });

  var spotiLinks = [];

  for( var i = 0 ; i<json.length; i++){
    spotiLinks.push(json[i].spotify_link);
  }

  var i = 0;
  $('.spotiLink').each(function(){
    var oldUrl = $(this).attr("href"); // Get current url
    var newUrl = oldUrl.replace("", spotiLinks[i]); // Create new url
    $(this).attr("href", newUrl); // Set herf value
    i++;
  });

}
