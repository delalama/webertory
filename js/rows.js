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
