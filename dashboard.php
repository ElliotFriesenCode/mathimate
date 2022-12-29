<?php require 'init.php'; ?>
<!DOCTYPE html>
<head>
<link rel="stylesheet" href="./dashboard_styles.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
</head>
<body>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
<div class="head">
<p class="account-name"></p>
        <div class="relative" id="relative"></div>
        <div class="head-navigation">
            <input type="button" class="head-button" value="Home" onclick="location.href='./index.php'">
            <input type="button" class="head-button" value='<?php echo $_SESSION['username'] ?>' onclick="location.href='./account.php'">
           
            <a href="dashboard.php" class="head-button" id="graph-button1">Dashboard</a>
        </div>
        </div>
    </div>
    <?php if(isset($_SESSION['id'])){ ?>
    <div class="project-holder">
        <p class="header">Projects</p>
        <div class="holder">
        <div class="new-project-box" id="new">
            <p class="plus">+</p>
        </div>
        <?php 
        $animationsQuery = $db->prepare("
        SELECT name, id
        FROM animations
        WHERE user_id = :id
        ORDER BY id DESC
        ");
        $animationsQuery->execute([
            'id' => $_SESSION['id']
        ]);
        $animationsArray = $animationsQuery->rowCount() ? $animationsQuery : [];
        foreach($animationsArray as $animation){
            ?>
            <div class="project-box" id=<?php echo $animation['id'] ?> onclick="testId(this.id)">
                <input id=<?php echo "i" . $animation['id'] ?> type="text" class="project-title" value='<?php echo $animation['name']; ?>' onchange="setName(this)">
            </div>
          
            <?php
        }
        
        
        ?>
        <!--
        <div class="project-box">
            <input type="text" class="project-title" value="Untitled">
        </div>
-->     
        
        </div>
    </div>
    <?php } else {?>
<p class="noid"><span id="signin" onclick="signin()">Sign in</span> to view dashboard</p>
        <?php } ?>
    <script>
    function signin(){
    window.location = "./account.php";
}
        function testId(id){
          if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
               if(document.getElementById("i" + id) !== document.activeElement){
                window.location.href = "graph_mobile.php?" + id;
            }
          }
          else{
               if(document.getElementById("i" + id) !== document.activeElement){
                window.location.href = "graph.php?" + id;
            }
          }
           
        }
    const delay = (delayInms) => {
  return new Promise(resolve => setTimeout(resolve, delayInms));
}
document.getElementById("new").onclick = function(){
    /*let projectBox = document.createElement('div');
    projectBox.setAttribute("class", "project-box");
    projectBox.setAttribute("onclick", "testId(this.id)");
    let input = document.createElement('INPUT');
    input.setAttribute("type", "text");
    input.setAttribute("class", "project-title");
    input.setAttribute("value", "Untitled");
    input.setAttribute("onchange", "setName(this)");
    input.setAttribute("id", "i")
    projectBox.appendChild(input);
    document.getElementById("new").after(projectBox);
    */
    createNew();
    
  setTimeout(function(){
 document.location.reload();

}, 500); 
}

function createNew(){
        var testVar = "";
        $.ajax({
          type: 'post',
          url: 'get_data.php',
          // add json datatype to get json
          
          data: ({new_animation: "untitled"}),
          success: function (response) {
             testVar = response;
             
          }
        });
       
    }
    function setName(obj){
        let newId = obj.id.substring(1);
        $.ajax({
          type: 'post',
          url: 'get_data.php',
          // add json datatype to get json
          
          data: ({name: obj.value, id: newId}),
          success: function (response) {
             testVar = response;
             
          }
        });
       
    }
    </script>
</body>