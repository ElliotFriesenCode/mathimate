//setting up and variables

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');
let slide = document.getElementById("slide");
let gridNumber = 20;
let increment = 1/20;
let graphs = [[]];
let numGraphs = 0;
let checked = true;
let v = 2;
let currentFrame = 0;
let SPChecked = false;
let duplicates = [];
let fps = 500;
let tutorialNum = 1;
let isTutorial = false;
function SPCheck(){
SPChecked = !SPChecked;
let sameIndex = 0;
let afp = false;

callFunctions();
}
function check(){
    
    ctx.scale(v, v);
    
    ctx.stroke();
    checked = !checked;
    callFunctions();
   
}
//call functions
window.addEventListener('load', ()=>{
    var $target=$('[alt*="000webhost"]');
if($target.length>0){
    var $div=$target.parent().closest('div').remove();
}
    onloaded();
    ctx.scale(1, 1);
    let testVar ="h";
   
    let currentId = JSON.stringify(window.location.href).substring(JSON.stringify(window.location.href).indexOf("?") + 1, JSON.stringify(window.location.href).length - 1);
      
        $.ajax({
          type: 'post',
          url: 'get_data.php',
          // add json datatype to get json
          
          data: ({curr: currentId}),
          success: function (response) {
             testVar = response;
             document.getElementById("title").innerHTML = testVar;
          }
        });
       
       
        
    callFunctions();
   // playAnimation();
    if(JSON.stringify(window.location).indexOf("?") < 0){
            tutorial();
           
        }
      //  setInterval(function() {
         //   loadChanges();
       // }, 5000);
    
});
function reset(){
    saveonly();
    graphs = [];
    duplicates = [];
    
}
window.addEventListener('resize', ()=>{
   callFunctions();
});
slide.oninput = function(){
    
    gridNumber = slide.value;
    callFunctions();
}


   
            
function tutorial(){
isTutorial = true;
//document.getElementById("tutorial1").style.display = "block";
}
function nextTutorial(){
    //tutorialNum++;
   
    document.getElementById("tutorial" + tutorialNum).style.display = "flex";
   
    document.getElementById("tutorial" + (tutorialNum - 1)).style.display = "none";
   
    
}
function next(){
    window.location = "./secondTutorial.php";
}
function newFrame(){
   
    let select = document.getElementById('dropdown');
    let opt = document.createElement('option');
    select.appendChild(opt);
    
    graphs.push([]);
    console.log("gs " + graphs);
   
    opt.value = graphs.length - 1;
    opt.innerHTML = graphs.length;
    
    addFramePressed();
   
    let div = document.getElementById('bb');
    let frame = document.createElement('INPUT');
    
    frame.setAttribute("type", "button");
    frame.setAttribute("value", graphs.length);
    
    frame.setAttribute("id", "frame" + (graphs.length - 1));
    frame.setAttribute("class", "frame");
    frame.addEventListener('click', function(){changeFrameButton(this);});
    let x = currentFrame;
   
    document.getElementById("plus").before(frame);
    nowsaveonly();
    if(isTutorial && tutorialNum == 3){
        nextTutorial();
    }
}

function duplicateFrame(){

    let select = document.getElementById('dropdown');
    let opt = document.createElement('option');
    select.appendChild(opt);
   
    graphs.push([]);
    let newGraphArray = new Array(graphs[graphs.length - 2].length);
    for(let c = 0; c < graphs[graphs.length - 2].length; c++){
        newGraphArray[c] = graphs[graphs.length - 2][c];
    }
    graphs[graphs.length - 1] = newGraphArray;
    console.log("graphs:");
    console.log(graphs);
    
    opt.value = graphs.length - 1;
    opt.innerHTML = graphs.length;
     
    duplicates.push(graphs.length - 1);
   
    duplicates.push(0);
    addFramePressed();
   
    let div = document.getElementById('bb');
    let frame = document.createElement('INPUT');
    
    frame.setAttribute("type", "button");
    frame.setAttribute("value", graphs.length);
    
    frame.setAttribute("id", "frame" + (graphs.length - 1));
    frame.setAttribute("class", "frame");
    frame.addEventListener('click', function(){changeFrameButton(this);});
    let x = currentFrame;
   
    document.getElementById("plus").before(frame);
    nowsaveonly();
}
function changeFrame(){
var e = document.getElementById("dropdown");
var frame = e.options[e.selectedIndex].value;
currentFrame = parseInt(frame);
console.log('frame ' + currentFrame);

for(let i = 0; i < document.getElementsByClassName("").length; i++){
    if(parseInt(document.getElementsByClassName("equation-holder")[i].id) !== currentFrame){
        document.getElementsByClassName("equation-holder")[i].style.display = 'none';
    }
    else{
        document.getElementsByClassName("equation-holder")[i].style.display = 'flex';
    }
}
saveDuplicateGraphs();
   
callFunctions();

}
function changeFrameButton(x){
    
    
    var frame = parseInt(x.id.substring(5));
   
    currentFrame = frame;
   
    
    console.log('frame ' + currentFrame);
   
    for(let i = 0; i < document.getElementsByClassName("equation-holder").length; i++){
        if(parseInt(document.getElementsByClassName("equation-holder")[i].id) !== currentFrame){
            document.getElementsByClassName("equation-holder")[i].style.display = 'none';
        }
        else{
            document.getElementsByClassName("equation-holder")[i].style.display = 'flex';
        }
    }
    for(let i= 0; i < document.getElementsByClassName("frame").length; i++){
       
        if(parseInt(document.getElementsByClassName("frame")[i].id.substring(5)) === currentFrame){
            document.getElementsByClassName("frame")[i].className = "frame-selected";
        }
    }
    for(let i= 0; i < document.getElementsByClassName("frame-selected").length; i++){
       
        if(parseInt(document.getElementsByClassName("frame-selected")[i].id.substring(5)) !== currentFrame){
            document.getElementsByClassName("frame-selected")[i].className = "frame";
        }
    }
    
    saveDuplicateGraphs();
       
    callFunctions();
    if(isTutorial && currentFrame == 1){
      //nextTutorial();
    }
    }

function delay(delayInms) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(2);
      }, delayInms);
    });
  }
