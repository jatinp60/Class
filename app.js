const boxes=[
{id:1,name:"Global Energy Box",type:"energy",price:29.99,count:"6 drinks",tag:"Best seller",bg:"#ffe0cb",pack:"#171717",desc:"Energy drinks from multiple regions with citrus, berry, tropical, and zero-sugar variety.",long:"Built for people who want energy drinks without getting the same flavor profile every time. This box balances recognizable styles with harder-to-find international cans."},
{id:2,name:"Asia After Dark",type:"regional",price:31.99,count:"8 drinks",tag:"New",bg:"#e7e0ff",pack:"#6b3df1",desc:"Sparkling fruit drinks, tea, coffee, and regional convenience-store favorites.",long:"A curated late-night route through Asian beverage culture, mixing bright sodas, tea-based drinks, coffee, and a few surprises."},
{id:3,name:"Europe Mix Box",type:"regional",price:28.99,count:"8 drinks",tag:"Regional",bg:"#dfeeff",pack:"#2f5f9a",desc:"European sodas, sparkling drinks, and café-inspired bottles.",long:"A broad European mix designed for customers who want a regional theme without being locked into one flavor category."},
{id:4,name:"Zero Sugar Box",type:"lifestyle",price:27.99,count:"6 drinks",tag:"Low sugar",bg:"#e1f6e8",pack:"#277a48",desc:"Zero-sugar and lower-sugar energy, soda, and sparkling drinks.",long:"A lighter mix with clear labeling and an emphasis on lower-sugar choices while still keeping flavor variety high."},
{id:5,name:"Tropical Rush Box",type:"energy",price:30.99,count:"6 drinks",tag:"Bold flavors",bg:"#fff0a8",pack:"#ff7448",desc:"Mango, passionfruit, citrus, guava, and tropical energy flavors.",long:"Bright, fruity, and intentionally high-impact. This box is designed around adventurous tropical flavors and energetic packaging."},
{id:6,name:"Mystery Mix Box",type:"surprise",price:29.99,count:"8 drinks",tag:"Most adventurous",bg:"#f1dff8",pack:"#7f3da8",desc:"The most interesting combination we can build each month.",long:"No region rules and no fixed flavor family. This is the highest-surprise option for customers who care most about discovery."}
];
let cart=JSON.parse(localStorage.getItem("worldsip_cart_boxes")||"[]");
let discount=localStorage.getItem("worldsip_discount")==="true";

