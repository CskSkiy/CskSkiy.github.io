let instance;
let selectedNode = null;

let nodes = [];

window.onload = function(){

instance = jsPlumb.getInstance({

Connector:"Flowchart",

PaintStyle:{
stroke:"#000",
strokeWidth:2
},

Endpoint:"Dot",

EndpointStyle:{
fill:"#000"
}

});

};

function createNode(){

let id =
"NODE_" +
Date.now();

let div =
document.createElement("div");

div.className="node";

div.id=id;

div.style.left="300px";
div.style.top="200px";

div.innerHTML=`

<div class="node-tag"></div>

<div class="node-title">
新步驟
</div>

<div class="node-status">
⬜
</div>

`;

document
.getElementById("canvas")
.appendChild(div);

instance.draggable(div);

instance.addEndpoint(
id,
{
anchor:"Right"
},
{
isSource:true,
maxConnections:-1
}
);

instance.addEndpoint(
id,
{
anchor:"Left"
},
{
isTarget:true
}
);

div.onclick=function(e){

e.stopPropagation();

selectNode(div);

};

nodes.push({

id:id,

text:"新步驟",

color:"#ffffff",

tag:"",

status:"todo",

note:"",

showColor:false,

showTag:false,

showStatus:false

});

}

function selectNode(div){

selectedNode =
nodes.find(n=>n.id===div.id);

document
.getElementById("emptySelection")
.style.display="none";

document
.getElementById("nodeEditor")
.style.display="block";

nodeText.value=
selectedNode.text;

nodeColor.value=
selectedNode.color;

nodeTag.value=
selectedNode.tag;

nodeStatus.value=
selectedNode.status;

nodeNote.value=
selectedNode.note;

enableColor.checked=
selectedNode.showColor;

enableTag.checked=
selectedNode.showTag;

enableStatus.checked=
selectedNode.showStatus;

}

function updateNode(){

if(!selectedNode)
return;

selectedNode.text =
nodeText.value;

selectedNode.color =
nodeColor.value;

selectedNode.tag =
nodeTag.value;

selectedNode.status =
nodeStatus.value;

selectedNode.note =
nodeNote.value;

selectedNode.showColor=
enableColor.checked;

selectedNode.showTag=
enableTag.checked;

selectedNode.showStatus=
enableStatus.checked;

let div =
document.getElementById(
selectedNode.id
);

div.querySelector(
".node-title"
).innerText=
selectedNode.text;

div.style.background=
selectedNode.showColor
? selectedNode.color
: "#fff";

div.querySelector(
".node-tag"
).innerText=
selectedNode.showTag
? selectedNode.tag
: "";

let statusIcon="";

if(selectedNode.showStatus){

if(selectedNode.status==="todo")
statusIcon="⬜";

if(selectedNode.status==="done")
statusIcon="✅";

if(selectedNode.status==="bug")
statusIcon="🐞";

}else{

statusIcon="";

}

div.querySelector(
".node-status"
).innerText=
statusIcon;

}

function saveJson(){

let connections =
instance.getConnections();

let data={

nodes:nodes,

connections:

connections.map(c=>({

source:c.sourceId,

target:c.targetId

}))

};

let blob =
new Blob(
[
JSON.stringify(
data,
null,
2
)
],
{
type:"application/json"
}
);

let a =
document.createElement("a");

a.href=
URL.createObjectURL(blob);

a.download=
"gameflow.json";

a.click();

}

function loadJson(){

fileLoader.click();

}

fileLoader.addEventListener(
"change",
function(e){

let file =
e.target.files[0];

let reader =
new FileReader();

reader.onload=
function(){

location.reload();

setTimeout(()=>{

let data =
JSON.parse(
reader.result
);

console.log(data);

},500);

};

reader.readAsText(file);

});

function exportAI(){

let txt=
"GAME FLOW\n\n";

nodes.forEach(n=>{

txt +=
`${n.id}

內容:${n.text}
TAG:${n.tag}
狀態:${n.status}
備註:${n.note}

-----------------

`;

});

let blob=
new Blob(
[txt],
{
type:"text/plain"
}
);

let a=
document.createElement("a");

a.href=
URL.createObjectURL(blob);

a.download=
"AI_GAME_FLOW.txt";

a.click();

}