async function playAnimation(){
    for(let i = 0; i < graphs.length; i++){
           let delayres = await delay(fps);
            
            currentFrame = i;
            
            document.getElementById("dropdown").value = i;
            callFunctions();
            
            
            changeFrameButton(document.getElementById("frame" + currentFrame));
    
    }
    if(isTutorial && tutorialNum == 6){
        nextTutorial();
    }
    
}
//functions 
function graph(rawEquation, min, max, ymin, ymax, color, lineWidth){

console.log("max: " + ymax);
if(rawEquation !== ''){
    console.log('xmin: ' + min );
    if(min === ''){
        min = -10;

    }
    if(max === ''){
        max = 10;
    }
    if(ymin === ''){
        ymin = -10;
    }
    if(ymax === ''){
        ymax = 10
    }
if(rawEquation.indexOf('y') < 0 && rawEquation.indexOf('x=') < 0){
    rawEquation = "y=" + rawEquation;
}

console.log('curr' + rawEquation);
let isCircle = false;
if(rawEquation.indexOf('x') > -1 && rawEquation.indexOf('y') > -1 &&rawEquation.indexOf('=') > -1){
    let testEq = rawEquation;
    let xcenter = 0;
    let ycenter = 0;
    let count = 0;
    let radius = 0;
    while(testEq.indexOf('^2') > -1){
        testEq = testEq.substring(0, testEq.indexOf('^2')) + testEq.substring(testEq.indexOf('^2') + 2);
        count++;
    }
    let xcount = 0;
    while(testEq.indexOf('x') > -1){
        testEq = testEq.substring(0, testEq.indexOf('x')) + testEq.substring(testEq.indexOf('x') + 1);
        xcount++;
    }
    if(count == 2 && xcount == 1){
       if(rawEquation.indexOf('x') < rawEquation.indexOf('=') && rawEquation.indexOf('y') < rawEquation.indexOf('=')){
        if(convertJustMultiply(rawEquation).indexOf('*') < 0 && rawEquation.indexOf('/') < 0 || (rawEquation.indexOf('/') > -1 && isNumeric(rawEquation.substring(rawEquation.indexOf('/') - 1, rawEquation.indexOf('/'))))){
            console.log("c " + convert(rawEquation));
        let indexX = rawEquation.indexOf('x');
        let indexY = rawEquation.indexOf('y');
        
        if(rawEquation.substring(indexX + 1, indexX + 2) !== '/' && rawEquation.substring(indexX + 1, indexX + 2) !== '*' && rawEquation.substring(indexY + 1, indexY + 2) !== '/' && rawEquation.substring(indexY + 1, indexY + 2) !== '*'){
       radius = Math.sqrt(eval(rawEquation.substring(rawEquation.indexOf('=') + 1))).toFixed(4);
       if(rawEquation.indexOf('(') < 0){
            xcenter = 0;
            ycenter = 0;
       }
       let neweq = rawEquation;
       if(rawEquation.substring(rawEquation.indexOf('x') - 1, rawEquation.indexOf('x')) === '('){
        let xStartIndex = rawEquation.indexOf('x') + 1;
        let xLastIndex = rawEquation.indexOf(')');
        if(xLastIndex !== xStartIndex){
        
        xcenter = parseFloat(rawEquation.substring(xStartIndex, xLastIndex));
        }
        neweq = neweq.substring(0, xLastIndex) + neweq.substring(xLastIndex + 1);
        console.log('x ' + xStartIndex + ' y ' + xLastIndex)
       }
       if(rawEquation.substring(rawEquation.indexOf('y') - 1, rawEquation.indexOf('y')) === '('){
        
        let yStartIndex = neweq.indexOf('y') + 1;
        let yLastIndex = neweq.indexOf(')');
        if(yLastIndex !== yStartIndex){
        ycenter = parseFloat(neweq.substring(yStartIndex, yLastIndex));
        }
       }
      
       ctx.lineWidth = lineWidth;
       graphCircle(xcenter * -1, ycenter * -1, radius, color, parseFloat(min), parseFloat(max), parseFloat(ymin), parseFloat(ymax));
       isCircle = true;
       console.log('radius' + radius)
    }
    }
    } else if(rawEquation.indexOf('x') > rawEquation.indexOf('=') && rawEquation.indexOf('y') > rawEquation.indexOf('=')){
        if(convertJustMultiply(rawEquation).indexOf('*') < 0 && rawEquation.indexOf('/') < 0 || (rawEquation.indexOf('/') > -1 && isNumeric(rawEquation.substring(rawEquation.indexOf('/') - 1, rawEquation.indexOf('/'))))){
        let indexX = rawEquation.indexOf('x');
        let indexY = rawEquation.indexOf('y');
        
     if(rawEquation.substring(indexX + 1, indexX + 2) !== '/' && rawEquation.substring(indexX + 1, indexX + 2) !== '*' && rawEquation.substring(indexY + 1, indexY + 2) !== '/' && rawEquation.substring(indexY + 1, indexY + 2) !== '*'){
       radius = Math.sqrt(rawEquation.substring(0, rawEquation.indexOf('='))).toFixed(4);
       console.log(radius)
       if(rawEquation.indexOf('(') < 0){
            xcenter = 0;
            ycenter = 0;
       }
       ctx.lineWidth = lineWidth;
       graphCircle(xcenter, ycenter, radius, color, parseFloat(min), parsefloat(max), parseFloat(ymin), parseFloat(ymax));
       isCircle = true;
    }
    }
    }
    }
    console.log(radius);
    
}
if(rawEquation.indexOf('x=') > -1 && rawEquation.indexOf('y') < 0){
    console.log('t');
    ctx.lineWidth = lineWidth;
    graphVert(parseFloat(eval(rawEquation.substring(2))), color, ymin, ymax);
}
else if(!isCircle){
    
let sol = nerdamer.solveEquations(rawEquation,'y');
if(rawEquation.indexOf('x**4') > -1){
    sol[0] = rawEquation;
    alert(convert(sol[0]));
}

for(let i = 0; i < sol.length; i++){
let equation = convert(sol[i].toString());

console.log(equation);



let x = -10;
ctx.moveTo(x, eval(equation));
ctx.beginPath();
ctx.strokeStyle = color;
ctx.lineWidth = lineWidth;
let val = parseInt(gridNumber/50);

    if(equation.indexOf('s') > -1 || equation.indexOf('**') > -1 || equation.indexOf('t') > -1
   || equation.indexOf('c') > -1){
   
        increment = 1/(21 - val);
        console.log("inc: " +increment);
    }
    else{
        //increment = (parseFloat(max) - parseFloat(min))/10 ;
        max -= 1/5;
        increment = 1/5;
        max += 0.1;
    }
    for(let i = parseFloat(min); i < parseFloat(max) + increment; i+= increment){
       x = i;
       let p = false;
       x = i - increment;
       if(eval(equation) > parseFloat(ymin) && eval(equation) < parseFloat(ymax) ){
            p = true;
       
       }
       x = i + increment
       if(eval(equation) > parseFloat(ymin) && eval(equation) < parseFloat(ymax) ){

       p = true;
    }
       

       x = i;
       if(p){
        plot(x, eval(equation), ymin, ymax, equation);
       }
       
    }
    ctx.closePath();
}
}
}


document.getElementById('textbox').oninput = function(){ 
    var t =  document.getElementById('textbox'); 
    
try{
    let x = 4;
    let eq = t.value;
    if(eq.indexOf('y') < 0 && eq.indexOf('=') < 0){
        eq = "y=" + eq;
        console.log("yes");
    }
    else{
        if(eq.indexOf('=') < 0 || eq.indexOf('=') === eq.length - 1){
        console.log("cant");
        eq+= "+";
        console.log(eq);
        }
        
        
    }
    if(eq.indexOf('x=') < 0 || eq.indexOf('y') > -1){
    let sol = nerdamer.solveEquations(eq,'y');
    let equation = convert(sol[0].toString());
    eval(convert(equation));
    }
    
    callFunctions();
} 
catch(e){
   
console.log("equation is not in proper format");
}
 
 
}
  
}
function isNumeric(value) {
    return /^-?\d+$/.test(value);
}
function graphCircle(xCenter, yCenter, radius, color, xmin, xmax, ymin, ymax){
    let x =  canvas.width / 2 + xCenter * canvas.width/gridNumber;
    let y  = canvas.height / 2 - yCenter * canvas.width/gridNumber;
    let r = radius * canvas.width/gridNumber;
    xmin -= xCenter;
    xmax -= xCenter;
    ymin -= yCenter;
    ymax -= yCenter;
    
    let angle = 0;
    let reached = false;
    let end = 360;
    console.log("max: " + ymax);
    let start = 0;
   
    while(angle < 360){
        
        if((Math.sin((angle - 180) * Math.PI/180) * radius < ymax && Math.sin((angle - 180) * Math.PI/180) * radius > ymin && Math.cos(angle * Math.PI/180) * radius > xmin && Math.cos(angle * Math.PI/180) * radius < xmax) && !reached){
           reached = true;
           start = angle;
        }
        if((Math.sin((angle - 180) * Math.PI/180) * radius > ymax || Math.sin((angle - 180) * Math.PI/180) * radius < ymin || Math.cos(angle * Math.PI/180) * radius < xmin || Math.cos(angle * Math.PI/180) * radius > xmax) && reached){
            console.log("greater; height = " + Math.sin((angle - 180) * Math.PI/180) * radius + " angle = " + angle);
            ctx.beginPath();
            start *= Math.PI / 180;
            end = angle * Math.PI / 180;
            ctx.arc(x, y, r, start, end);
            ctx.strokeStyle = color;
            ctx.stroke();
            ctx.closePath();
            reached = false;
        }
        angle++;
    }
    if(angle == 360 && reached){
        ctx.beginPath();
   
            
        start *= Math.PI / 180;
       
        end = 2 * Math.PI;
      
        ctx.arc(x, y, r, start, end);
        ctx.strokeStyle = color;
        ctx.stroke();
        
        ctx.closePath();
    } 
    
    
    //console.log(startArray);
   // console.log(endArray);
   
    
   
    
}
function graphVert(xVal, color, min, max){
    if(min < max){
    let rawX = xVal;
    let rawY1 = min;
    let rawY2 = max;
    let x =  canvas.width / 2 + rawX * canvas.width/gridNumber;
    let y1  = canvas.height / 2 - rawY1 * canvas.width/gridNumber;
    let y2  = canvas.height / 2 - rawY2 * canvas.width/gridNumber;
    ctx.beginPath();
    ctx.strokeStyle = color;
    
ctx.moveTo(x, y1);
ctx.lineTo(x, y2);

ctx.stroke();
    }
    
}
function convertJustMultiply(eq){
    let convertedEq = eq;
    if(eq){
        for(let i = 0; i < convertedEq.length; i++){
            prevLetter = "a";
            let previousLetter = '1';
            if(i > 0){
                prevLetter = convertedEq.substring(i - 1, i);
                previousLetter = convertedEq.substring(i - 1, i);
            }
            let currentLetter = convertedEq.substring(i, i + 1);
           
            if(currentLetter === 'x' && isNumeric(prevLetter)){
                convertedEq = convertedEq.substring(0, i) + '*' + convertedEq.substring(i);
            }
            if(currentLetter === 'y' && isNumeric(prevLetter)){
                convertedEq = convertedEq.substring(0, i) + '*' + convertedEq.substring(i);
            }
            if(currentLetter === '(' && (isNumeric(prevLetter) || prevLetter === ')')){
                convertedEq = convertedEq.substring(0, i) + '*' + convertedEq.substring(i);
            }
            
        }
    }
    return convertedEq;
}
function convert(eq){
    let convertedEq = eq;
    if(eq){
        
    if(convertedEq.indexOf('^') > -1){
       // let index = eq.indexOf('^');
        //convertedEq = eq.substring(0, index) + '**' + eq.substring(index + 1);
        convertedEq = convertedEq.replaceAll("^", "**");
        
    }

    for(let i = 0; i < convertedEq.length; i++){
        prevLetter = "a";
        let previousLetter = '1';
        if(i > 0){
            prevLetter = convertedEq.substring(i - 1, i);
            previousLetter = convertedEq.substring(i - 1, i);
        }
        let currentLetter = convertedEq.substring(i, i + 1);
        if(currentLetter.toLowerCase() !== currentLetter.toUpperCase() && currentLetter !== 'x' && currentLetter !== '-' && previousLetter.toLowerCase() === previousLetter.toUpperCase() && previousLetter !== '.' && currentLetter !== 'y' && currentLetter !== 'M'){
            convertedEq = convertedEq.substring(0, i) + 'Math.' + convertedEq.substring(i);
            
        }
        if(currentLetter === 'x' && isNumeric(prevLetter)){
            convertedEq = convertedEq.substring(0, i) + '*' + convertedEq.substring(i);
        }
        if(currentLetter === 'y' && isNumeric(prevLetter)){
            convertedEq = convertedEq.substring(0, i) + '*' + convertedEq.substring(i);
        }
        if(currentLetter === '(' && (isNumeric(prevLetter) || prevLetter === ')')){
            convertedEq = convertedEq.substring(0, i) + '*' + convertedEq.substring(i);
        }
        if(currentLetter === 'x' && prevLetter === '-'){
            convertedEq = convertedEq.substring(0, i) + '1*' + convertedEq.substring(i);
            console.log("this" + convertedEq);
        }
    }
    
   console.log(convertedEq);
}
    return convertedEq;
    
}
function plot2(rawX, rawY, min, max, equation){
    let x1 =  canvas.width / 2 + rawX * canvas.width/gridNumber;
    let y1  = canvas.height / 2 - rawY * canvas.width/gridNumber;
    let x2 =  canvas.width / 2 + (rawX + increment) * canvas.width/gridNumber;
    let x = rawX + increment;
    let y2 = canvas.height / 2 - (eval(equation)) * canvas.width/gridNumber;
    ctx.moveTo(x1, y1);
    if(rawY < parseFloat(max) && rawY > parseFloat(min)){
    ctx.lineTo(x2, y2);
    ctx.stroke();
    }
    ctx.moveTo(x2, y2);
    
    
}
function plot(rawX, rawY, min, max, equation){
    let z =  canvas.width / 2 + rawX * canvas.width/gridNumber;
    let t  = canvas.height / 2 - rawY * canvas.width/gridNumber;
    let x = rawX - increment;
    let previousZ = canvas.width / 2 + (rawX - increment) * canvas.width/gridNumber;
    let previousT = canvas.height / 2 - (eval(equation)) * canvas.width/gridNumber;
    x = rawX + increment;
    let nextZ = canvas.width / 2 + (rawX + increment) * canvas.width/gridNumber;
    let nextT = canvas.height / 2 - (eval(equation)) * canvas.width/gridNumber;
   
    
    if(Number.isNaN(t) && !Number.isNaN(previousT)){
        
        
        x = rawX - 1/2500;
        while(Number.isNaN(eval(equation))){
            x-=1/5000;
        }
        
        if((equation.substring(1, 2) !== '-' || equation.substring(7, 8) !== '-')){
      
        ctx.lineTo(canvas.width / 2 + (x) * canvas.width/gridNumber, canvas.height / 2 - (eval(equation)) * canvas.width/gridNumber);

        ctx.moveTo(canvas.width / 2 + (x) * canvas.width/gridNumber, canvas.height / 2 - (eval(equation)) * canvas.width/gridNumber);
        ctx.lineTo(canvas.width / 2 + (x) * canvas.width/gridNumber, canvas.height / 2 - (eval(equation) - 1/20) * canvas.width/gridNumber);
        }
        else if(eval(equation) > parseFloat(min) && eval(equation) < parseFloat(max)){
            ctx.lineTo(canvas.width / 2 + (x) * canvas.width/gridNumber, canvas.height / 2 - (eval(equation)) * canvas.width/gridNumber);
        }
        
    }
    else if(Number.isNaN(t) && !Number.isNaN(nextT)){
        x = rawX + 1/10000;
        while(Number.isNaN(eval(equation))){
            x+=1/5000;
        }
        if(equation.substring(1, 2) !== '-' || equation.substring(7, 8) !== '-'){
        ctx.moveTo(canvas.width / 2 + (x) * canvas.width/gridNumber, canvas.height / 2 - (eval(equation)) * canvas.width/gridNumber);
        ctx.lineTo(canvas.width / 2 + (x) * canvas.width/gridNumber, canvas.height / 2 - (eval(equation) - 1/20) * canvas.width/gridNumber);
        ctx.moveTo(canvas.width / 2 + (x) * canvas.width/gridNumber, canvas.height / 2 - (eval(equation)) * canvas.width/gridNumber);
        }
        else{
            ctx.moveTo(canvas.width / 2 + (x) * canvas.width/gridNumber, canvas.height / 2 - (eval(equation)) * canvas.width/gridNumber);
        }
       
        ctx.lineTo(nextZ, nextT);
        
    }
    
    x = rawX;
    if(eval(equation) > parseFloat(min) && eval(equation) < parseFloat(max)){
    ctx.lineTo(z, t);
   
    
   
}

ctx.moveTo(z, t);
ctx.stroke();
   
   

}
function addFramePressed(){
    if(!afp){
       // document.getElementById("afp").style.display = "none";
       // document.getElementById("afpb").style.display = "none";
        afp = true;
    }
    else{
       // document.getElementById("afp").style.display = "block";
        afp = false;
        //document.getElementById("afpb").style.display = "block";
    }
}
document.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
        if(document.getElementById("textbox").value !== ""){
        saveGraph();
        loadGraphs();
        if(isTutorial && tutorialNum == 1){
          //  nextTutorial();
        }
        if(isTutorial && currentFrame == 1 && tutorialNum == 5){
          //  nextTutorial();
        }
        }
    }
});

