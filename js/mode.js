function toggleBoloMode(){
  boloMode = !boloMode;
  if(boloMode){
    $( ".boloMode" ).last().html('BOLO MODE ON');
    $(".boloMode").removeClass("btn-success");
    $(".boloMode").addClass("btn-danger");

    // insert head set
    $(".tableHeads").prepend('<th scope="col" class="set" style="cursor:pointer;" onClick="orderBy("check")">SET</th>');
    // insert checks
    $(".addedRow").prepend('<td class="checkTd"><input type="checkbox" class="custom-control-input check" id="customCheck1" onClick="setCheck(event)" /></td>');

  }else{
    $( ".boloMode" ).last().html('BOLO MODE OFF');
    $(".boloMode").removeClass("btn-danger");
    $(".boloMode").addClass("btn-success");

    // delete head set
    $(".set").remove();
    // delete checks
    $(".checkTd").remove();
  }

}
