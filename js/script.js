/* =========================================================
   CONFIGURAÇÕES — edite aqui os dados reais quando tiver
   ========================================================= */
const CONFIG = {
  whatsapp: "5583999990000",          // DDI + DDD + número (somente dígitos) — FICTÍCIO
  telefone: "(83) 9 9999-0000",       // exibido no site — FICTÍCIO
  telefoneLink: "+5583999990000",
  email: "contato@novanettelecom.com.br",
  cnpj: "00.000.000/0001-00",
  endereco: "Centro, Piancó – PB, 58765-000",
  mapaBusca: "Piancó, PB",            // troque pelo endereço da loja quando abrir
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
};

const PLANOS = [
  {nome:"Nova Start", mega:300, preco:"69", cent:"90", itens:["Wi‑Fi dual band","App Standard","Suporte 24h"]},
  {nome:"Nova Plus", mega:600, preco:"89", cent:"90", top:true, itens:["Roteador Wi‑Fi 6","Apps Standard","Clube de vantagens","Suporte prioritário"]},
  {nome:"Nova Ultra", mega:800, preco:"109", cent:"90", itens:["Roteador Wi‑Fi 6","Apps Premium","Clube de vantagens","Suporte prioritário"]},
  {nome:"Nova Giga", mega:1, giga:true, preco:"149", cent:"90", itens:["Wi‑Fi 6 + ponto extra (mesh)","Apps Premium","Clube de vantagens","Visita técnica VIP"]},
];

const APPS_STD = [
  ["Filmes & Séries","streaming","#ff6b3d","i-film"],["Esportes","ao vivo","#2fb344","i-ball"],["Kids","desenhos","#ffb020","i-kid"],
  ["Revistas","digitais","#7b61ff","i-news"],["Cursos","online","#1e9bd7","i-cap"],["Saúde","bem‑estar","#ff4f81","i-heart"],
];
const APPS_PREM = [
  ["Cinema Max","lançamentos","#5b3dff","i-film"],["Música","sem anúncios","#e93a8a","i-music"],["Fitness","treinos","#ff7a00","i-yoga"],
  ["Games","cloud","#14b8a6","i-game"],["Leitura","e‑books","#0ea5e9","i-book"],["Esportes+","premium","#16a34a","i-ball"],
];

const FAQ = [
  ["A NovaNet atende no meu endereço?","Estamos expandindo a rede de fibra em Piancó e região. Envie seu endereço pelo WhatsApp e confirmamos a viabilidade técnica em poucos minutos."],
  ["Quanto tempo leva a instalação?","Após a confirmação do cadastro, a instalação é agendada em até 48 horas úteis, sem custo de instalação."],
  ["O roteador está incluso?","Sim! Todos os planos incluem roteador em comodato. A partir do Nova Plus o equipamento é Wi‑Fi 6."],
  ["Como pego a 2ª via do boleto ou o PIX?","É só clicar em “2ª via boleto / PIX” no autoatendimento ou chamar no WhatsApp. Enviamos na hora."],
  ["Tem plano para empresas?","Sim, temos soluções com IP fixo e link dedicado. Fale com nosso time comercial pelo WhatsApp."],
];

/* ---------- Helpers ---------- */
const $ = (s,c=document)=>c.querySelector(s), $$=(s,c=document)=>[...c.querySelectorAll(s)];
const wa = msg => `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(msg||"Olá, NovaNet!")}`;
const svg = id => `<svg><use href="#${id}"/></svg>`;

/* ---------- Preenche dados ---------- */
$$(".js-wa").forEach(a=>{a.href=wa(a.dataset.msg);a.target="_blank";a.rel="noopener"});
$$(".js-tel").forEach(a=>a.href="tel:"+CONFIG.telefoneLink);
$$(".js-tel-label").forEach(e=>e.textContent=CONFIG.telefone);
$$(".js-wa-label").forEach(e=>e.textContent=CONFIG.telefone);
$$(".js-addr").forEach(e=>e.textContent=CONFIG.endereco);
$$(".js-cnpj").forEach(e=>e.textContent=CONFIG.cnpj);
$$(".js-mail").forEach(e=>e.textContent=CONFIG.email);
$$(".js-insta").forEach(e=>e.href=CONFIG.instagram);
$$(".js-fb").forEach(e=>e.href=CONFIG.facebook);
$$(".js-route").forEach(e=>e.href="https://www.google.com/maps/dir/?api=1&destination="+encodeURIComponent(CONFIG.mapaBusca));
$("#yr").textContent=new Date().getFullYear();