function saveDuplicateGraphs(){
   
    let isDuplicate = false;
    for(let i = 0; i < duplicates.length; i++){
        if(currentFrame == duplicates[i] && duplicates[i + 1] == 0){
            isDuplicate = true;
            duplicates[i + 1] = 1;
        }
    }
    if(isDuplicate){
       console.log('duplicate');
    for(let i = 0; i < graphs[currentFrame].length; i+=8){
        console.log(graphs[currentFrame][i]);
        var newDiv = document.createElement("div");
    newDiv.setAttribute("id", currentFrame);
    newDiv.setAttribute("class", "equation-holder");
    
    var name = document.createElement("INPUT");
    name.setAttribute("type", "text");
    name.setAttribute("value", graphs[currentFrame][i + 1]);
    name.setAttribute("placeholder", "Graph Name");
    name.setAttribute("id", "name" + numGraphs.toString());
    name.setAttribute("class", "graph-name");
    name.addEventListener("input", function(){updateName(this);});
    newDiv.appendChild(name);

    var text = document.createElement("INPUT");
    text.setAttribute("type", "text");
    text.setAttribute("value", graphs[currentFrame][i]);
    text.setAttribute("placeholder", "Enter an equation");
    text.setAttribute("id", "text" + numGraphs.toString());
    text.setAttribute("class", "equation");
    text.addEventListener("input", function(){updateEq(this);});
    newDiv.appendChild(text);

    var colorInput = document.createElement("INPUT");
    colorInput.setAttribute("type", "color");
    colorInput.setAttribute("id", numGraphs.toString());
    colorInput.setAttribute("value", graphs[currentFrame][i + 6]);
    colorInput.setAttribute("class", "equation-color");
    colorInput.addEventListener('change', function(){updateColor(this);});
    newDiv.appendChild(colorInput);

    var lw = document.createElement("INPUT");
    lw.setAttribute("type", "text");
    lw.setAttribute("placeholder", "Width");
    lw.setAttribute("value", graphs[currentFrame][i + 7]);
    lw.setAttribute("id", "lw" + numGraphs.toString());
    lw.setAttribute("class", "line-width");
    lw.addEventListener('input', function(){updateLW(this);});
    newDiv.appendChild(lw);

    
    var minmaxdiv = document.createElement("div");
    minmaxdiv.setAttribute("class", "minmaxholder");

    var min = document.createElement("INPUT");
    min.setAttribute("type", "text");
    min.setAttribute("placeholder", "x min");
    min.setAttribute("value", graphs[currentFrame][i + 2]);
    min.setAttribute("id", "min" + numGraphs.toString());
    min.setAttribute("class", "minmax");
    min.addEventListener('input', function(){updateMin(this);});

    var max = document.createElement("INPUT");
    max.setAttribute("type", "text");
    max.setAttribute("placeholder", "x max");
    max.setAttribute("value", graphs[currentFrame][i + 3]);
    max.setAttribute("id", "max" + numGraphs.toString());
    max.setAttribute("class", "minmax");
    max.addEventListener('input', function(){updateMax(this);});
    minmaxdiv.appendChild(min);
    minmaxdiv.appendChild(max);

    var ymin = document.createElement("INPUT");
    ymin.setAttribute("type", "text");
    ymin.setAttribute("placeholder", "y min");
    ymin.setAttribute("value", graphs[currentFrame][i + 4]);
    ymin.setAttribute("id", "mid" + numGraphs.toString());
    ymin.setAttribute("class", "minmax");
    ymin.addEventListener('input', function(){updateYMin(this);});

    var ymax = document.createElement("INPUT");
    ymax.setAttribute("type", "text");
    ymax.setAttribute("placeholder", "y max");
    ymax.setAttribute("value", graphs[currentFrame][i + 5]);
    ymax.setAttribute("id", "mad" + numGraphs.toString());
    ymax.setAttribute("class", "minmax");
    ymax.addEventListener('input', function(){updateYMax(this);});
    minmaxdiv.appendChild(ymin);
    minmaxdiv.appendChild(ymax);

    var classid = document.createElement("P");
    classid.setAttribute("class", "ci");
    classid.setAttribute("id", currentFrame + "," + numGraphs.toString());
    newDiv.appendChild(classid);

    newDiv.appendChild(minmaxdiv);

    var parent = document.getElementById("equation-holder");
    parent.appendChild(newDiv);
    document.getElementById("textbox").value = '';

    numGraphs++;
    }
    }
}
function saveGraph(){
    console.log("f" + currentFrame);
    var graphText = document.getElementById("textbox").value;
    graphText = graphText.replaceAll("X", "x");
   
    graphs[currentFrame].push(graphText);
    graphs[currentFrame].push('');
    graphs[currentFrame].push('');
    graphs[currentFrame].push('');
    graphs[currentFrame].push('');
    graphs[currentFrame].push('');
    graphs[currentFrame].push("#0000FF");
    graphs[currentFrame].push('');
    console.log(graphs);

    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", currentFrame);
    newDiv.setAttribute("class", "equation-holder");

    var name = document.createElement("INPUT");
    name.setAttribute("type", "text");
    name.setAttribute("placeholder", "Graph Name");
    name.setAttribute("id", "name" + numGraphs.toString());
    name.setAttribute("class", "graph-name");
    name.addEventListener("input", function(){updateName(this);});
    newDiv.appendChild(name);
    
    
    var text = document.createElement("INPUT");
    text.setAttribute("type", "text");
    text.setAttribute("value", graphText);
    text.setAttribute("placeholder", "Equation");
    text.setAttribute("id", "text" + numGraphs.toString());
    text.setAttribute("class", "equation");
    text.addEventListener("input", function(){updateEq(this);});
    newDiv.appendChild(text);
    
    var colorInput = document.createElement("INPUT");
    colorInput.setAttribute("type", "color");
    colorInput.setAttribute("id", numGraphs.toString());
    colorInput.setAttribute("class", "equation-color");
    colorInput.setAttribute("value", "#0000FF");
    colorInput.addEventListener('change', function(){updateColor(this);});
    newDiv.appendChild(colorInput);
    
    var lw = document.createElement("INPUT");
    lw.setAttribute("type", "text");
    lw.setAttribute("placeholder", "Width");
    lw.setAttribute("id", "lw" + numGraphs.toString());
    lw.setAttribute("class", "line-width");
    lw.addEventListener('input', function(){updateLW(this);});
    newDiv.appendChild(lw);


    
    var minmaxdiv = document.createElement("div");
    minmaxdiv.setAttribute("class", "minmaxholder");
    
    var min = document.createElement("INPUT");
    min.setAttribute("type", "text");
    min.setAttribute("placeholder", "x min");
    min.setAttribute("id", "min" + numGraphs.toString());
    min.setAttribute("class", "minmax");
    min.addEventListener('input', function(){updateMin(this);});

    var max = document.createElement("INPUT");
    max.setAttribute("type", "text");
    max.setAttribute("placeholder", "x max");
    max.setAttribute("id", "max" + numGraphs.toString());
    max.setAttribute("class", "minmax");
    max.addEventListener('input', function(){updateMax(this);});
    minmaxdiv.appendChild(min);
    minmaxdiv.appendChild(max);

    var ymin = document.createElement("INPUT");
    ymin.setAttribute("type", "text");
    ymin.setAttribute("placeholder", "y min");
    ymin.setAttribute("id", "mid" + numGraphs.toString());
    ymin.setAttribute("class", "minmax");
    ymin.addEventListener('input', function(){updateYMin(this);});

    var ymax = document.createElement("INPUT");
    ymax.setAttribute("type", "text");
    ymax.setAttribute("placeholder", "y max");
    ymax.setAttribute("id", "mad" + numGraphs.toString());
    ymax.setAttribute("class", "minmax");
    ymax.addEventListener('input', function(){updateYMax(this);});
    minmaxdiv.appendChild(ymin);
    minmaxdiv.appendChild(ymax);

    
    newDiv.appendChild(minmaxdiv);
    


    var parent = document.getElementById("equation-holder");
    parent.appendChild(newDiv);
    document.getElementById("textbox").value = '';

    var classid = document.createElement("P");
    classid.setAttribute("class", "ci");
    classid.setAttribute("id", currentFrame + "," + numGraphs.toString());
    newDiv.appendChild(classid);

    numGraphs++;
    nowsaveonly();

}  
function updateEq(i){
    try{
        

        let x = 4;
        let eq = i.value;
        if(eq.indexOf('y') < 0 && eq.indexOf('=') < 0){
            eq = "y=" + eq;
            console.log("yes");
        }
        else{
            if(eq.indexOf('=') < 0 || eq.indexOf('=') === eq.length - 1){
            console.log("cant");
            eq+= "+";
            console.log(eq);
            }
            
            
        }
        if(eq.indexOf('x=') < 0 || eq.indexOf('y') > -1){
        let sol = nerdamer.solveEquations(eq,'y');
        let equation = convert(sol[0].toString());
        eval(convert(equation));
        }
        graphs[currentFrame][(parseInt(i.id.substring(4)) - calcPrevious(parseFloat(i.id.substring(4)))) * 8] = i.value;
        console.log(i.value);
        callFunctions();
        if(isTutorial && tutorialNum == 2){
            nextTutorial();
        }
    } 
    catch(e){
        
    console.log("equation is not in proper format");
    }
   
  
    nowsaveonly();

}
function updateName(i){
   
        graphs[currentFrame][(parseInt(i.id.substring(4)) - calcPrevious(parseFloat(i.id.substring(4)))) * 8 + 1] = i.value;
       
        callFunctions();
        if(isTutorial && tutorialNum == 2){
            nextTutorial();
        }
   
        nowsaveonly();
    

}

