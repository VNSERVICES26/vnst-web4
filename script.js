// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const walletConnectBtn = document.getElementById('connectWalletBtn');
const walletOptions = document.getElementById('walletOptions');
const walletConnected = document.getElementById('walletConnected');
const walletAddress = document.getElementById('walletAddress');
const vnstAmountInput = document.getElementById('vnstAmount');
const usdtAmount = document.getElementById('usdtAmount');
const approveBtn = document.getElementById('approveBtn');
const buyBtn = document.getElementById('buyBtn');
const copyContractBtn = document.getElementById('copyContractBtn');
const statusMessages = document.getElementById('statusMessages');

// Token Details
const tokenDetails = {
  price: 0.09,
  minPurchase: 100,
  contract: '0xF9Bbb00436B384b57A52D1DfeA8Ca43fC7F11527'
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize mobile menu
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
  }
  
  // Initialize swap interface if on buy-tokens page
  if (window.location.pathname.includes('buy-tokens')) {
    initSwapInterface();
  }
  
  // Initialize animations
  initAnimations();
});

// Mobile Menu Toggle
function toggleMobileMenu() {
  navLinks.classList.toggle('active');
  mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? 
    '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
}

// Initialize Animations
function initAnimations() {
  const animateElements = document.querySelectorAll('.tokenomics-card, .roadmap-item, .swap-container');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  animateElements.forEach(el => observer.observe(el));
}

// Initialize Swap Interface
function initSwapInterface() {
  // Load token info
  loadTokenInfo();
  
  // Setup wallet connection
  setupWalletConnection();
  
  // Setup form interactions
  setupFormInteractions();
}

// Load Token Info
function loadTokenInfo() {
  document.getElementById('vnstPrice').textContent = `${tokenDetails.price} USDT`;
  document.getElementById('minBuyAmount').textContent = `${tokenDetails.minPurchase} VNST`;
  document.getElementById('vnstContract').textContent = tokenDetails.contract;
  
  // Simulate available VNST (in a real app, this would come from the contract)
  const availableVNST = 992007.70;
  document.getElementById('availableVNST').textContent = `${availableVNST.toLocaleString()} VNST`;
}

// Setup Wallet Connection
function setupWalletConnection() {
  if (walletConnectBtn) {
    walletConnectBtn.addEventListener('click', toggleWalletOptions);
  }
  
  // Setup wallet buttons
  const walletOptionBtns = document.querySelectorAll('.wallet-option');
  walletOptionBtns.forEach(btn => {
    btn.addEventListener('click', () => connectWallet(btn.getAttribute('data-wallet')));
  });
  
  // Check if wallet is already connected (e.g., page refresh)
  checkWalletConnection();
}

// Toggle Wallet Options
function toggleWalletOptions() {
  walletOptions.style.display = walletOptions.style.display === 'block' ? 'none' : 'block';
}

// Connect Wallet
async function connectWallet(walletType) {
  try {
    // Check if Web3 is injected
    if (typeof window.ethereum === 'undefined') {
      showMessage('Please install MetaMask or another Web3 wallet', 'error');
      return;
    }
    
    showMessage(`Connecting to ${walletType}...`, 'info');
    
    // Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts[0];
    
    // Display connected wallet
    walletOptions.style.display = 'none';
    walletConnected.style.display = 'block';
    walletAddress.textContent = account;
    
    // Enable buttons
    approveBtn.disabled = false;
    
    // Listen for account changes
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    
    showMessage(`Successfully connected with ${walletType}!`, 'success');
  } catch (error) {
    console.error('Wallet connection error:', error);
    showMessage(`Failed to connect: ${error.message}`, 'error');
  }
}

// Handle Accounts Changed
function handleAccountsChanged(accounts) {
  if (accounts.length === 0) {
    // Wallet disconnected
    walletConnected.style.display = 'none';
    approveBtn.disabled = true;
    buyBtn.disabled = true;
    showMessage('Wallet disconnected', 'info');
  } else {
    // Account changed
    walletAddress.textContent = accounts[0];
  }
}

