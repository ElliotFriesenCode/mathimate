<?php require 'init.php'; ?>
<!DOCTYPE html>
<head>
    <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-810ZT88BXB"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-810ZT88BXB');
</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="./home_styles.css">
    
</head>

<body>
    
    <div class="head">
        <div class="relative" id="relative">
        <div class="head-navigation">
            <input type="button" class="head-button" value="Home" onclick="location.href='./index.php'">
            <input type="button" class="head-button" value='<?php echo $_SESSION['username'] ?>' onclick="location.href='./account.php'">
           
            <a href="dashboard.php" class="head-button" id="graph-button1">Dashboard</a>
        </div>
        </div>
    </div>
    <div class="top-box">
   <!-- <div class="tutorial">
        <div class="number_holder">
            <p></p>
        </div>
    </div>
-->
    
        <img src="./pngt.png" class="home-img" id="home_img">
        <div class="header-div" id="header-div">
            <p class="header-text">Animate with</p>
            <p class="header-text mathimate">Mathimate</p>
        </div>
        <div class="header-button-div">
            
            <input type="button" class="header-button" id="graph-button" value="Get Started" onclick="home_anim()">
        </div>
    </div>
    
</body>
<script>
function home_anim(){
document.getElementById("header-div").classList.remove("header-div");
document.getElementById("header-div").classList.add("header-div-return");
document.getElementById("graph-button").classList.remove("header-button");
document.getElementById("graph-button").classList.add("header-button-return");
document.getElementById("relative").classList.remove("relative");
document.getElementById("relative").classList.add("relative-return");
document.getElementById("home_img").classList.remove("home-img");
document.getElementById("home_img").classList.add("home-img-return");
setTimeout(tutorial, 1000);
}
function tutorial(){
    window.location.replace("./tutorial.php");
}
</script>