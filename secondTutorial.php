<!DOCTYPE html>
<head>
<link rel="stylesheet" href="./tutorial_styles.css">
</head>
<body>
    
    <div class="first" id="first">
    <!--<div class="header">
        <p>What is Mathimate?</p>
    </div> -->
    <div class="header">
        <p>The Dashboard</p>
    </div>
    <div class="center">
        
        <p>Once you create an account, you will have access to the dashboard. The dashboard allows you to create new animation projects and open previous projects. To create a new project simply navigate to the dashboard screen and press the plus button. Once the plus button is pressed you can enter a name for the project in the field entitled "untitled". Then to open the project, just click on the created box. </p>
        <div class="button-holders1">
            <input type="button" class="button1" value="Return Home" onclick="window.location.href='./index.php'">
                
           
            <input type="button" class="button2" value="Create an Account" onclick="window.location.href='./account.php'">
        </div>
    </div>
    </div>
    <div class="nothing" id="second">
    <div class="header">
        <p>The Tutorial: graphing</p>
    </div>
    <div class="center">
        <p></p>
    </div>
    </div>
    <!--<div class="circle" id="circle">
        <p class="arrow">&#8594</p>
    </div> 
    <div class="left-circle" id="left-circle">
        <p class="arrow">&#8592</p>
    </div> 
   <div class="begin" id="begin">
        <p>Launch</p>
    </div> -->
    <div class="nothing" id="third">
    <div class="header">
        <p>When is Mathimate?</p>
    </div>
    <div class="center">
        <p>She asked the question even though she didn't really want to hear the answer. It was a no-win situation since she already knew. If he told the truth, she'd get confirmation of her worst fears. If he lied, she'd know that he wasn't who she thought he was which would be almost as bad. Yet she asked the question anyway and waited for his answer.</p>
    </div>
    </div>
    <div class="nothing" id="fourth">
    <div class="header">
        <p>W is Mathimate?</p>
    </div>
    <div class="center">
        <p>She asked the question even though she didn't really want to hear the answer. It was a no-win situation since she already knew. If he told the truth, she'd get confirmation of her worst fears. If he lied, she'd know that he wasn't who she thought he was which would be almost as bad. Yet she asked the question anyway and waited for his answer.</p>
    </div>
    </div>
    
   
    <script>
        
   let slideNum = 0;
     function launch(){
        window.location = "./graph.php";
     }
    document.getElementById("left-circle").style.opacity = 0;
    document.getElementById("circle").style.display= "flex";
     document.getElementById("begin").style.display= "none";
   document.getElementById("circle").onclick = function(){
   slideNum++;
   
   if(slideNum == 1){
    document.getElementById("left-circle").style.opacity = 1;
   document.getElementById("first").classList.remove("first");
   document.getElementById("first").classList.add("first_disabled");
   document.getElementById("second").classList.remove("nothing");
   document.getElementById("second").classList.remove("second_disabled");
   document.getElementById("second").classList.add("second");
   document.getElementById("begin").style.display= "none";
   }
else if(slideNum == 2){
   document.getElementById("second").classList.remove("second");
   document.getElementById("second").classList.add("second_disabled");
   document.getElementById("third").classList.remove("third_disabled");
   document.getElementById("third").classList.remove("nothing");
   document.getElementById("third").classList.add("third");
   document.getElementById("begin").style.display= "none";
} 
else if(slideNum == 3){

   document.getElementById("third").classList.remove("third");
   document.getElementById("third").classList.add("third_disabled");
   document.getElementById("fourth").classList.remove("fourth_disabled");
   document.getElementById("fourth").classList.remove("nothing");
   document.getElementById("fourth").classList.add("fourth");
   document.getElementById("circle").style.display= "none";
   document.getElementById("begin").style.display= "flex";
} 
}
document.getElementById("left-circle").onclick = function(){
   slideNum--;
   
   if(slideNum == 0){
   document.getElementById("left-circle").style.opacity = 0;
   document.getElementById("second").classList.remove("second");
   document.getElementById("second").classList.add("second_disabled");
   document.getElementById("first").classList.remove("first_disabled");
   document.getElementById("first").classList.add("first");
   document.getElementById("circle").style.display= "flex";
     document.getElementById("begin").style.display= "none";
   }
   if(slideNum == 1){
   document.getElementById("left-circle").style.opacity = 1;
   document.getElementById("third").classList.remove("third");
   document.getElementById("third").classList.add("third_disabled");
   document.getElementById("second").classList.remove("second_disabled");
   document.getElementById("second").classList.add("second");
   document.getElementById("circle").style.display= "flex";
   document.getElementById("begin").style.display= "none";
   }
   if(slideNum == 2){
   document.getElementById("left-circle").style.opacity = 1;
   document.getElementById("fourth").classList.remove("fourth");
   document.getElementById("fourth").classList.add("fourth_disabled");
   document.getElementById("third").classList.remove("third_disabled");
   document.getElementById("third").classList.add("third");
   document.getElementById("circle").style.display= "flex";
   document.getElementById("begin").style.display= "none";
   }

}
document.getElementById("begin").onclick = function(){
    window.location.replace('./graph.php');
}
    </script>
</body>