// Check Wallet Connection
async function checkWalletConnection() {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts' });
      if (accounts.length > 0) {
        walletConnected.style.display = 'block';
        walletAddress.textContent = accounts[0];
        approveBtn.disabled = false;
        window.ethereum.on('accountsChanged', handleAccountsChanged);
      }
    } catch (error) {
      console.error('Error checking wallet connection:', error);
    }
  }
}

// Setup Form Interactions
function setupFormInteractions() {
  // VNST amount input
  if (vnstAmountInput) {
    vnstAmountInput.addEventListener('input', calculateUsdtAmount);
  }
  
  // Approve button
  if (approveBtn) {
    approveBtn.addEventListener('click', approveUsdt);
  }
  
  // Buy button
  if (buyBtn) {
    buyBtn.addEventListener('click', buyVnst);
  }
  
  // Copy contract button
  if (copyContractBtn) {
    copyContractBtn.addEventListener('click', copyContractAddress);
  }
}

// Calculate USDT Amount
function calculateUsdtAmount() {
  const vnstAmount = parseFloat(vnstAmountInput.value) || 0;
  const usdtValue = vnstAmount * tokenDetails.price;
  usdtAmount.textContent = usdtValue.toFixed(2);
  
  // Validate minimum amount
  if (vnstAmount >= tokenDetails.minPurchase) {
    approveBtn.disabled = false;
  } else {
    approveBtn.disabled = true;
    buyBtn.disabled = true;
  }
}

// Approve USDT
async function approveUsdt() {
  const vnstAmount = parseFloat(vnstAmountInput.value);
  
  if (!vnstAmount || vnstAmount < tokenDetails.minPurchase) {
    showMessage(`Minimum purchase is ${tokenDetails.minPurchase} VNST`, 'error');
    return;
  }
  
  try {
    showMessage('Approving USDT...', 'info');
    
    // Simulate approval (replace with actual contract call)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    approveBtn.disabled = true;
    buyBtn.disabled = false;
    
    showMessage('USDT approved successfully! You can now buy VNST', 'success');
  } catch (error) {
    console.error('Approval error:', error);
    showMessage(`Approval failed: ${error.message}`, 'error');
  }
}

// Buy VNST
async function buyVnst() {
  const vnstAmount = parseFloat(vnstAmountInput.value);
  
  try {
    showMessage('Processing VNST purchase...', 'info');
    buyBtn.disabled = true;
    
    // Simulate purchase (replace with actual contract call)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    showMessage(`Successfully purchased ${vnstAmount} VNST!`, 'success');
    
    // Reset form
    vnstAmountInput.value = '';
    usdtAmount.textContent = '0.00';
    buyBtn.disabled = true;
  } catch (error) {
    console.error('Purchase error:', error);
    showMessage(`Purchase failed: ${error.message}`, 'error');
    buyBtn.disabled = false;
  }
}

// Copy Contract Address
function copyContractAddress() {
  navigator.clipboard.writeText(tokenDetails.contract)
    .then(() => {
      const originalText = copyContractBtn.innerHTML;
      copyContractBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
      setTimeout(() => {
        copyContractBtn.innerHTML = originalText;
      }, 2000);
    })
    .catch(err => {
      console.error('Failed to copy: ', err);
    });
}

// Show Status Message
function showMessage(text, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `status-message ${type}-message`;
  messageDiv.textContent = text;
  
  statusMessages.prepend(messageDiv);
  
  // Remove after 5 seconds
  setTimeout(() => {
    messageDiv.remove();
  }, 5000);
}

// Initialize Buy Button State
function initBuyButtonState() {
  approveBtn.disabled = true;
  buyBtn.disabled = true;
}

// Initialize on page load
initBuyButtonState();
