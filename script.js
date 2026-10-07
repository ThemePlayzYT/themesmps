const DISCORD_URL = "https://discord.gg/Ka39NRCRGm";
const SERVER_ADDRESS = "play.themesmp.in";
const SERVER_PORT = "19132";
const USER_STORAGE_KEY = "themesmp.player";
const voteLink1 = "https://topg.org/minecraft-servers/server-686814";
const voteLink2 = "https://minecraftservers.org/server/694220";
const voteLink3 = "https://minecraft.buzz/vote/themesmp-24672";
const voteLink4 = "https://minecraft-server-list.com/server/523909/";
const voteLinks = [
  { url: voteLink1, name: "TopG.org" },
  { url: voteLink2, name: "MinecraftServers.org" },
  { url: voteLink3, name: "Minecraft.Buzz" },
  { url: voteLink4, name: "Minecraft-Server-List.com" }
];

const rankProducts = [
  {
    slug: "frost",
    name: "Frost",
    image: "/public/assets/ranks/frost.png",
    price: "₹99",
    description: "A strong start for Lifesteal players.",
    perks: ["5 Auction Slots", "3 Vaults", "3 Homes", "/workbench (/craft)", "/ec", "Queue Bypass", "RTP Cooldown: 3 minutes"]
  },
  {
    slug: "storm",
    name: "Storm",
    image: "/public/assets/ranks/storm.png",
    price: "₹299",
    description: "More space and useful commands for your Lifesteal journey.",
    perks: ["10 Auction Slots", "7 Vaults", "5 Homes", "/anvil", "/ec", "/workbench (/craft)", "Queue Bypass", "RTP Cooldown: 2 minutes"]
  },
  {
    slug: "titan",
    name: "Titan",
    image: "/public/assets/ranks/titan.png",
    price: "₹499",
    description: "Expanded utilities for dedicated Lifesteal players.",
    perks: ["15 Auction Slots", "10 Vaults", "8 Homes", "/anvil", "/ec", "/workbench (/craft)", "/loom", "/grindstone", "Queue Bypass", "RTP Cooldown: 1 minute"]
  },
  {
    slug: "aura",
    name: "Aura",
    image: "/public/assets/ranks/aura.png",
    price: "₹1,199",
    description: "The highest rank, with every currently listed perk.",
    perks: ["15 Auction Slots", "15 Vaults", "10 Homes", "/anvil", "/ec", "/workbench (/craft)", "/loom", "/grindstone", "/ptime", "/kittycannon", "Queue Bypass", "RTP Cooldown: 30 seconds", "1 Shard every 10 minutes anywhere on the server"]
  }
];

const coinProducts = [
  { amount: "250 Coins", image: "/public/assets/coins/250.png", price: "₹59" },
  { amount: "500 Coins", image: "/public/assets/coins/500.png", price: "₹99" },
  { amount: "1,000 Coins", image: "/public/assets/coins/1000.png", price: "₹149" },
  { amount: "5,000 Coins", image: "/public/assets/coins/5000.png", price: "₹699" },
  { amount: "10,000 Coins", image: "/public/assets/coins/10000.png", price: "₹1,199" }
];

const staffMembers = [
  {
    username: "Theme_Playz",
    skin: "Theme_Playz",
    role: "Owner",
    accent: "#f2c75c",
    description: "Leads the ThemeSMP team and shapes server direction and community priorities."
  },
  {
    username: "PB_65",
    skin: "PB_65",
    role: "Manager",
    accent: "#eda64b",
    description: "Coordinates server operations and supports a welcoming, well-run community."
  },
  {
    username: "Nastyboyyy",
    skin: "Nocty_X",
    role: "Developer",
    accent: "#55c8e8",
    description: "Builds and maintains the custom technology powering ThemeSMP."
  },
  {
    username: "RealJayGamerz",
    skin: "RealJayGamerz",
    role: "Developer",
    accent: "#62a8ef",
    description: "Contributes to ThemeSMP's server systems and technical improvements."
  },
  {
    username: "ZuunoPlayz",
    skin: "ZuunoPlayz",
    role: "YouTube Creator",
    accent: "#ef7187",
    description: "Creates Minecraft content and shares the ThemeSMP community with viewers."
  }
];

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[character]);
}

function normalizedRoute() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function skinAsset(username) {
  const skinName = username.toLowerCase() === "nastyboyyy" ? "Nocty_X" : username;
  const localSkin = staffMembers.find((member) => member.skin.toLowerCase() === skinName.toLowerCase())?.skin;
  return localSkin
    ? `/public/assets/staff/${encodeURIComponent(localSkin)}.png`
    : `https://mc-heads.net/avatar/${encodeURIComponent(skinName)}/128`;
}

