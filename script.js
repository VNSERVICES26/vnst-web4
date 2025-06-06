function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");
}

function openSwap() {
  const iframe = document.createElement("iframe");
  iframe.src = "https://vnservices26.github.io/vnst-SWAP/";
  iframe.style.width = "100%";
  iframe.style.height = "100vh";
  iframe.style.border = "none";

  document.body.innerHTML = '';
  document.body.appendChild(iframe);
}
