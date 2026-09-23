const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

const defaultMemories = [
  {title:"The first idea",date:"2026-01-12",text:"Three friends, one late-night conversation and the idea for our own digital space."},
  {title:"Learning together",date:"2026-03-18",text:"Our first group study session — testing, automation, APIs and a lot of coffee."},
  {title:"A day worth saving",date:"2026-07-06",text:"Another special day added to the story. The little moments became big memories."}
];

const defaultPosts = [
  {author:"Friend 1",text:"New goal: build one small project every month. Let's keep each other accountable!",date:"Today"},
  {author:"Friend 2",text:"Finished a new learning module today. Sharing the notes in the Learning Vault.",date:"Yesterday"}
];

let memories = JSON.parse(localStorage.getItem("tm_memories") || "null") || defaultMemories;
let posts = JSON.parse(localStorage.getItem("tm_posts") || "null") || defaultPosts;
let files = JSON.parse(localStorage.getItem("tm_files") || "[]");

function save(){localStorage.setItem("tm_memories",JSON.stringify(memories));localStorage.setItem("tm_posts",JSON.stringify(posts));localStorage.setItem("tm_files",JSON.stringify(files));}

function renderMemories(){
  $("#memoryGrid").innerHTML = memories.map(m => `
    <article class="memory-card">
      <span class="memory-date">${new Date(m.date+"T00:00:00").toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"})}</span>
      <h3>${escapeHtml(m.title)}</h3><p>${escapeHtml(m.text)}</p>
    </article>`).join("");
}
function renderPosts(){
  $("#postFeed").innerHTML = posts.map(p => `
    <article class="post"><div class="post-meta"><div class="avatar">${escapeHtml(p.author[0]||"3").toUpperCase()}</div><strong>${escapeHtml(p.author)}</strong><span>• ${escapeHtml(p.date)}</span></div>
    <p>${escapeHtml(p.text)}</p><div class="post-actions">♡ Like &nbsp;&nbsp; 💬 Comment &nbsp;&nbsp; ↗ Share</div></article>`).join("");
}
function typeOf(name){
  const e=(name.split(".").pop()||"").toLowerCase();
  if(e==="pdf")return"pdf"; if(["doc","docx","txt","rtf"].includes(e))return"doc";
  if(["xls","xlsx","csv"].includes(e))return"sheet"; if(["ppt","pptx"].includes(e))return"slide";
  if(["jpg","jpeg","png","gif","webp","svg"].includes(e))return"image"; return"other";
}
function renderFiles(filter="all"){
  const list=filter==="all"?files:files.filter(f=>typeOf(f.name)===filter);
  $("#fileCount").textContent=files.length;
  $("#fileList").innerHTML=list.length?list.map((f,i)=>`
    <div class="file-item"><div class="file-icon">${typeOf(f.name).toUpperCase()}</div>
    <div class="file-info"><strong>${escapeHtml(f.name)}</strong><span>${formatBytes(f.size)} • ${new Date(f.added).toLocaleDateString()}</span></div>
    <button class="delete-file" onclick="removeFile(${files.indexOf(f)})" aria-label="Remove ${escapeHtml(f.name)}">Remove</button></div>`).join("")
    : `<div class="empty">No files in this category yet.</div>`;
}
function formatBytes(n){if(!n)return"0 B";const u=["B","KB","MB","GB"];let i=0;while(n>=1024&&i<3){n/=1024;i++}return n.toFixed(i?1:0)+" "+u[i]}
function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]));}
window.removeFile=i=>{files.splice(i,1);save();renderFiles(document.querySelector(".filter.active").dataset.filter)};

$("#newPostBtn").onclick=()=>$("#postDialog").showModal();
$("#shareBtn").onclick=()=>{$("#postText").value=$("#quickPost").value;$("#postAuthor").value="Friend";$("#postDialog").showModal()};
$("#postForm").addEventListener("submit",e=>{e.preventDefault();posts.unshift({author:$("#postAuthor").value,text:$("#postText").value,date:"Just now"});save();renderPosts();$("#postDialog").close();e.target.reset()});
$("#memoryBtn").onclick=()=>{$("#memoryDate").value=new Date().toISOString().slice(0,10);$("#memoryDialog").showModal()};
$("#memoryForm").addEventListener("submit",e=>{e.preventDefault();memories.unshift({title:$("#memoryTitle").value,date:$("#memoryDate").value,text:$("#memoryText").value});save();renderMemories();$("#memoryDialog").close();e.target.reset()});
$("#quickPost").addEventListener("keydown",e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();$("#shareBtn").click()}});
$("#fileInput").addEventListener("change",e=>{
  [...e.target.files].forEach(f=>files.unshift({name:f.name,size:f.size,type:f.type,added:new Date().toISOString()}));
  save();renderFiles(document.querySelector(".filter.active").dataset.filter);e.target.value="";
});
$$(".filter").forEach(b=>b.onclick=()=>{$$(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderFiles(b.dataset.filter)});
renderMemories();renderPosts();renderFiles();