function getPlayer() {
  try {
    const username = localStorage.getItem(USER_STORAGE_KEY)?.trim();
    return username ? { username, skin: skinAsset(username) } : null;
  } catch {
    return null;
  }
}

function makeHeader() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  const currentPath = normalizedRoute();
  const player = getPlayer();
  const links = [
    ["/", "home.png", "Home"],
    ["/store", "shopping-cart.png", "Store"],
    ["/rules", "rules.png", "Rules"],
    ["/vote", "vote-yea.png", "Vote"],
    ["/staff", "group.png", "Staff"],
    ["/social", "youtube.png", "Social"]
  ];
  navbar.innerHTML = `
    <a class="brand" href="/" aria-label="ThemeSMP home"><img src="/logo.png" alt="" /><span>ThemeSMP</span></a>
    <nav class="nav-links" aria-label="Main navigation">
      ${links.map(([href, icon, label]) => `<a class="nav-item${currentPath === href || (href === "/store" && currentPath.startsWith("/store")) ? " active" : ""}" href="${href}"><img src="/${icon}" alt="" />${label}</a>`).join("")}
    </nav>
    <div class="nav-actions">
      ${player
        ? `<a class="account-chip" href="/login" aria-label="Player account for ${escapeHtml(player.username)}"><img src="${escapeHtml(player.skin)}" alt="" data-player-head /><span>${escapeHtml(player.username)}</span></a><button class="button button-outline" type="button" data-logout>Logout</button>`
        : `<a class="button button-outline" href="/login">Login</a>`}
    </div>
  `;
  navbar.querySelector("[data-player-head]")?.addEventListener("error", (event) => {
    event.currentTarget.src = "/public/assets/staff/Steve.png";
  });
  navbar.querySelector("[data-logout]")?.addEventListener("click", logoutPlayer);
}

function makeFooter() {
  const footer = document.querySelector(".footer-inner");
  if (!footer) return;
  footer.innerHTML = `
    <div class="footer-brand-block">
      <div class="footer-brand"><img src="/logo.png" alt="" />ThemeSMP</div>
      <div class="footer-address">${SERVER_ADDRESS}</div>
    </div>
    <nav class="footer-links" aria-label="Footer navigation">
      <a href="/">Home</a><a href="/store">Store</a><a href="/vote">Vote</a><a href="/staff">Staff</a><a href="/login">Login</a>
    </nav>
    <div class="footer-community">
      <strong>Community</strong>
      <a class="footer-discord" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Discord ↗</a>
      <span class="footer-credit">Crafted with ♥ by Nastyboyyy</span>
    </div>
    <p class="footer-copyright">© ThemeSMP 2026, All rights reserved.<br />We are not affiliated with Mojang, Microsoft, or any other real-world brands.</p>
  `;
}

function renderRanks() {
  const list = document.querySelector("[data-rank-list]");
  if (list) {
    list.innerHTML = rankProducts.map((rank) => `
      <article class="product-card">
        <div class="product-art"><img src="${rank.image}" alt="${rank.name} rank" /></div>
        <div class="product-info">
          <span class="eyebrow">Lifesteal rank</span><h2>${rank.name}</h2>
          <p>${rank.description}</p>
          <p class="${rank.price ? "price" : "price-undisclosed"}">${rank.price || "Price to be announced"}</p>
          <div class="rank-actions">
            <a class="button button-outline button-small" href="/store/lifesteal/ranks/${rank.slug}">PERKS</a>
            <button class="button button-gold button-small" type="button" data-purchase="${rank.name} Rank">PURCHASE</button>
          </div>
        </div>
      </article>
    `).join("");
  }

  const detail = document.querySelector("[data-rank-detail]");
  if (detail) {
    const rank = rankProducts.find((item) => item.slug === detail.dataset.rankDetail);
    if (!rank) {
      detail.textContent = "Rank details are unavailable.";
      return;
    }
    detail.innerHTML = `
      <article class="rank-detail">
        <div class="rank-detail-art"><img src="${rank.image}" alt="${rank.name} rank" /></div>
        <div class="rank-detail-info">
          <span class="eyebrow">Lifesteal rank</span><h2>${rank.name}</h2><p>${rank.description}</p>
          <div class="${rank.price ? "price" : "price-undisclosed"}">${rank.price || "Price to be announced"}</div>
          <section class="rank-perks" aria-labelledby="rank-perks-heading">
            <h3 class="rank-perks-heading" id="rank-perks-heading">PERKS</h3>
            <ul class="perk-list">${rank.perks.map((perk) => `<li>${perk}</li>`).join("")}</ul>
          </section>
          <button class="button button-gold" type="button" data-purchase="${rank.name} Rank">Purchase</button>
        </div>
      </article>
    `;
  }
}

