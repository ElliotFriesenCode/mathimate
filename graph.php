<?php require 'init.php'; ?>
<!doctype html>
<html>
	<head>
	<link rel="shortcut icon" href="#">
        
		<title>mathimate</title>
        <link rel="stylesheet" href="./styles2.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300&display=swap" rel="stylesheet">
	</head>
	<body>
	    <div class="body1">
        
    <div class="alert" id="alert-div">
    <p class="alert-header">Changes Saved</p>
    <br>
    <br>
    <input type="button" class="alert-button" value="OK" id="ok" onclick = "ok()">
</div>
        <p id="arrayData"></p>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <div class="covering" id="covering">
           <p><span id="export-text"></span></p>
        </div>
        <div class="download-covering" id="download-covering">
        
            
        <p class="exit-mark" id="exit-mark">x</p>
        <a id="dl" href="" download="download.mp4">Download</a>

        </div>
    <script src="https://unpkg.com/@ffmpeg/ffmpeg@0.8.1/dist/ffmpeg.min.js"></script>



<video id="myVideo" controls="controls" class="none"></video>
<video id="output-video" controls="controls" class="none"></video>



<div id="message" class="none"></div>


    

        <div class="load">
           <p>Mathimate</p>
        </div>
        <div class="main">
        <div class="tutorial" id="tutorial1">
            <p class="corner-arrow">&#x3c</p>
            <p class="tutorial-text" id="tt">This is the field where equations are entered. Try typing an equation, then press the enter key. To see what mathimate can graph, visit</p>
            <input type="button" class="next1" value="Here" onclick="docs()">
        </div>
        <div class="tutorial" id="tutorial2">
            <p class="corner-arrow">&#x3c</p>
            <p class="tutorial-text">Here you can see the equation entered along with many options. These options allow for the control of the color, domain, range, and line width. Try changing a value</p>
        </div>
        <div class="tutorial" id="tutorial3">
            <p id="bottom-arrow">&#8595</p>
            <p class="tutorial-text">These buttons allow for the creation and duplication of frames. On the bottom left of the screen you can see the number 1, meaning you are on frame 1. Try creating a new frame.</p>
        </div>
        <div class="tutorial" id="tutorial4">
            <p id="bottom-arrow">&#8595</p>
            <p class="tutorial-text">Great, now press on the frame labeled "2" to access it.</p>
        </div>
        <div class="tutorial" id="tutorial5">
            <p class="corner-arrow">&#x3c</p>
            <p class="tutorial-text">Wonderful, now create and save an equation on this frame. (Save it with enter key)</p>
        </div>
        <div class="tutorial" id="tutorial6">
            <p id="bottom-arrow">&#8595</p>
            <p class="tutorial-text">Try pressing play to watch the animation</p>
        </div>
        <div class="tutorial" id="tutorial7">
            
            <p class="tutorial-text">Congratulations you just played your first mathimation. Now select file, then export the animation</p>
        </div>
        <div class="tutorial" id="tutorial8">
            <p id="tutorial-text">You've now completed the first part of the tutorial.</p>
            <input type="button" class="next" onclick="next()" value="continue">
        </div>
<div class="outer">
    <div class="left-box">
    <div class="equation-holder-header">
       
        <input type="text" class="equation-holder-input" placeholder="Enter an Equation" id="textbox">
    </div>
    <div id="equation-holder">
    <!--<div class="equation-holder">
    <input type="text" class="graph-name" placeholder="Graph Name">
      <input type="text" class="equation" placeholder="Equation">
      <input type="color" class="equation-color">
      <input type="text" class="line-width" placeholder="width">
      <div class="minmaxholder">
      <input type="text" class="minmax" placeholder="xmin">
      <input type="text" class="minmax" placeholder="xmax">
      <input type="text" class="minmax" placeholder="ymin">
      <input type="text" class="minmax" placeholder="ymax">
      </div>
    </div>
-->
    </div>
    
    

    </div>
    <div class="bottom-box" id="bb">
    <div class="add-frame-popupb hidden" id="afpb">
        