function menu(){
    
        document.getElementById("menu-press").style.display = "none";
        
        document.getElementById("menu-box").style.display = "flex";
        document.getElementById("menu-press2").style.display = "flex";
    
   
}
function menu2(){
    document.getElementById("menu-box").style.display = "none";
    document.getElementById("menu-press2").style.display = "none";
    document.getElementById("menu-press").style.display = "block";
}
function calcPrevious(e){
    let numG = 0;
    for(let i = 0; i < currentFrame; i++){
           //numG += graphs[i].length / 8;
        }
        for(let x = 0; x < document.getElementsByClassName("ci").length; x++){
            let id = document.getElementsByClassName("ci")[x].id;
            let first = parseInt(id.substring(0, id.indexOf(',') + 1));
            let second = parseInt(id.substring(id.indexOf(',') + 1));
            if(first > currentFrame && e > second || (first < currentFrame && e > second)){
                numG++;
            }
        }
       
        
        return numG;
    }
function changeBGColor(){
  //  callFunctions();
}
function updateColor(x){
    
    graphs[currentFrame][(parseInt(x.id) - calcPrevious(parseFloat(x.id))) * 8 + 6] = x.value;
    callFunctions();
    if(isTutorial && tutorialNum == 2){
        nextTutorial();
    }
    nowsaveonly();
}