function renderCoins() {
  const list = document.querySelector("[data-coin-list]");
  if (!list) return;
  list.innerHTML = coinProducts.map((coin) => `
    <article class="product-card">
      <div class="product-art coin-art"><img src="${coin.image}" alt="${coin.amount}" /></div>
      <div class="product-info">
        <span class="eyebrow">Lifesteal currency</span><h2>${coin.amount}</h2>
        <p class="price">${coin.price}</p>
        <button class="button button-gold button-small" type="button" data-purchase="${coin.amount}">Purchase</button>
      </div>
    </article>
  `).join("");
}

function renderStaff() {
  const list = document.querySelector("[data-staff-list]");
  if (!list) return;
  list.innerHTML = staffMembers.map((member) => `
    <article class="staff-card" style="--role-accent:${member.accent}">
      <div class="staff-avatar-wrap">
        <img class="staff-head" src="/public/assets/staff/${encodeURIComponent(member.skin)}.png" alt="${member.skin} Minecraft head" loading="eager" />
        <span class="head-fallback" aria-hidden="true"></span>
      </div>
      <span class="staff-role">${member.role}</span><h2>${member.username}</h2><p>${member.description}</p>
    </article>
  `).join("");
  list.querySelectorAll(".staff-head").forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-unavailable");
      image.alt = `${image.alt} unavailable`;
    });
  });
}

function renderVoteLinks() {
  const list = document.querySelector("[data-vote-list]");
  if (!list) return;
  list.innerHTML = voteLinks.map(({ url, name }, index) => {
    const number = index + 1;
    return `
    <article class="product-card vote-option">
      <div class="product-art"><img src="/Lime_Candle.png" alt="Lime candle" /></div>
      <div class="product-info">
        <span class="eyebrow">Vote #${number}</span>
        <h2>${escapeHtml(name)}</h2>
        <p>Cast your vote for ThemeSMP on ${escapeHtml(name)}.</p>
        <a class="button button-outline" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer" aria-label="Vote on ${escapeHtml(name)}">Vote now ↗</a>
      </div>
    </article>
  `}).join("");
}

function renderStoreInformation() {
  const section = document.querySelector("[data-store-information]");
  if (!section) return;
  section.innerHTML = `
    <div class="store-information-grid">
      <article class="store-info-card">
        <span class="eyebrow">Purchase support</span>
        <h2>Purchases handled by our team</h2>
        <p>All purchases are processed manually through our official Discord support system. Join the server and create a support ticket to order a rank or coin package; our staff will guide you through the process.</p>
        <a class="text-link" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Contact support ↗</a>
      </article>
      <article class="store-info-card">
        <span class="eyebrow">Terms &amp; conditions</span>
        <h2>Manual delivery information</h2>
        <p>Digital purchases are verified and fulfilled manually by the ThemeSMP staff team, so delivery may not be instant. Please allow time for processing. If your order has not arrived after a reasonable period, contact staff through a Discord support ticket.</p>
      </article>
    </div>
  `;
}

function addPurchaseDialog() {
  const dialog = document.createElement("dialog");
  dialog.className = "purchase-dialog";
  dialog.innerHTML = `
    <div class="dialog-content">
      <span class="eyebrow">ThemeSMP Store</span>
      <h2>Complete your purchase</h2>
      <p>To purchase this product, please join our official Discord and create a support ticket. Our staff team will assist with your order and delivery.</p>
      <div class="dialog-actions">
        <button class="button button-outline" type="button" data-dialog-close>Cancel</button>
        <a class="button button-gold" href="${DISCORD_URL}" target="_blank" rel="noopener noreferrer">Join Discord</a>
      </div>
    </div>
  `;
  document.body.append(dialog);
  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    if (event.target.closest("[data-purchase]")) dialog.showModal();
    if (event.target.closest("[data-dialog-close]") || event.target === dialog) dialog.close();
  });
}

function showToast(message) {
  const toast = document.querySelector("[data-toast]");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("visible");
  window.setTimeout(() => toast.classList.remove("visible"), 2200);
}

async function copyText(text, successMessage) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const input = document.createElement("textarea");
    input.value = text;
    input.style.position = "fixed";
    input.style.opacity = "0";
    document.body.append(input);
    input.select();
    const copied = document.execCommand("copy");
    input.remove();
    if (!copied) {
      showToast("Could not copy");
      return;
    }
  }
  showToast(successMessage);
}

