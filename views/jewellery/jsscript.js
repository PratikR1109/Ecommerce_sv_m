function getCustomizationOnGoldQuality() {
    var checkedValue = null;
    var inputElements = document.getElementsByClassName('radio');
    var array2 = []
    console.log('called');
    console.log(inputElements.length, 'length');
    for (var i = 0; inputElements[i]; ++i) {
      if (inputElements[i].checked) {
        array2.push(inputElements[i].value)
      }
    }
    
    $.ajax({
      type: "GET",
      url: "<%=BaseUrl%>/demoapi/<%= data2._id %>/"+array2[0]+"/"+array2[1],
      
      success: function(data){
        var output = [''];
        output.push('Rs. '+ data.data + '');
        $('#realtimeamount').html(output.join(''));
      }
    });
  }