function updateMin(x){
   
    graphs[currentFrame][(parseFloat(x.id.substring(3)) - calcPrevious(parseFloat(x.id.substring(3)))) * 8 + 2] = x.value;
    
    callFunctions();
    if(isTutorial && tutorialNum == 2){
        nextTutorial();
    }
    nowsaveonly();
}
function updateMax(x){
     graphs[currentFrame][(parseFloat(x.id.substring(3)) - calcPrevious(parseFloat(x.id.substring(3)))) * 8 + 3] = x.value;
     callFunctions();
     if(isTutorial && tutorialNum == 2){
        nextTutorial();
    }
    nowsaveonly();
}
function updateYMin(x){
    graphs[currentFrame][(parseFloat(x.id.substring(3)) - calcPrevious(parseFloat(x.id.substring(3)))) * 8 + 4] = x.value;
    
    callFunctions();
    if(isTutorial && tutorialNum == 2){
        nextTutorial();
    }
    nowsaveonly();
}
function updateYMax(x){
    graphs[currentFrame][(parseFloat(x.id.substring(3)) - calcPrevious(parseFloat(x.id.substring(3)))) * 8 + 5] = x.value;
    
    callFunctions();
    if(isTutorial && tutorialNum == 2){
        nextTutorial();
    }
    nowsaveonly();
}
function updateLW(x){
    graphs[currentFrame][(parseFloat(x.id.substring(2)) - calcPrevious(parseFloat(x.id.substring(2)))) * 8 + 7] = x.value;
    
    callFunctions();
    if(isTutorial && tutorialNum == 2){
        nextTutorial();
    }
    nowsaveonly();
}