function copyServerAddress() {
  return copyText(SERVER_ADDRESS, "IP COPIED");
}

function copyServerPort() {
  return copyText(SERVER_PORT, "PORT COPIED");
}

async function loadMinecraftStatus() {
  const players = document.querySelector("[data-minecraft-players]");
  if (!players) return;
  try {
    const response = await fetch(`https://api.mcstatus.io/v2/status/java/${SERVER_ADDRESS}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Minecraft status request failed (${response.status})`);
    const result = await response.json();
    if (!result.online) {
      players.textContent = "0 PLAYERS ONLINE";
      return;
    }
    const count = Number(result.players?.online);
    if (!Number.isFinite(count)) throw new Error("Minecraft status response did not include a player count");
    players.textContent = `${count.toLocaleString()} PLAYERS ONLINE`;
  } catch (error) {
    console.warn("Minecraft player count is unavailable; showing zero.", error);
    players.textContent = "0 PLAYERS ONLINE";
  }
}

async function loadDiscordCounts() {
  const online = document.querySelector("[data-discord-online]");
  if (!online) return;
  try {
    const response = await fetch("https://discord.com/api/v10/invites/Ka39NRCRGm?with_counts=true", { cache: "no-store" });
    if (!response.ok) throw new Error(`Discord invite request failed (${response.status})`);
    const data = await response.json();
    const presence = data.approximate_presence_count;
    if (!Number.isFinite(presence) || presence < 0) {
      throw new Error("Discord response did not include an online presence count");
    }
    online.textContent = `${presence.toLocaleString()} USERS ONLINE`;
  } catch (error) {
    console.warn("Discord online presence is unavailable.", error);
    online.textContent = "PRESENCE UNAVAILABLE";
  }
}

function updateLoginProfile(username) {
  const form = document.querySelector("[data-login-form]");
  const profile = document.querySelector("[data-login-profile]");
  const playerName = document.querySelector("[data-profile-name]");
  const playerHead = document.querySelector("[data-profile-head]");
  const message = document.querySelector("[data-profile-message]");
  if (!form || !profile || !playerName || !playerHead) return;
  if (!username) {
    form.hidden = false;
    profile.hidden = true;
    return;
  }
  form.hidden = true;
  profile.hidden = false;
  playerName.textContent = username;
  playerHead.src = skinAsset(username);
  playerHead.alt = `${username} Minecraft head`;
  playerHead.onerror = () => {
    playerHead.onerror = null;
    playerHead.src = "/public/assets/staff/Steve.png";
  };
  if (message) message.textContent = "Username profile saved on this device.";
}

function logoutPlayer() {
  try {
    localStorage.removeItem(USER_STORAGE_KEY);
  } catch {
    showToast("Could not clear this browser's saved profile");
    return;
  }
  makeHeader();
  updateLoginProfile("");
  showToast("Logged out");
}

function initializeLogin() {
  const form = document.querySelector("[data-login-form]");
  if (!form) return;
  updateLoginProfile(getPlayer()?.username || "");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = form.querySelector("[name=username]");
    const message = document.querySelector("[data-login-message]");
    const username = input.value.trim();
    if (!/^[A-Za-z0-9_]{3,16}$/.test(username)) {
      message.textContent = "Enter a valid Minecraft username (3–16 letters, numbers or underscores).";
      input.focus();
      return;
    }
    try {
      localStorage.setItem(USER_STORAGE_KEY, username);
    } catch {
      message.textContent = "This browser could not save your profile. Check its storage settings and try again.";
      return;
    }
    makeHeader();
    updateLoginProfile(username);
  });
  document.querySelector("[data-profile-logout]")?.addEventListener("click", logoutPlayer);
}

makeHeader();
makeFooter();
renderRanks();
renderCoins();
renderStaff();
renderVoteLinks();
renderStoreInformation();
addPurchaseDialog();
initializeLogin();

document.querySelectorAll("[data-copy-ip]").forEach((button) => {
  button.addEventListener("click", copyServerAddress);
});

document.querySelectorAll("[data-copy-port]").forEach((button) => {
  button.addEventListener("click", copyServerPort);
});
loadMinecraftStatus();
loadDiscordCounts();

if (document.querySelector("[data-minecraft-players]")) {
  window.setInterval(() => {
    if (!document.hidden) loadMinecraftStatus();
  }, 60_000);
}
if (document.querySelector("[data-discord-online]")) {
  window.setInterval(() => {
    if (!document.hidden) loadDiscordCounts();
  }, 5 * 60_000);
}
