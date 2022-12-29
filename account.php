<?php require 'init.php'; ?>
<!DOCTYPE html>

<head>
<link rel="stylesheet" href="./account_styles.css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
</head>
<body onload="start()">
<div class="alert" id="alert-div">
    <p class="alert-header">Changes Saved</p>
    <input type="button" class="alert-button" value="OK" id="ok">
</div>
<div class="head">

        <div class="relative" id="relative"></div>
        <div class="head-navigation">
            <input type="button" class="head-button" value="Home" onclick="location.href='./index.php'">
            <input type="button" class="head-button" value='<?php echo $_SESSION['username'] ?>' onclick="location.href='./account.php'">
           
            <a href="dashboard.php" class="head-button" id="graph-button1">Dashboard</a>
        </div>
        </div>
    </div>
    <?php if(!isset($_SESSION['id'])){ ?>
        <div class="holder" id="signup-holder">
           <div class="half">
            <form class="login-holder" autocomplete="off" method="POST" action="./init.php" id="form">
            
            <input type="button" class="signup-header" value="Sign Up">
                <input type="text" class="text" placeholder="Username" name="s_username">
                <input type="text" class="text" placeholder="E-mail" name="s_email">
                <input type="password" class="text" placeholder="Password" name="s_password" id="p">
                <input type="password" class="text" placeholder="Retype Password" id="rp">
                <input type="button" class="button" value="Submit" name="signup" id="signup-submit">
                <p class="sub-welcome1">Have an Account? <span id="login" onclick="loginPressed()">Login</span></p>
</form>
<script>
document.getElementById("signup-submit").onclick = function(){
    if(document.getElementById("p").value !== document.getElementById("rp").value){
        alert("passwords not the same");
        document.getElementById("form").reset();
    }
    else{
        document.getElementById("form").submit();
    }
}
</script>
           </div>
       
           <div class="half" id="welcome">
            <p class="welcome-text">Welcome</p>
            <p class="sub-welcome">Have an Account? <span id="login" onclick="loginPressed()">Login</span></p>
           </div>
        </div>
        <?php } else{ ?>
         <div class="side-bar">
            <div class="relative">
                <div class="button-holder">
                <input type="button" class="settings-button-focused" value="Profile" id="profile-button">
            <input type="button" class="settings-button" value="About/Contact" id="settings-button">
           
            <a class="settings-button" id="settings-link" href="init.php?logout=true">Log out</a>
                </div>
            </div>
         </div>
          <div class="right-holder" id="profile-screen">
            <div class="relative">
            <form class="profile-holder" action="./init.php" method="POST">
                <p id="profile">
                    Profile
        </p>
                <p id="account">
                    Account data
        </p>
        <p class="input-header">
                    Username
        </p>
        <input name="new_username" type="text" class="input-box" value='<?php echo $_SESSION['username'] ?>'>
        <p class="input-header">
                    Email
        </p>
        <input name="new_email" type="text" class="input-box" value='<?php echo $_SESSION['email'] ?>'>
        <p class="input-header">
                    Password
        </p>
        <input name="new_password" type="text" class="input-box" value='<?php echo $_SESSION['password'] ?>'>
        <br>
        <input type="submit" class="save" value="Save changes">
        </form>
            </div>
         </div>
         <div class="right-holder" id="settings-screen">
            <div class="relative">
            <form class="profile-holder" >
                <p id="profile">
                    Contact
        </p>
                <p id="account">
                    Emails
        </p>
        <p class="input-header">
                   Business inquiries
        </p>
        <input disabled = "disabled" name="new_username" type="text" class="input-box" value="mathimatebusiness@gmail.com" >
        <p class="input-header">
                    Concerns
        </p>
        <input disabled="disabled" name="new_email" type="text" class="input-box" value="mathimatehelp@gmail.com">
        <p class="input-header">
                  Site quick support
        </p>
        <input disabled="disabled" name="new_email" type="text" class="input-box" value="845-826-1115">
       
        <br>
        <p class="input-header">
                 -------------------------------------------------------------------------
        </p>
        <br>
        <br>
        <p id="profile">
                    About
        </p>
        <p id="account">
                   Mathimate was created with one goal, teach math intuitively to all. 
        </p>
        <p id="account1" onclick="docs()">
                  Documentation
        </p>
        <br>

        </form>
            </div>
         </div>
            <?php } ?>
        <div class="holder" id="login-holder">
           <div class="half">
            <form class="login-holder" autocomplete="off" method="POST" action="./init.php">
               <input type="button" class="login-header" value="Login">
               
                <input type="text" class="text" placeholder="Username/E-mail" name="username-email">
                
                <input type="password" class="text" placeholder="Password" name="l_password">
                <input type="submit" class="login-button" value="Submit">
                <p class="sub-welcome1">Don't Have an Account? <span id="signup" onclick="signupPressed()">Sign up</span></p>
</form>

           </div>
           <div class="half" id="welcome">
            <p class="welcome-text">Welcome</p>
            <p class="sub-welcome">Don't have an Account? <span id="signup" onclick="signupPressed()">Sign Up</span></p>
           </div>
        </div>
        <script>
              function docs(){
            window.open("https://docs.google.com/document/d/e/2PACX-1vQhpBfUVeuJTqH1X3l51gNt7g-h1zjNCK_hzJp0A2i-umg02-viKTnMZVwKjyGidxJ8byKXciu9vb5l/pub", '_blank').focus();
        }
             document.getElementById("profile-button").onclick = function(){
                document.getElementById("profile-button").classList.remove("settings-button");
                document.getElementById("profile-button").classList.add("settings-button-focused");
                document.getElementById("settings-button").classList.remove("settings-button-focused");
                document.getElementById("settings-button").classList.add("settings-button");
                document.getElementById("profile-screen").style.display = "block";
                document.getElementById("settings-screen").style.display = "none";
            }
            document.getElementById("settings-button").onclick = function(){
                document.getElementById("settings-button").classList.remove("settings-button");
                document.getElementById("settings-button").classList.add("settings-button-focused");
                document.getElementById("profile-button").classList.remove("settings-button-focused");
                document.getElementById("profile-button").classList.add("settings-button");
               
                document.getElementById("profile-screen").style.display = "none";
                document.getElementById("settings-screen").style.display = "block";
            }
             document.getElementById("ok").onclick = function(){
        
    document.getElementById("alert-div").style.display = "none";
}  
  function loginPressed(){
            
                document.getElementById("signup-holder").style.display = "none";
                document.getElementById("login-holder").style.display = "flex";
}
           function signupPressed(){
                document.getElementById("signup-holder").style.display = "flex";
                document.getElementById("login-holder").style.display = "none";
            }
            function start(){
           if(JSON.stringify(window.location).indexOf("?") > -1 && JSON.stringify(window.location).indexOf("]") < 0){
            
           document.getElementById("alert-div").style.display = "flex";
           } else if(JSON.stringify(window.location).indexOf("?") > -1 && JSON.stringify(window.location).indexOf("]") > -1){
            alert("username/password incorrect");
           }
           
        }
       
    // your code 

       
               
        </script>
</body>