</div>
    <input type="button" class="frame-selected" id="frame0"value="1" onclick="changeFrameButton(this)">
    <!--<input type="button" class="frame" id="frame1" value="2" onclick="changeFrameButton(this)">
    <input type="button" class="frame" id="frame2"value="3" onclick="changeFrameButton(this)">
-->

    
   <input type="button" class="add-frame hidden" id="plus" value="+" onclick="addFramePressed()">
    <div class="add-frame-popup hidden" id="afp">
    <div class="holder-popup hidden">
    <input type="button" class="add-frame-popup-child" value="New" onclick="newFrame()">
    <br>
    <input type="button" class="add-frame-popup-child" value="Duplicate" onclick="duplicateFrame()">
    </div>
    </div>
    
    </div>

    <div class="new-frame-box">
        <div class="relative">
        <div class="frame-buttons">
        <input type="button" value="New Frame" class="add-frame-box" onclick="newFrame()">
        <input type="button" value="Duplicate Frame" class="add-frame-box" onclick="duplicateFrame()">
        </div>
        </div>
    </div>
<div class="play-box">
    <div class="relative">
    <input type="button" class="play-button" value="Play" onclick="playAnimation()">
   
    <div class="fps-holder">
       
    <select class="select" onchange="changeFPS(this)" value="fps">
    
    <option value="0">1 FPS</option>
    <option value="1" selected="selected">2 FPS</option>
    <option value="2">3 FPS</option>
    <option value="3" >4 FPS</option>
    <option value="4">5 FPS</option>
     <option value="5">6 FPS</option>
    <option value="6" >7 FPS</option>
    <option value="7">8 FPS</option>
    <option value="8">9 FPS</option>
    <option value="9">10 FPS</option>
    
    </select>
    </div>
    </div>
</div>
<p id="title" class="title">Document Name</p>
    <canvas id="canvas"></canvas>
    <div class="menu-holder" id="menu-holder">
        <div class="exit-box" id="exit-box">
            <p class="x" id="x">x</p>
        </div>
        <input type="button" value="Settings" class="menu-button" id="settings_button">
        <input type="button" value="File" class="menu-button" id="file_button">
    </div>
    <div id="menu">
        <div class="settings_menu" id="sm">
            <div class="settings-box">
                <p>Zoom</p>
            <input min="6" max="1000" type="range" value="20" id="slide">
            </div>
            <div class="settings-box">
                <p>Show Grid</p>
            <input type="checkbox" id="myCheck" name="myCheck" checked="checked" onclick="check()">
            </div>
            <div class="settings-box">
                <p>Show Previous</p>
                <input type="checkbox" id="SPCheck" name="SPCheck" onclick="SPCheck()">
            </div>
        </div>
        <div class="file-menu" id="fm">
            <?php if(count($_GET)) { ?>
                <div class="file-box-header">
                <p class="autosave">Autosave is on</p>
            </div>
        <div class="file-box">
            <div class="file-button" id="saveexit" onclick="saveexit()">
                <p class="file-text">Exit</p>
            </div>
        </div>
        <div class="file-box">
            <div class="file-button" id="saveonly" onclick="saveonly()">
                <p class="file-text">Save</p>
            </div>
        </div>
        <?php } else{?>
            <div class="file-box-header">
                <p class="autosave">Demo version</p>
            </div>
            <div class="file-box">
            <div class="file-button" id="exit">
                <p class="file-text">Exit</p>
            </div>
        </div>
        <div class="file-box">
            <div class="file-button1" >
                <p class="file-text">Save</p>
            </div>
        </div>
<?php } ?>
        <div class="file-box" id="fb2">
            <div class="relative">
        <div class="file-button" id="export-button">
        <p class="file-text">Export</p>
        </div>
       
        </div>
        
        </div>
        </div>
    </div>
    <div class="menu-press" id="menu-press" onclick="menu()">
    <div class="menu-bar"></div>
    <div class="menu-bar"></div>
    <div class="menu-bar"></div>
    </div>
    <div class="menu-press2" id="menu-press2" onclick="menu2()">
    <div class="menu-bar2"></div>
    <div class="menu-bar2"></div>
    <div class="menu-bar2"></div>
    </div>
    <div class="menu-box" id="menu-box">
    <input min="6" max="1000" type="range" value="20" id="slide">

