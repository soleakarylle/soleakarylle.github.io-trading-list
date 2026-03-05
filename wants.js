const list = document.getElementById("wantsList");
const search = document.getElementById("search");

function render(data){

list.innerHTML="";

data.forEach(item=>{

const div=document.createElement("div");
div.className="item";

div.innerHTML=`
<strong>${item.show}</strong><br>
${item.date} — ${item.city}<br>
${item.format}<br>
<a href="${item.link}" target="_blank">Encora Link</a>
`;

list.appendChild(div);

});

}

render(wants);

search.addEventListener("input",()=>{

const term=search.value.toLowerCase();

render(wants.filter(r =>
r.show.toLowerCase().includes(term) ||
r.city.toLowerCase().includes(term)
));

});