function loadGraphs(){
    
    if(!SPChecked || currentFrame == 0){
        
    for(let i = 0; i < graphs[currentFrame].length/8; i++){

        let x = i * 8;
        let xmin = -10;
    let xmax = 10;
    let ymin = -10;
    let ymax = 10;
    let lw = 1.5;
    console.log(graphs);
    if(graphs[currentFrame][x + 2] !== ''){
        xmin = parseFloat(graphs[currentFrame][x + 2]);
    }
    if(graphs[currentFrame][x + 3] !== ''){
        xmax = parseFloat(graphs[currentFrame][x + 3]);
    }
    if(graphs[currentFrame][x + 4] !== ''){
        ymin = parseFloat(graphs[currentFrame][x + 4]);
    }
    if(graphs[currentFrame][x + 5] !== ''){
        ymax = parseFloat(graphs[currentFrame][x + 5]);
    }
    if(graphs[currentFrame][x+7] !== ''){
        lw = parseFloat(graphs[currentFrame][x+7]);
    }
        graph(graphs[currentFrame][x], xmin, xmax, ymin, ymax, graphs[currentFrame][x + 6], lw);
    }
}
else if(currentFrame > 0 && SPChecked){
    for(let i = 0; i < graphs[currentFrame].length/8; i++){
        let x = i * 8;
        let xmin = -10;
        let xmax = 10;
    let ymin = -10;
    let ymax = 10;
    let lw = 1.5;
    if(graphs[currentFrame][x + 2] !== ''){
        xmin = parseFloat(graphs[currentFrame][x + 2]);
    }
    if(graphs[currentFrame][x + 3] !== ''){
        xmax = parseFloat(graphs[currentFrame][x + 3]);
    }
    if(graphs[currentFrame][x + 4] !== ''){
        ymin = parseFloat(graphs[currentFrame][x + 4]);
    }
    if(graphs[currentFrame][x + 5] !== ''){
        ymax = parseFloat(graphs[currentFrame][x + 5]);
    }
    if(graphs[currentFrame][x+7] !== ''){
        lw = parseFloat(graphs[currentFrame][x+7]);
    }
        graph(graphs[currentFrame][x], xmin, xmax, ymin, ymax, graphs[currentFrame][x + 6], lw);
    }
    for(let i = 0; i < graphs[currentFrame - 1].length/8; i++){
        let x = i * 8;
        let xmin = -10;
        let xmax = 10;
    let ymin = -10;
    let ymax = 10;
    let lw = 1.5;
    if(graphs[currentFrame - 1][x + 2] !== ''){
        xmin = parseFloat(graphs[currentFrame - 1][x + 2]);
    }
    if(graphs[currentFrame - 1][x + 3] !== ''){
        xmax = parseFloat(graphs[currentFrame - 1][x + 3]);
    }
    if(graphs[currentFrame - 1][x + 4] !== ''){
        ymin = parseFloat(graphs[currentFrame - 1][x + 4]);
    }
    if(graphs[currentFrame - 1][x + 5] !== ''){
        ymax = parseFloat(graphs[currentFrame - 1][x + 5]);
    }
    if(graphs[currentFrame - 1][x+7] !== ''){
        lw = parseFloat(graphs[currentFrame - 1][x+7]);
    }
        graph(graphs[currentFrame - 1][x], xmin, xmax, ymin, ymax, '#808080', lw);
    }
}

}

























//setup functions 

function callFunctions(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
   
     //clears graph when edit graph
    setSize();
   
     ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.fillStyle = "black";
    if(checked){
    createGrid();
    }
   
    var t = document.getElementById('textbox').value;
     t = t.replaceAll("X", "x");
   
    graph(t, -10, 10, -10, 10, "#0000FF", 1.5);
    loadGraphs();
    console.log(graphs);
    
    
}
function setSize(){   
    canvas.height = window.innerHeight - 600;
    canvas.width = window.innerWidth;
}
function createGrid(){
    
    let x = 1;
    let interval = 1;
    if(gridNumber / 10 >= 2){
        interval = 2;
    }
    if(gridNumber / 10 >= 5){
        interval = 5;
    }
    if(gridNumber / 10 >= 10){
        interval = 10;
    }
    if(gridNumber / 10 >= 20){
        interval = 20;
    }
    if(gridNumber / 10 >= 50){
        interval = 50;
    }
    let multipliedVal = 1;
    for(let i = canvas.width/2 + canvas.width/gridNumber; i < canvas.width; i+=(canvas.width/gridNumber)){
        if(interval == 5 || interval == 2 || interval == 1){
        if(x !=  interval * multipliedVal){
        ctx.strokeStyle = 'rgb(220,220,220)';
        }
        else{
            ctx.strokeStyle = 'gray';
        }
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
       
        if(x == interval * multipliedVal){
            ctx.font = "20px Arial";
            ctx.fillText(x.toString(), i - 10, canvas.height / 2 + 25);
            multipliedVal++;
        }
        x += 1;
    }
    else if(interval == 10){
        if(x % 2 == 0){
            if(x !=  interval * multipliedVal){
                ctx.strokeStyle = 'rgb(220,220,220)';
                }
                else{
                    ctx.strokeStyle = 'gray';
                }
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
               
                if(x == interval * multipliedVal){
                    ctx.font = "15px Arial";
                    ctx.fillText(x.toString(), i - 10, canvas.height / 2 + 15);
                    multipliedVal++;
                }
                x += 1;
        }
        else{
            x += 1;
        }
        
    } 
    else if(interval == 20){
        if(x % 5 == 0){
            if(x !=  interval * multipliedVal){
                ctx.strokeStyle = 'rgb(220,220,220)';
                }
                else{
                    ctx.strokeStyle = 'gray';
                }
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
               
                if(x == interval * multipliedVal){
                    ctx.font = "15px Arial";
                    ctx.fillText(x.toString(), i - 10, canvas.height / 2 + 15);
                    multipliedVal++;
                }
                x += 1;
        }
        else{
            x += 1;
        }
        
    } 
    else if(interval == 50){
        if(x % 10 == 0){
            if(x !=  interval * multipliedVal){
                ctx.strokeStyle = 'rgb(220,220,220)';
                }
                else{
                    ctx.strokeStyle = 'gray';
                }
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
               
                if(x == interval * multipliedVal){
                    ctx.font = "15px Arial";
                    ctx.fillText(x.toString(), i - 10, canvas.height / 2 + 15);
                    multipliedVal++;
                }
                x += 1;
        }
        else{
            x += 1;
        }
        
    } 

    }
    multipliedVal = 1;
    x=-1;
     for(let i = canvas.width/2 - canvas.width/gridNumber; i > 0; i-=(canvas.width/gridNumber)){
        if(interval == 5 || interval == 2 || interval == 1){
        if(Math.abs(x) != multipliedVal * interval){
        ctx.strokeStyle = 'rgb(220,220,220)';
        }
        else{
            ctx.strokeStyle = 'gray';
        }
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke();
        ctx.closePath();
        if(Math.abs(x) == interval * multipliedVal){
        ctx.font = "20px Arial";
        ctx.fillText(x.toString(), i - 10, canvas.height / 2 + 25);
        multipliedVal++;
        }
         x -= 1;
    }
    else if(interval == 10){
        if(Math.abs(x) % 2 == 0){
        if(Math.abs(x) != multipliedVal * interval){
            ctx.strokeStyle = 'rgb(220,220,220)';
            }
            else{
                ctx.strokeStyle = 'gray';
            }
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
            ctx.closePath();
            if(Math.abs(x) == interval * multipliedVal){
            ctx.font = "15px Arial";
            ctx.fillText(x.toString(), i - 10, canvas.height / 2 + 15);
            multipliedVal++;
            }
             x -= 1;
        }
        else{
            x -= 1; 
        }
    }
    else if(interval == 20){
        if(Math.abs(x) % 5 == 0){
        if(Math.abs(x) != multipliedVal * interval){
            ctx.strokeStyle = 'rgb(220,220,220)';
            }
            else{
                ctx.strokeStyle = 'gray';
            }
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
            ctx.closePath();
            if(Math.abs(x) == interval * multipliedVal){
            ctx.font = "15px Arial";
            ctx.fillText(x.toString(), i - 10, canvas.height / 2 + 15);
            multipliedVal++;
            }
             x -= 1;
        }
        else{
            x -= 1; 
        }
    }
    else if(interval == 50){
        if(Math.abs(x) % 10 == 0){
        if(Math.abs(x) != multipliedVal * interval){
            ctx.strokeStyle = 'rgb(220,220,220)';
            }
            else{
                ctx.strokeStyle = 'gray';
            }
            ctx.lineWidth = 1.5;
            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, canvas.height);
            ctx.stroke();
            ctx.closePath();
            if(Math.abs(x) == interval * multipliedVal){
            ctx.font = "15px Arial";
            ctx.fillText(x.toString(), i - 10, canvas.height / 2 + 15);
            multipliedVal++;
            }
             x -= 1;
        }
        else{
            x -= 1; 
        }
    }
        
    }
    x=-1
    multipliedVal = 1;
    for(let i = canvas.height/2 + canvas.width/gridNumber; i < canvas.height; i += (canvas.width/gridNumber)){
        if(interval == 5 || interval == 2 || interval == 1){
        if(Math.abs(x) != multipliedVal * interval){
        ctx.strokeStyle = 'rgb(220,220,220)';
        }
        else{
        ctx.strokeStyle = 'gray';
        }
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
      
        if(Math.abs(x) == interval * multipliedVal){
        ctx.font = "20px Arial";
        ctx.fillText(x.toString(), canvas.width / 2 - 30, i);
        multipliedVal++;
        }
        x -= 1;
    }
    else if(interval == 10){
        if(Math.abs(x) % 2 == 0){
            if(Math.abs(x) != multipliedVal * interval){
                ctx.strokeStyle = 'rgb(220,220,220)';
                }
                else{
                ctx.strokeStyle = 'gray';
                }
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
              
                if(Math.abs(x) == interval * multipliedVal){
                ctx.font = "15px Arial";
                ctx.fillText(x.toString(), canvas.width / 2 - 30, i);
                multipliedVal++;
                }
                x -= 1;
        }
        else{
            x -=1;
        }
    }
     else if(interval == 20){
        if(Math.abs(x) % 5 == 0){
            if(Math.abs(x) != multipliedVal * interval){
                ctx.strokeStyle = 'rgb(220,220,220)';
                }
                else{
                ctx.strokeStyle = 'gray';
                }
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
              
                if(Math.abs(x) == interval * multipliedVal){
                ctx.font = "15px Arial";
                ctx.fillText(x.toString(), canvas.width / 2 - 30, i);
                multipliedVal++;
                }
                x -= 1;
        }
        else{
            x -=1;
        }
    }
    else if(interval == 50){
        if(Math.abs(x) % 10 == 0){
            if(Math.abs(x) != multipliedVal * interval){
                ctx.strokeStyle = 'rgb(220,220,220)';
                }
                else{
                ctx.strokeStyle = 'gray';
                }
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
              
                if(Math.abs(x) == interval * multipliedVal){
                ctx.font = "15px Arial";
                ctx.fillText(x.toString(), canvas.width / 2 - 30, i);
                multipliedVal++;
                }
                x -= 1;
        }
        else{
            x -=1;
        }
    }
    }
    x= 1
    multipliedVal = 1;
    for(let i = canvas.height/2 - canvas.width/gridNumber; i > 0; i -= (canvas.width/gridNumber)){
        if(interval == 5 || interval == 2 || interval == 1){
        if(x != multipliedVal * interval){
        ctx.strokeStyle = 'rgb(220,220,220)';
        }else{
            ctx.strokeStyle = 'gray';
        }
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
        ctx.stroke();
        if(x == interval * multipliedVal){
        ctx.font = "20px Arial";
        ctx.fillText(x.toString(), canvas.width / 2 - 25, i);
        multipliedVal++;
        }
        x += 1;
    } else if(interval == 10){
        if(x % 2 == 0){
            if(x != multipliedVal * interval){
                ctx.strokeStyle = 'rgb(220,220,220)';
                }else{
                    ctx.strokeStyle = 'gray';
                }
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
                if(x == interval * multipliedVal){
                ctx.font = "15px Arial";
                ctx.fillText(x.toString(), canvas.width / 2 - 25, i);
                multipliedVal++;
                }
                
        }
        x += 1;
    }
    else if(interval == 20){
        if(x % 5 == 0){
            if(x != multipliedVal * interval){
                ctx.strokeStyle = 'rgb(220,220,220)';
                }else{
                    ctx.strokeStyle = 'gray';
                }
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
                if(x == interval * multipliedVal){
                ctx.font = "15px Arial";
                ctx.fillText(x.toString(), canvas.width / 2 - 25, i);
                multipliedVal++;
                }
                
        }
        x += 1;
    }
    else if(interval == 50){
        if(x % 10 == 0){
            if(x != multipliedVal * interval){
                ctx.strokeStyle = 'rgb(220,220,220)';
                }else{
                    ctx.strokeStyle = 'gray';
                }
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(0, i);
                ctx.lineTo(canvas.width, i);
                ctx.stroke();
                if(x == interval * multipliedVal){
                ctx.font = "15px Arial";
                ctx.fillText(x.toString(), canvas.width / 2 - 25, i);
                multipliedVal++;
                }
                
        }
        x += 1;
    }
    }
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.moveTo(0, canvas.height/2);
    ctx.lineTo(canvas.width, canvas.height/2);
    ctx.stroke();
}
const { createFFmpeg } = FFmpeg;
const ffmpeg = createFFmpeg({
  log: true
});