function money(n){return "$"+n.toFixed(2)}
function getBox(id){return boxes.find(b=>b.id===Number(id))}
function cardHTML(b){
return `<article class="card box-card" onclick="location.href='product.html?id=${b.id}'">
<div class="box-visual" style="background:${b.bg}">
<span class="badge">${b.tag}</span>
<div class="box-pack" style="background:${b.pack}">${b.name.toUpperCase()}<small>${b.count}</small></div>
</div>
<div class="pad"><div class="eyebrow">${b.count}</div><div class="title">${b.name}</div><div class="desc">${b.desc}</div>
<div class="row" style="margin-top:14px"><span class="price">${money(b.price)}</span><button class="add" aria-label="Add ${b.name} to cart" onclick="event.stopPropagation();addBox(${b.id})">+</button></div></div></article>`;
}
function renderBoxes(target="boxGrid",filter="all"){
 const el=document.getElementById(target); if(!el)return;
 el.innerHTML=boxes.filter(b=>filter==="all"||b.type===filter).map(cardHTML).join("");
}
function addBox(id){const b=getBox(id);cart.push({...b,uid:Date.now()+Math.random()});saveCart();notify(b.name+" added to cart")}
function addSubscription(){cart.push({id:100,name:"Monthly WorldSip Club",type:"subscription",price:29.99,count:"1 box / month",bg:"#eee8ff",pack:"#6b3df1",uid:Date.now()+Math.random()});saveCart();openCart()}
function saveCart(){localStorage.setItem("worldsip_cart_boxes",JSON.stringify(cart));updateCart()}
function updateCart(){
 const count=document.getElementById("cartCount"); if(count)count.textContent=cart.length;
 const list=document.getElementById("cartItems");
 if(list) list.innerHTML=cart.length?cart.map((b,i)=>`<div class="cart-item"><div class="swatch" style="background:${b.bg}"></div><div><b>${b.name}</b><div style="font-size:12px;color:#777">${b.count}</div></div><div><b>${money(b.price)}</b><br><button class="remove" onclick="removeItem(${i})">remove</button></div></div>`).join(""):`<p style="color:#777">Your cart is empty.</p>`;
 const subtotal=cart.reduce((s,b)=>s+b.price,0), total=discount?subtotal*.9:subtotal;
 const t=document.getElementById("cartTotal");if(t)t.textContent=money(total);
 const co=document.getElementById("checkoutTotal");if(co)co.textContent=money(total+(cart.length?4.99:0));
}
function removeItem(i){cart.splice(i,1);saveCart()}
function openCart(){document.getElementById("cartDrawer")?.classList.add("open");document.getElementById("overlay")?.classList.add("show")}
function closeCart(){document.getElementById("cartDrawer")?.classList.remove("open");document.getElementById("overlay")?.classList.remove("show")}
function applyPromo(){
 const promo=document.getElementById("promo"),msg=document.getElementById("promoMsg");
 if((promo?.value||"").trim().toUpperCase()==="WORLD10"){discount=true;localStorage.setItem("worldsip_discount","true");if(msg)msg.textContent="WORLD10 applied — 10% off";updateCart()}else if(msg)msg.textContent="That code is not valid.";
}
function notify(msg){const t=document.getElementById("toast");if(!t)return;t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
function openDeal(){
 const d=document.getElementById("dealDialog"); if(d && !sessionStorage.getItem("worldsip_offer")){setTimeout(()=>{d.showModal();sessionStorage.setItem("worldsip_offer","1")},1700)}
}
function unlockDeal(){
 const email=document.getElementById("dealEmail");if(!(email?.value||"").includes("@")){notify("Enter a valid email");return}
 discount=true;localStorage.setItem("worldsip_discount","true");document.getElementById("dealDialog")?.close();notify("WORLD10 unlocked");
}
function goCheckout(){location.href="checkout.html"}
function navHTML(){
 return `<div class="topbar">Free shipping on 2+ boxes · <strong>WORLD10</strong> saves 10%</div>
 <nav class="site-nav"><div class="container nav-inner">
 <a class="logo" href="index.html">World<span>Sip</span></a>
 <div class="nav-links"><a href="index.html">Home</a><a href="#boxes">Boxes</a><a href="#drinks">Drinks</a><a href="#reviews">Reviews</a><a href="#communityHub">Community</a><a href="#communityHub">Community</a><a href="#faq">FAQ</a></div>
 <div class="nav-actions"><a class="btn light" href="#boxes">Shop boxes</a><button class="icon-btn" aria-label="Open cart" onclick="openCart()"><span class="cart-icon"></span><span class="cart-count" id="cartCount">0</span></button></div>
 </div></nav>`;
}
function footerHTML(){
 return `<footer class="footer"><div class="container footer-inner"><div><b>WorldSip</b> · Drinks worth discovering</div><div><a href="#boxes">Boxes</a> · <a href="#reviews">Reviews</a> · <a href="#communityHub">Community</a> · <a href="#faq">FAQ</a></div></div></footer>`;
}
function globalUI(){
 return `<div class="overlay" id="overlay" onclick="closeCart()"></div>
 <aside class="drawer" id="cartDrawer"><div class="drawer-head"><button class="close" aria-label="Close cart" onclick="closeCart()">×</button><h3 style="margin:5px 0">Your cart</h3></div><div class="drawer-body" id="cartItems"></div><div class="drawer-foot">
 <input class="field" id="promo" placeholder="Discount code"><button class="btn light" style="width:100%" onclick="applyPromo()">Apply code</button><div id="promoMsg" style="font-size:13px;color:#666;margin-top:8px"></div><div class="total"><span>Total</span><span id="cartTotal">$0.00</span></div><button class="btn dark" style="width:100%" onclick="goCheckout()">Checkout</button></div></aside>
 <dialog id="dealDialog" class="deal"><div class="modal-pad"><button class="close" aria-label="Close offer" onclick="dealDialog.close()">×</button><div class="kicker" style="background:#fff7d6;color:#5f4300">WELCOME OFFER</div><h3 style="font-size:34px;letter-spacing:-1.5px;margin:10px 0">Take 10% off your first box.</h3><p style="line-height:1.55;color:#4c3924">Join the list and unlock code <b>WORLD10</b>.</p><input class="field" id="dealEmail" type="email" placeholder="you@example.com"><button class="btn dark" style="width:100%" onclick="unlockDeal()">Unlock 10% off</button></div></dialog><div class="toast" id="toast" role="status" aria-live="polite"></div>`;
}
document.addEventListener("DOMContentLoaded",()=>{updateCart();openDeal()});