/* ---------- Planos ---------- */
$("#planGrid").innerHTML = PLANOS.map((p,i)=>`
  <div class="plan ${p.top?'top':''} rv d${i+1}">
    ${p.top?'<span class="ribbon">★ Mais vendido</span>':''}
    <span class="pname">${p.nome}</span>
    <div class="speed">${p.mega}<sup>${p.giga?'GIGA':'MEGA'}</sup></div>
    <div class="price"><small>R$</small><b>${p.preco}</b><em>,${p.cent}</em><span>/mês</span></div>
    <span class="badge-free">Instalação gratuita</span>
    <ul>${p.itens.map(t=>`<li>${svg('i-check')}${t}</li>`).join("")}</ul>
    <a class="btn ${p.top?'btn-lime':'btn-green'}" target="_blank" rel="noopener"
       href="${wa(`Olá! Tenho interesse no plano ${p.nome} (${p.mega} ${p.giga?'Giga':'Mega'} por R$ ${p.preco},${p.cent}/mês).`)}">Contratar ${svg('i-arrow')}</a>
  </div>`).join("");

/* indicador de swipe (mobile) */
const grid=$("#planGrid"), hint=$("#swipeHint");
hint.innerHTML=PLANOS.map((_,i)=>`<i class="${i===1?'on':''}"></i>`).join("");
grid.addEventListener("scroll",()=>{
  const cards=$$(".plan",grid), mid=grid.scrollLeft+grid.clientWidth/2;
  let best=0,bd=1e9; cards.forEach((c,i)=>{const d=Math.abs(c.offsetLeft+c.offsetWidth/2-mid); if(d<bd){bd=d;best=i}});
  $$("i",hint).forEach((d,i)=>d.classList.toggle("on",i===best));
},{passive:true});
// no mobile começa centralizado no plano em destaque
if (matchMedia("(max-width:640px)").matches) requestAnimationFrame(()=>{const t=$(".plan.top",grid); grid.scrollLeft=t.offsetLeft-(grid.clientWidth-t.offsetWidth)/2;});

/* ---------- Apps ---------- */
const appHtml = a=>`<div class="app"><i style="background:${a[2]}22;color:${a[2]}">${svg(a[3])}</i><b>${a[0]}<small>${a[1]}</small></b></div>`;
$("#appsStd").innerHTML=APPS_STD.map(appHtml).join("");
$("#appsPrem").innerHTML=APPS_PREM.map(appHtml).join("");

/* ---------- FAQ ---------- */
$("#faq").innerHTML=FAQ.map((f,i)=>`<div class="qa rv d${(i%4)+1}"><button>${f[0]}<i>${svg('i-plus')}</i></button><div class="ans"><p>${f[1]}</p></div></div>`).join("");
$$(".qa button").forEach(b=>b.addEventListener("click",()=>{
  const q=b.parentElement, open=q.classList.contains("open");
  $$(".qa.open").forEach(o=>{o.classList.remove("open");$(".ans",o).style.maxHeight=0});
  if(!open){q.classList.add("open");const a=$(".ans",q);a.style.maxHeight=a.scrollHeight+"px"}
}));

/* ---------- Marquee ---------- */
const words=["Ultra velocidade","Fibra óptica","Wi‑Fi 6","Suporte 24h","Piancó conectada"];
$$(".marq .row").forEach(r=>r.innerHTML=(words.map(w=>`<span>${w}</span>`).join("")).repeat(3));

/* ---------- Formulário → WhatsApp ---------- */
$("#form").addEventListener("submit",e=>{
  e.preventDefault();
  const m=`*Contato pelo site*\nNome: ${$("#fn").value}\nE-mail: ${$("#fe").value||"-"}\nWhatsApp: ${$("#fw").value}\nAssunto: ${$("#fs").value}\n\n${$("#fm").value}`;
  const l=$("#fwa"); l.href=wa(m); l.style.display="flex"; try{const w=window.open(wa(m),"_blank"); if(w) l.style.display="none";}catch(_){}
});