const transcode = async (webcamData) => {
  const message = document.getElementById('message');
  const name = 'record.webm';
  await ffmpeg.load();
  message.innerHTML = 'Start transcoding';
  await ffmpeg.write(name, webcamData);
  await ffmpeg.transcode(name,  'output.mp4');
  message.innerHTML = 'Complete transcoding';
  const data = ffmpeg.read('output.mp4');

  const video = document.getElementById('output-video');
  video.src = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
  dl.href = video.src;
  dl.innerHTML = "download mp4"
}
 function exportbutton(){
    if(tutorialNum == 6){
        nextTutorial();
    }
    document.getElementById("covering").style.display = "flex";
fn().then(async ({url, blob})=>{
   
    transcode(new Uint8Array(await (blob).arrayBuffer()));
})
}

function fn() {
var recordedChunks = [];

var time = 0;
var canvas = document.getElementById("canvas");

return new Promise(function (res, rej) {
    var stream = canvas.captureStream(60);

    mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9"
    });

    mediaRecorder.start(time);

    mediaRecorder.ondataavailable = function (e) {
        recordedChunks.push(event.data);
        // for demo, removed stop() call to capture more than one frame
    }

    mediaRecorder.onstop = function (event) {
        var blob = new Blob(recordedChunks, {
            "type": "video/webm"
        });
        var url = URL.createObjectURL(blob);
        res({url, blob}); // resolve both blob and url in an object
        document.getElementById("covering").style.display = "none";
        document.getElementById("download-covering").style.display = "flex";
        document.getElementById("dl").href = url;
        
        myVideo.src = url;
        // removed data url conversion for brevity
    }

// for demo, draw random lines and then stop recording
var i = 0,
tid = setInterval(()=>{
  if(i++ == 1) { // draw 20 lines
   
    clearInterval(tid);
    mediaRecorder.stop();
  }
  if(i == 1){
   
 playAnimation();
  }
}, graphs.length * fps + 3000);

});
}
function draw(){
  let canvas = document.querySelector("canvas");
  let cx = canvas.getContext("2d");
  cx.beginPath();
  cx.strokeStyle = 'green';
  cx.moveTo(Math.random()*100, Math.random()*100);
  cx.lineTo(Math.random()*100, Math.random()*100);
  cx.stroke();
}

document.getElementById("exit-mark").onclick = function(){
    document.getElementById("download-covering").style.display = "none";
}

    

//functions

