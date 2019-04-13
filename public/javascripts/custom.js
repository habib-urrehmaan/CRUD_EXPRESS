submitHandler=(elementsObj)=>{
    var post_url = $(elementsObj).attr("action"); //get form action url
    var request_method = $(elementsObj).attr("method"); //get form GET/POST method
    var form_data = $(elementsObj).serialize(); //Encode form elements for submission
    var arr=['student_name','program','semester','courses']; //Array initialization

    $.ajax({
      url : post_url,
      type: request_method,
      data : form_data
    }).done(function(data){
      console.log(data.errors) 
      if (data.errors.length)
      {
        for(var i=0;i<arr.length;i++)
        {
          for(var j = 0; j < data.errors.length; j++) {
            if (data.errors[j].param == arr[i]) 
            {  
              $('#err_'+data.errors[j].param).text(data.errors[j].msg);        
              break;
            }
            else
              $('#err_'+arr[i]).text('');
            }

          }
          
      }
      else
      {
        //- $('#err_').text('');
        console.log('success')
        window.location.href = data.redirect_url;
      }
      });
    };