/* ---------- Menu ---------- */
const burger=$("#burger"), menu=$("#menu");
burger.addEventListener("click",()=>{burger.classList.toggle("on");menu.classList.toggle("open")});
$$("#menu a").forEach(a=>a.addEventListener("click",()=>{burger.classList.remove("on");menu.classList.remove("open")}));

/* ---------- Reveal + contadores ---------- */
const countUp=(el)=>{const to=+el.dataset.to,t0=performance.now(),dur=1600;
  const step=t=>{const p=Math.min((t-t0)/dur,1),e=1-Math.pow(1-p,3);el.textContent=Math.round(to*e);if(p<1)requestAnimationFrame(step)};requestAnimationFrame(step)};
const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){en.target.classList.add("in");$$(".cnt",en.target).forEach(countUp);if(en.target.classList.contains("cnt"))countUp(en.target);io.unobserve(en.target)}}),{threshold:.15,rootMargin:"0px 0px -40px 0px"});
$$(".rv").forEach(el=>io.observe(el));

/* ---------- Medidor de velocidade do hero ---------- */
(function gauge(){
  const v=$("#gval"),n=$("#gnum"),dl=$("#gdl"),ul=$("#gul"),max=396,target=600;
  const run=()=>{const t0=performance.now();
    const step=t=>{const p=Math.min((t-t0)/2600,1),e=1-Math.pow(1-p,4),jit=p<1?Math.sin(t/60)*12*(1-p):0,val=Math.max(0,Math.round(target*e+jit));
      n.textContent=val;v.style.strokeDashoffset=max-(max*Math.min(val/700,1));dl.textContent=Math.round(target*e);ul.textContent=Math.round(300*e);
      if(p<1)requestAnimationFrame(step);else setTimeout(run,5000)};requestAnimationFrame(step)};
  setTimeout(run,700);
})();

/* ---------- Parallax (scroll + mouse) ---------- */
const reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
const header=$("#top");
const pY=$$("[data-speed]"), pX=$$("[data-speed-x]"), marq=$$("[data-marq]"), depth=$$(".hero [data-depth]");
let mx=0,my=0,cx=0,cy=0,sy=scrollY;
addEventListener("mousemove",e=>{mx=e.clientX/innerWidth-.5;my=e.clientY/innerHeight-.5},{passive:true});
function frame(){
  sy=scrollY; header.classList.toggle("solid",sy>40);
  if(!reduce){
    const vh=innerHeight;
    pY.forEach(el=>{
      const r=el.parentElement.getBoundingClientRect();
      if(r.bottom<-200||r.top>vh+200)return;
      const off=(r.top+r.height/2-vh/2)*-parseFloat(el.dataset.speed);
      el.style.setProperty("--py",off.toFixed(1)+"px");
    });
    pX.forEach(el=>{const r=el.parentElement.getBoundingClientRect();el.style.transform=`translateX(calc(-50% + ${((r.top)*parseFloat(el.dataset.speedX)).toFixed(1)}px))`});
    marq.forEach(el=>{const r=el.parentElement.getBoundingClientRect(),d=+el.dataset.marq;el.style.transform=`translateX(${(d<0?-300+r.top*.4:-1100-r.top*.4).toFixed(1)}px)`});
    cx+=(mx-cx)*.07; cy+=(my-cy)*.07;
    depth.forEach(el=>{const d=+el.dataset.depth;el.style.setProperty("--mx",(cx*d).toFixed(1)+"px");el.style.setProperty("--my",(cy*d).toFixed(1)+"px")});
    // combina scroll + mouse num único transform
    [...new Set([...pY,...depth])].forEach(el=>{
      el.style.translate=`var(--mx,0px) calc(var(--py,0px) + var(--my,0px))`;
    });
  }
  requestAnimationFrame(frame);
}
frame();

/* ---------- Cartão 3D (tilt) ---------- */
const card=$("#ccard"), wrap3d=$("#cards3d");
const baseT="translate(-50%,-42%)";
card.style.transform=baseT+" rotate(4deg)";
wrap3d.addEventListener("mousemove",e=>{const r=wrap3d.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
  card.style.transform=`${baseT} rotateY(${x*22}deg) rotateX(${-y*18}deg) rotate(2deg)`});
wrap3d.addEventListener("mouseleave",()=>card.style.transform=baseT+" rotate(4deg)");
