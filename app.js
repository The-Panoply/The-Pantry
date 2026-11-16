(function(){
"use strict";
var state={data:null,picks:[]};
var storageKey="the-pantry-picks-v1";
function byId(id){return document.getElementById(id)}
function node(tag,cls,text){var e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e}
function setText(id,value){byId(id).textContent=String(value)}
function loadPicks(weekId){
 try{var x=JSON.parse(localStorage.getItem(storageKey)||"{}");state.picks=x&&x.weekId===weekId&&Array.isArray(x.recipeIds)?x.recipeIds.filter(function(v){return typeof v==="string"}):[];}catch(e){state.picks=[]}
}
function savePicks(){
 try{localStorage.setItem(storageKey,JSON.stringify({weekId:state.data.week.id,recipeIds:state.picks}))}catch(e){/* Local browser storage may be unavailable. */}
}
function plateGraphic(){
 var wrap=node("div","photo-pending");wrap.innerHTML='<svg viewBox="0 0 56 56" aria-hidden="true"><circle cx="28" cy="28" r="18"></circle><circle cx="28" cy="28" r="12"></circle><path d="M6 14v28M3 14v10m6-10v10M48 14v28m-4-28h4"></path></svg>';
 wrap.appendChild(node("span",null,"Photograph pending"));return wrap;
}
function makeCard(recipe){
 var card=node("article","recipe-card");
 var photo=node(recipe.sourceUrl?"a":"div","recipe-photo");
 if(recipe.sourceUrl){photo.href=recipe.sourceUrl;photo.target="_blank";photo.rel="noopener noreferrer";photo.setAttribute("aria-label","View original recipe: "+recipe.title)}
 if(recipe.imageUrl&&recipe.imageStatus==="verified"){
  var img=node("img");img.src=recipe.imageUrl;img.alt=recipe.title;img.loading="lazy";img.referrerPolicy="no-referrer";
  img.addEventListener("error",function(){photo.replaceChildren(plateGraphic())});
  photo.appendChild(img);
 }else photo.appendChild(plateGraphic());
 card.appendChild(photo);
 var body=node("div","recipe-body");
 var labels=node("div","recipe-labels");
 labels.appendChild(node("span","recipe-category",recipe.category||"Recipe"));
 var publisher=node(recipe.publisherUrl?"a":"span","recipe-publisher",recipe.publisher||"Source pending");
 if(recipe.publisherUrl){publisher.href=recipe.publisherUrl;publisher.target="_blank";publisher.rel="noopener noreferrer"}
 labels.appendChild(publisher);
 body.appendChild(labels);
 body.appendChild(node("h2","recipe-title",recipe.title));
 if(recipe.description)body.appendChild(node("p","recipe-desc",recipe.description));
 var meta=node("div","recipe-meta");
 var prep=recipe.prepMinutes==null?"Prep —":"Prep "+recipe.prepMinutes+" min";
 var cook=recipe.cookMinutes==null?"Cook —":"Cook "+recipe.cookMinutes+" min";
 meta.appendChild(node("span",null,prep));meta.appendChild(node("span",null,cook));
 if(typeof recipe.ratingAverage==="number"&&typeof recipe.ratingCount==="number")meta.appendChild(node("span",null,"★ "+recipe.ratingAverage.toFixed(2)+" ("+recipe.ratingCount+")"));
 body.appendChild(meta);
 var bottom=node("div","recipe-bottom");
 if(recipe.sourceUrl){
  var link=node("a","source-link","View recipe");link.href=recipe.sourceUrl;link.target="_blank";link.rel="noopener noreferrer";bottom.appendChild(link);
 }else bottom.appendChild(node("span","preview-label","Source link pending"));
 var selected=state.picks.includes(recipe.id);
 var button=node("button","pick-button"+(selected?" is-selected":""),selected?"✓ Selected":"Select");
 button.type="button";button.setAttribute("aria-pressed",selected?"true":"false");
 button.addEventListener("click",function(){togglePick(recipe.id)});
 bottom.appendChild(button);body.appendChild(bottom);card.appendChild(body);return card;
}
function togglePick(id){
 if(!state.data)return;
 if(state.picks.includes(id))state.picks=state.picks.filter(function(x){return x!==id});
 else state.picks.push(id);
 savePicks();render();
}
function render(){
 var recipes=state.data.recipes||[];
 var grid=byId("recipe-grid");grid.replaceChildren();
 recipes.forEach(function(recipe){grid.appendChild(makeCard(recipe))});
 var selected=recipes.filter(function(r){return state.picks.includes(r.id)});
 setText("pick-count",selected.length);
 var selectedList=byId("selected-list");selectedList.replaceChildren();
 var groceries=byId("grocery-meals");groceries.replaceChildren();
 if(!selected.length){selectedList.appendChild(node("p","empty-state","No meals selected."));groceries.appendChild(node("p","empty-state","No meals selected."))}
 else{
  var chips=node("div","picked-items");
  selected.forEach(function(recipe){chips.appendChild(node("span","picked-chip","✓ "+recipe.title))});
  selectedList.appendChild(chips);
  var list=node("ul");
  selected.forEach(function(recipe){list.appendChild(node("li",null,recipe.title))});groceries.appendChild(list);
 }
 byId("clear-picks").hidden=!selected.length;
}
function selectedCollection(){
 var active=document.querySelector(".collection-filter.active");
 return active?active.dataset.collection:"all";
}
function renderSaved(){
 var list=byId("saved-list");list.replaceChildren();
 var recipes=state.data.savedRecipes||[];
 var query=byId("saved-search").value.trim().toLowerCase();
 var source=byId("saved-publisher").value;
 var collection=selectedCollection();
 var collectionRecipes=recipes.filter(function(r){return collection==="all"||r.collection===collection});
 var found=collectionRecipes.filter(function(r){return (!source||r.publisher===source)&&(!query||(r.title+" "+(r.publisher||"")).toLowerCase().includes(query))});
 setText("saved-count",found.length+" of "+collectionRecipes.length);
 if(!found.length){list.appendChild(node("p","empty-state","No matching recipes."));return}
 found.forEach(function(r){
  var row=node("div","saved-row");
  row.appendChild(node("h2",null,r.title));
  var details=r.collection==="home-chef-favorites"?"Home Chef · Favorited recipe":(r.publisher||"Original publisher unverified")+" · Saved from Apple News";
  row.appendChild(node("div","saved-meta",details));list.appendChild(row);
 });
}
function setupSavedFilters(){
 var box=byId("saved-publisher"),seen=Object.create(null);
 var recipes=state.data.savedRecipes||[];
 recipes.forEach(function(r){if(r.publisher)seen[r.publisher]=true});
 Object.keys(seen).sort().forEach(function(name){var opt=node("option",null,name);opt.value=name;box.appendChild(opt)});
 setText("home-chef-count",recipes.filter(function(r){return r.collection==="home-chef-favorites"}).length);
 setText("apple-news-count",recipes.filter(function(r){return r.collection==="apple-news"}).length);
 setText("all-saved-count",recipes.length);
}
document.querySelectorAll(".collection-filter").forEach(function(button){
 button.addEventListener("click",function(){
  document.querySelectorAll(".collection-filter").forEach(function(b){
   var active=b===button;b.classList.toggle("active",active);b.setAttribute("aria-pressed",active?"true":"false");
  });
  byId("saved-publisher").value="";
  if(state.data)renderSaved();
 });
});
byId("saved-search").addEventListener("input",function(){if(state.data)renderSaved()});
byId("saved-publisher").addEventListener("change",function(){if(state.data)renderSaved()});
function tab(name){
 document.querySelectorAll(".tab").forEach(function(t){var active=t.dataset.tab===name;t.classList.toggle("active",active);if(active)t.setAttribute("aria-current","page");else t.removeAttribute("aria-current")});
 document.querySelectorAll("main > section.panel").forEach(function(p){p.hidden=p.id!=="panel-"+name});
}
document.querySelectorAll(".tab").forEach(function(btn){btn.addEventListener("click",function(){tab(btn.dataset.tab)})});
byId("clear-picks").addEventListener("click",function(){state.picks=[];savePicks();render()});
fetch("./recipes.json",{cache:"no-store"}).then(function(r){if(!r.ok)throw Error("Could not load recipe data");return r.json()}).then(function(data){
 if(!data||!data.week||!Array.isArray(data.recipes))throw Error("Invalid recipe data");
 state.data=data;setText("week-label",data.week.label||"WEEKLY MENU");loadPicks(data.week.id);
 // Never retain picks for recipes that are no longer in the current menu.
 state.picks=state.picks.filter(function(id){return data.recipes.some(function(r){return r.id===id})});
 render();setupSavedFilters();renderSaved();
}).catch(function(){
 byId("recipe-grid").replaceChildren(node("p","empty-state","Meal data is unavailable. Please reload."));
 byId("saved-list").replaceChildren(node("p","empty-state","Saved recipes are unavailable."));
});
})();