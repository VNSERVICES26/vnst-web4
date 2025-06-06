document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');

function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("show");
}

// VNST Swap integration
function openSwap() {
  const swapWindow = window.open('', 'vnstSwap', 'width=400,height=600');
  swapWindow.document.write(`
    <html>
      <head>
        <title>Buy VNST</title>
        <style>
          body, html { margin: 0; padding: 0; height: 100%; }
          iframe { width: 100%; height: 100%; border: none; }
        </style>
      </head>
      <body>
        <iframe src="https://vnservices26.github.io/vnst-SWAP/"></iframe>
      </body>
    </html>
  `);
}


  menuToggle.addEventListener('click', () => {
    menu.classList.toggle('show');
  });
});