document.getElementById("exit").onclick = function(){
    document.location = "./index.php";
}
function saveexit(){
    
    let savedGraphArray = JSON.stringify(graphs);
    let savedDuplicateArray = JSON.stringify(duplicates);
    var testvar;
    let currentId = JSON.stringify(window.location.href).substring(JSON.stringify(window.location.href).indexOf("?") + 1, JSON.stringify(window.location.href).length - 1);
    $.ajax({
        type: 'post',
        url: 'get_data.php',
        // add json datatype to get json
        
        data: ({sga: savedGraphArray, sda: savedDuplicateArray, id: currentId}),
        success: function (response) {
           testVar = response;
          
        }
      }); 
      document.location = "./dashboard.php";
   
}
function saveonly(){
    let savedGraphArray = JSON.stringify(graphs);
    let savedDuplicateArray = JSON.stringify(duplicates);
    var testvar;
    let currentId = JSON.stringify(window.location.href).substring(JSON.stringify(window.location.href).indexOf("?") + 1, JSON.stringify(window.location.href).length - 1);
    $.ajax({
        type: 'post',
        url: 'get_data.php',
        // add json datatype to get json
        
        data: ({sga: savedGraphArray, sda: savedDuplicateArray, id: currentId}),
        success: function (response) {
           testVar = response;
          
        }
      }); 
      document.getElementById("alert-div").style.display = "flex";
   
}
function nowsaveonly(){
    let savedGraphArray = JSON.stringify(graphs);
    let savedDuplicateArray = JSON.stringify(duplicates);
    var testvar;
    let currentId = JSON.stringify(window.location.href).substring(JSON.stringify(window.location.href).indexOf("?") + 1, JSON.stringify(window.location.href).length - 1);
    $.ajax({
        type: 'post',
        url: 'get_data.php',
        // add json datatype to get json
        
        data: ({sga: savedGraphArray, sda: savedDuplicateArray, id: currentId}),
        success: function (response) {
           testVar = response;
          
        }
      }); 
      
   
}
function ok(){
        
    document.getElementById("alert-div").style.display = "none";
}  
function onloaded(){
    let currentId = JSON.stringify(window.location.href).substring(JSON.stringify(window.location.href).indexOf("?") + 1, JSON.stringify(window.location.href).length - 1);
     if(JSON.stringify(window.location.href).indexOf("?") > -1){
       
    $.ajax({
        type: 'post',
        url: 'get_data.php',
        // add json datatype to get json
        
        data: ({loaded: "true", curr_id: currentId}),
       
        success: function (response) {
         document.getElementById("arrayData").innerHTML = response;
         loadSaved();
        }
      }); 
     }
      
}
function loadSaved(){
let arrayData =  document.getElementById("arrayData").innerHTML;
let gArray = arrayData.substring(0, arrayData.indexOf("  "));
let dArray = arrayData.substring(arrayData.indexOf("  "));

let newArr = JSON.parse(gArray);
let newdArr = JSON.parse(dArray);
graphs = newArr;
duplicates = JSON.parse(dArray);
if(graphs.length > 0){
    document.getElementById("frame0").remove();
}
for(let i = 0; i < newArr.length; i++){
    let select = document.getElementById('dropdown');
    let opt = document.createElement('option');
    select.appendChild(opt);
    
    
   
    opt.value = graphs.length - 1;
    opt.innerHTML = graphs.length;
    
    addFramePressed();
   
    
    let frame = document.createElement('INPUT');
    
    frame.setAttribute("type", "button");
    frame.setAttribute("value", i + 1);
    
    frame.setAttribute("id", "frame" + (i));
    frame.setAttribute("class", "frame");
    frame.addEventListener('click', function(){changeFrameButton(this);});
  
   
    document.getElementById("plus").before(frame);
   


   for(let x = 0; x < newArr[i].length/8; x++){
    
    

    
    

    var newDiv = document.createElement("div");
    newDiv.setAttribute("id", i);
    newDiv.setAttribute("class", "equation-holder");
    
    
    var name = document.createElement("INPUT");
    name.setAttribute("type", "text");
    name.setAttribute("value", newArr[i][x * 8 + 1]);
    name.setAttribute("placeholder", "Graph Name");
    name.setAttribute("id", "name" + numGraphs.toString());
    name.setAttribute("class", "graph-name");
    name.addEventListener("input", function(){updateName(this);});
    newDiv.appendChild(name);
    
    
    var text = document.createElement("INPUT");
    text.setAttribute("type", "text");
   
    text.setAttribute("value", newArr[i][x * 8]);
    text.setAttribute("placeholder", "Equation");
    text.setAttribute("id", "text" + numGraphs.toString());
    text.setAttribute("class", "equation");
    text.addEventListener("input", function(){updateEq(this);});
    newDiv.appendChild(text);
    
    var colorInput = document.createElement("INPUT");
    colorInput.setAttribute("type", "color");
    colorInput.setAttribute("id", numGraphs.toString());
    colorInput.setAttribute("class", "equation-color");
    colorInput.setAttribute("value", newArr[i][x*8 + 6]);
    colorInput.addEventListener('change', function(){updateColor(this);});
    newDiv.appendChild(colorInput);
    
    var lw = document.createElement("INPUT");
    lw.setAttribute("type", "text");
    lw.setAttribute("placeholder", "Width");
    lw.setAttribute("id", "lw" + numGraphs.toString());
    lw.setAttribute("class", "line-width");
    lw.setAttribute("value", newArr[i][x * 8 + 7]);
    lw.addEventListener('input', function(){updateLW(this);});
    newDiv.appendChild(lw);


    
    var minmaxdiv = document.createElement("div");
    minmaxdiv.setAttribute("class", "minmaxholder");
    
    var min = document.createElement("INPUT");
    min.setAttribute("type", "text");
    min.setAttribute("placeholder", "x min");
    min.setAttribute("id", "min" + numGraphs.toString());
    min.setAttribute("class", "minmax");
    min.setAttribute("value", newArr[i][x * 8 + 2]);
    min.addEventListener('input', function(){updateMin(this);});

    var max = document.createElement("INPUT");
    max.setAttribute("type", "text");
    max.setAttribute("placeholder", "x max");
    max.setAttribute("id", "max" + numGraphs.toString());
    max.setAttribute("value", newArr[i][x * 8 + 3]);
    max.setAttribute("class", "minmax");
    max.addEventListener('input', function(){updateMax(this);});
    minmaxdiv.appendChild(min);
    minmaxdiv.appendChild(max);

    var ymin = document.createElement("INPUT");
    ymin.setAttribute("type", "text");
    ymin.setAttribute("placeholder", "y min");
    ymin.setAttribute("id", "mid" + numGraphs.toString());
    ymin.setAttribute("class", "minmax");
    ymin.setAttribute("value", newArr[i][x * 8 + 4]);
    ymin.addEventListener('input', function(){updateYMin(this);});

    var ymax = document.createElement("INPUT");
    ymax.setAttribute("type", "text");
    ymax.setAttribute("placeholder", "y max");
    ymax.setAttribute("id", "mad" + numGraphs.toString());
    ymax.setAttribute("class", "minmax");
    ymax.setAttribute("value", newArr[i][x * 8 + 5]);
    ymax.addEventListener('input', function(){updateYMax(this);});
    minmaxdiv.appendChild(ymin);
    minmaxdiv.appendChild(ymax);

    newDiv.appendChild(minmaxdiv);
    


    var parent = document.getElementById("equation-holder");
    parent.appendChild(newDiv);
    document.getElementById("textbox").value = '';

    var classid = document.createElement("P");
    classid.setAttribute("class", "ci");
    classid.setAttribute("id", i + "," + numGraphs.toString());
    newDiv.appendChild(classid);

    numGraphs++;
   


 

   }





    loadGraphs();
    currentFrame = 0;
    if(newArr.length > 0){
    changeFrameButton(document.getElementById("frame0"));
    }

 



}

}
function changeFPS(x){
   
let value= parseInt(x.value) + 1;
fps = 1000 / (value);

}


       

function loadChanges(){
    alert("checking");
    onloaded();
}

