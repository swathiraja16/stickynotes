(function (){
    function onCreateNoteClick(){
        var html = "<div class=\"modal-container\" >\n" +
        "    <section class=\"create-modal\" id=\"note\" >\n" +
        "        <div class=\"form-group title\">\n" +
       
        "            <input type=\"text\" placeholder=\"Title...\" class=\"form-control\"  id=\"title\">\n" +
        "        </div>\n" +
        "        <div class=\"form-group\">\n" +
       
        "            <textarea type=\"text\" placeholder=\"Content...\" class=\"form-control\" id=\"content\"></textarea>\n" +
        "        </div>\n" +
        "        <div class=\"form-group action-btn\">\n" +
        "            <button class=\"btn btn-primary \" id='cancel-button'>Cancel</button>\n" +
        "            <button class=\"btn btn-primary\" id='save-button'>Save</button>\n" +
        "            <button class=\"btn btn-primary\" id='delete-button'>Delete</button>\n" +
        "        </div>\n" +
        "    </section>\n" +
        "</div>";
        var updatedhtml = "<div class=\"modal-container\" >\n" +
        "    <section class=\"create-modal\" id=\"note\" >\n" +
        "        <div class=\"form-group title\">\n" +
       
        "            <textarea type=\"text\" placeholder=\"Title...\" class=\"form-control\"  id=\"title\" rows=\"1\">"+ localStorage.getItem('title') +"</textarea>  \n" +
        "        </div>\n" +
        "        <div class=\"form-group\">\n" +
       
        "            <textarea type=\"text\" placeholder=\"Content...\" class=\"form-control\" id=\"content\">"+ localStorage.getItem('content') +"</textarea>\n" +
        "        </div>\n" +
        "        <div class=\"form-group action-btn\">\n" +
        "            <button class=\"btn btn-primary \" id='cancel-button'>Cancel</button>\n" +
        "            <button class=\"btn btn-primary\" id='save-button'>Save</button>\n" +
        "            <button class=\"btn btn-primary\" id='delete-button'>Delete</button>\n" +
        "        </div>\n" +
        "    </section>\n" +
        "</div>";

       if (localStorage.getItem('title') != null &&localStorage.getItem('content') != null)
        {
            document.getElementById('modal-container').innerHTML = updatedhtml; 
        }
        else {
        document.getElementById('modal-container').innerHTML = html;
          }

        document.getElementById('cancel-button').addEventListener('click',function(){
            document.getElementById('modal-container').innerHTML = "";
        });
        document.getElementById('save-button').addEventListener('click',function(){
           var notetitle = document.getElementById('title').value;
           var notecontent = document.getElementById('content').value;
           localStorage.setItem('title', notetitle);
           localStorage.setItem('content', notecontent);
           document.getElementById('add-note').innerHTML = "<b>" + localStorage.getItem('title') + "</b>"+ ":" + '\n' + localStorage.getItem('content');
           //document.getElementById('title').innerHTML = notetitle;
           document.getElementById('modal-container').innerHTML = "";

        });
        document.getElementById('delete-button').addEventListener('click',function(){
            localStorage.removeItem('title'); 
            localStorage.removeItem('content');
            document.getElementById('add-note').innerHTML = "";
            document.getElementById('modal-container').innerHTML = "";

        });
  

    } 
    function auth(req, res, next){
        console.log(req.headers);
        var authHeader = req.headers.authorization;
        if(!authHeader){
          var err = new Error('You are not authenticated');
          res.setHeader('WWW-Authenticate', 'Basic');
          err.status = 401;
          next(err);
          return;
        }
      
        var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];
        if (user == 'admin' && pass == 'password'){
          next();
        }
        else {
          var err = new Error('You are not authenticated');
          res.setHeader('WWW-Authenticate', 'Basic');
          err.status = 401;
          next(err);
        }
      }
    function main(){
        document.getElementById('add-note').addEventListener('click',onCreateNoteClick);
        document.getElementById('add-note').innerHTML = "<b>" +  localStorage.getItem('title') + "</b>"+ ":" + '\n' + localStorage.getItem('content');
        
    }


    main();

})();