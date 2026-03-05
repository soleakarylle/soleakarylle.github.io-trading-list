
const data = (window.collection || []).concat(window.wants || [])
const list = document.getElementById("list")

const search = document.getElementById("search")
const showFilter = document.getElementById("showFilter")
const yearFilter = document.getElementById("yearFilter")
const formatFilter = document.getElementById("formatFilter")

const popup = document.getElementById("popup")
const popupTitle = document.getElementById("popupTitle")
const popupDetails = document.getElementById("popupDetails")

document.getElementById("close").onclick=()=>popup.classList.add("hidden")

function unique(field){
return [...new Set(data.map(d=>d[field]).filter(Boolean))].sort()
}

function populateFilters(){

unique("show").forEach(v=>{
let o=document.createElement("option")
o.value=v
o.textContent=v
showFilter.appendChild(o)
})

unique("year").forEach(v=>{
let o=document.createElement("option")
o.value=v
o.textContent=v
yearFilter.appendChild(o)
})

}

populateFilters()

function filterData(){

return data.filter(d=>{

let s=search.value.toLowerCase()

if(s && !JSON.stringify(d).toLowerCase().includes(s)) return false
if(showFilter.value && d.show!=showFilter.value) return false
if(yearFilter.value && d.year!=yearFilter.value) return false
if(formatFilter.value && d.format!=formatFilter.value) return false

return true

})

}

function groupByShow(items){

const map={}

items.forEach(i=>{

if(!map[i.show]) map[i.show]=[]
map[i.show].push(i)

})

return map

}

function render(){

list.innerHTML=""

const grouped = groupByShow(filterData())

Object.keys(grouped).sort().forEach(show=>{

const group=document.createElement("div")
group.className="show-group"

const title=document.createElement("h2")
title.textContent=show

group.appendChild(title)

grouped[show].forEach(rec=>{

const row=document.createElement("div")
row.className="record"

row.innerHTML=`
<span>${rec.year||""}</span>
<span class="tag">${rec.format||""}</span>
${rec.nft?'<span class="tag nft">NFT</span>':''}
${rec.nfs?'<span class="tag nfs">NFS</span>':''}
`

row.onclick=()=>{

popupTitle.textContent=show
popupDetails.textContent=JSON.stringify(rec,null,2)
popup.classList.remove("hidden")

}

group.appendChild(row)

})

list.appendChild(group)

})

}

search.oninput=render
showFilter.onchange=render
yearFilter.onchange=render
formatFilter.onchange=render

render()