<input type="checkbox" id="myCheck" name="myCheck" checked="checked" onclick="check()">
<label for="myCheck" id="text">Show Grid</label>
<input type="checkbox" id="SPCheck" name="SPCheck" onclick="SPCheck()">
<label for="SPCheck" id="SPCheckText">Show Previous</label>
    </div>
       
       
    
          <select id="dropdown" onchange="changeFrame()">
  <option value="0" selected="selected">1</option>
  
  <!--
</select>

<input type="button" id="playanimationbutton"value="Play" onclick="playAnimation()">
<input type="button" id="newFrame"value="+ new" onclick="newFrame()">
<input type="button" id="duplicateFrame"value="+ duplicate" onclick="duplicateFrame()"> 

<label for="dropdown" id="labelfordropdown">Frame</label>
-->
        <input type="text" id="textbox">
       <!-- <div id="graph_holder">
       
            <p>Graphs</p>
        </div>
-->
    </div>
	<script src="./nerdamer/all.min.js"></script> 
    <script src="canvas12.js"></script>
    </div>
    </div>
    </div>
   

 

	</body>
    <script>
        function docs(){
            window.open("https://docs.google.com/document/d/e/2PACX-1vQhpBfUVeuJTqH1X3l51gNt7g-h1zjNCK_hzJp0A2i-umg02-viKTnMZVwKjyGidxJ8byKXciu9vb5l/pub", '_blank').focus();
        }
        let menuActivated = false;
        let settingsPressed = false;
        let filePressed = false;
        document.getElementById("settings_button").onclick = function(){
            if(!menuActivated){
                document.getElementById("menu").classList.remove("menu-retracted");
            document.getElementById("menu").classList.add("menu");
            document.getElementById("menu-holder").classList.remove("menu-holder");
            document.getElementById("menu-holder").classList.remove("menu-holder-retracted");
            document.getElementById("menu-holder").classList.add("menu-holder-activated");
           
            
            document.getElementById("exit-box").style.display = "flex";
            }
            document.getElementById("settings_button").classList.remove("menu-button");
            document.getElementById("settings_button").classList.add("menu-button-pressed");
            document.getElementById("file_button").classList.add("menu-button");
            document.getElementById("file_button").classList.remove("menu-button-pressed");
            settingsPressed = true;
            document.getElementById("sm").style.display = "block";
            document.getElementById("fm").style.display = "none";
            
        }
        document.getElementById("file_button").onclick = function(){
            if(!menuActivated){
                document.getElementById("menu").classList.remove("menu-retracted");
            document.getElementById("menu").classList.add("menu");
            document.getElementById("menu-holder").classList.remove("menu-holder");
            document.getElementById("menu-holder").classList.remove("menu-holder-retracted");
            document.getElementById("menu-holder").classList.add("menu-holder-activated");

            document.getElementById("exit-box").style.display = "flex";
            }
            document.getElementById("settings_button").classList.add("menu-button");
            document.getElementById("settings_button").classList.remove("menu-button-pressed");
            document.getElementById("file_button").classList.remove("menu-button");
            document.getElementById("file_button").classList.add("menu-button-pressed");
            filePressed = true;
            document.getElementById("sm").style.display = "none";
            document.getElementById("fm").style.display = "block";
        }
        document.getElementById("exit-box").onclick = function(){
            document.getElementById("file_button").classList.add("menu-button");
            document.getElementById("file_button").classList.remove("menu-button-pressed");
            document.getElementById("settings_button").classList.add("menu-button");
            document.getElementById("settings_button").classList.remove("menu-button-pressed");
            document.getElementById("menu-holder").classList.remove("menu-holder-activated");
            document.getElementById("menu-holder").classList.add("menu-holder-retracted");
            document.getElementById("menu").classList.remove("menu");
            document.getElementById("menu").classList.add("menu-retracted");
            document.getElementById("exit-box").style.display = "none";
           
        }
        
    </script>
</html>