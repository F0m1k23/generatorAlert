// ==========================
// CONSTANTS & STATE
// ==========================

const form = document.querySelector("form");
const block2 = document.querySelector(".block2");
const fontSizeRange = document.querySelector(".textSize");
const fontSizeRangeTitle = document.querySelector(".titleSize");
const showLogoCheckbox = document.getElementById("showLogo");


const alertImage = [
  { name: "success", logo: "✅" },
  { name: "warning", logo: "⚠️" },
  { name: "error", logo: "❌" },
  { name: "dennied", logo: "🚫" },
  { name: "info", logo: "ℹ️" },
  { name: "question", logo: "❓" },
  { name: "stop", logo: "🛑" },
  { name: "fire", logo: "🔥" },
  { name: "bug", logo: "🐞" },
  { name: "light", logo: "💡" },
];

const iconTabs = [
  { name: "standard", active: true },
  { name: "custom", active: false },
];


const style = {
  borderRadius: "0px",
  shadow: "none",
  textUper: "none",
  fontSize: "15px",
  fontSizeTitle: "16px",
  display: "block",
};

// ==========================
// UI EVENTS
// ==========================

form.addEventListener("change", (e) => {
  updateAlert();  
});
document.getElementById("titleText").addEventListener("input", () => {
  updateAlert();
});

document.getElementById("subtitleText").addEventListener("input", () => {
  updateAlert();
});


document.querySelectorAll(".iconOption").forEach((icon) => {
  icon.addEventListener("click", () => {
    selectedCustomIcon = icon.outerHTML;
    document
      .querySelectorAll(".iconOption")
      .forEach((i) => i.classList.remove("selected"));
    icon.classList.add("selected");
    updateAlert();
  });
});

// ==========================
// UPDATE ALERT FUNCTION
// ==========================

function updateAlert() {
  const borderRadiusChecked = document.getElementById("borederRadius").checked;
  const shadowChecked = document.getElementById("shadow").checked;
  const textUperChecked = document.getElementById("textUper").checked;
  const titleText = document.getElementById("titleText").value;
  const subtitleText = document.getElementById("subtitleText").value;
  

  style.borderRadius = borderRadiusChecked ? "10px" : "0px";
  style.shadow = shadowChecked ? "0 0 10px rgba(0, 0, 0, 0.5)" : "none";
  style.textUper = textUperChecked ? "uppercase" : "none";
  style.fontSize = Number(fontSizeRange.value) + 10 + "px";
  style.fontSizeTitle = Number(fontSizeRangeTitle.value) + 14 + "px";
  style.display = showLogoCheckbox.checked ? "block" : "none";

  let currentLogo = "✅";
  const selectedRadio = document.querySelector("input[name='typeLogo']:checked");
  const found = alertImage.find(item => item.name === selectedRadio?.value);
  
  if (found) currentLogo = found.logo;

  const useCustom = iconTabs.find((tab) => tab.name === "custom")?.active;

  block2.innerHTML = "";
  createAlert(
    style,
    currentLogo,
    titleText ? titleText : "Проверьте свой почтовый ящик!",
    subtitleText ? subtitleText : "У вас в почтовом ящике одно новое непрочитанное сообщение.",
    useCustom ? selectedCustomIcon : null
  );
}


// ==========================
// CREATE ELEMENTS & ALERT
// ==========================

function createElement(tag, className, textContent) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (textContent) el.textContent = textContent;
  return el;
}

function createAlert(
  style = {},
  logo = "✅",
  title = "Проверьте свой почтовый ящик!",
  text = "У вас в почтовом ящике одно новое непрочитанное сообщение.",
) {
  const alert = createElement("div", "alert");
  const alertWrapper = createElement("div", "alertWrapper");
  alert.appendChild(alertWrapper);

  const alertLogo = createElement("div", "alertLogo");
  alertLogo.style.display = style.display;
  alertLogo.textContent = logo;
  alertWrapper.appendChild(alertLogo);

  const textBlock = createElement("div", "textBlock");
  const alertTitle = createElement("h3", "alertTitle", title);
  const alertText = createElement("p", "alertText", text);
  textBlock.appendChild(alertTitle);
  textBlock.appendChild(alertText);
  alertWrapper.appendChild(textBlock);

  const alertClose = createElement("div", "alertClose", "⨉");
  alert.appendChild(alertClose);
  alertClose.addEventListener("click", () => alert.remove());

  alert.style.borderRadius = style.borderRadius;
  alert.style.boxShadow = style.shadow;
  alert.style.textTransform = style.textUper;
  alertText.style.fontSize = style.fontSize;
  alertTitle.style.fontSize = style.fontSizeTitle;

  block2.appendChild(alert);
}

updateAlert();

const btn = document.querySelector("#getHtml");
function createModal(html, css) {
  injectModalStyles();
  injectHighlightAssets();

  const modal = document.createElement("div");
  modal.className = "modal";

  const content = document.createElement("div");
  content.className = "modal-content";

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-modal";
  closeBtn.textContent = "⨉";

  const tabs = document.createElement("div");
  tabs.className = "tabs";

  const htmlTab = document.createElement("button");
  htmlTab.className = "tab-btn active";
  htmlTab.dataset.tab = "html";
  htmlTab.textContent = "HTML";

  const cssTab = document.createElement("button");
  cssTab.className = "tab-btn";
  cssTab.dataset.tab = "css";
  cssTab.textContent = "CSS";

  tabs.append(htmlTab, cssTab);

  // HTML
  const preHtml = document.createElement("pre");
  const codeHtml = document.createElement("code");
  codeHtml.className = "language-html";
  codeHtml.textContent = html;
  preHtml.appendChild(codeHtml);
  preHtml.className = "codeOutput active";

  // CSS
  const preCss = document.createElement("pre");
  const codeCss = document.createElement("code");
  codeCss.className = "language-css";
  codeCss.textContent = css;
  preCss.appendChild(codeCss);
  preCss.className = "codeOutput";

  content.append(closeBtn, tabs, preHtml, preCss);
  modal.append(content);
  document.body.appendChild(modal);

  // Подсветка
  hljs.highlightElement(codeHtml);
  hljs.highlightElement(codeCss);

  closeBtn.addEventListener("click", () => modal.remove());
  window.addEventListener("click", (e) => e.target === modal && modal.remove());

  htmlTab.addEventListener("click", () => {
    htmlTab.classList.add("active");
    cssTab.classList.remove("active");
    preHtml.classList.add("active");
    preCss.classList.remove("active");
  });

  cssTab.addEventListener("click", () => {
    cssTab.classList.add("active");
    htmlTab.classList.remove("active");
    preCss.classList.add("active");
    preHtml.classList.remove("active");
  });
}







const generateBtn = document.getElementById("getHtml");
generateBtn.addEventListener("click", () => {
  const alertBox = document.querySelector(".alert");
  if (!alertBox) {
    alert("Сначала создайте алерт!");
    return;
  }

  const htmlCode = formatHtml(alertBox.outerHTML);
  const cssCode = formatCss(style);
  createModal(htmlCode, cssCode);
});

function formatHtml(html) {
  const tab = '  ';
  const beautified = html.trim().replace(/></g, '>\n<');
  const lines = beautified.split('\n');
  let indent = 0;

  return lines
    .map(line => {
      const trimmed = line.trim();

      // Уменьшаем отступ для закрывающих тегов
      if (/^<\/\w/.test(trimmed)) indent--;

      const padded = `${tab.repeat(Math.max(indent, 0))}${trimmed}`;

      // Увеличиваем отступ для открывающих тегов, которые не самозакрываются
      if (/^<[^!?\\/][^>]*[^\\/]>$/.test(trimmed)) indent++;

      return padded;
    })
    .join('\n');
}
function injectHighlightAssets() {
  if (window.hljs) return;

  // CSS-стили (тема GitHub)
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github.min.css";
  document.head.appendChild(link);

  // JS-библиотека
  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js";
  script.onload = () => {
    document.querySelectorAll("pre code").forEach(block => hljs.highlightElement(block));
  };
  document.head.appendChild(script);
}


function formatCss(obj) {
  return `/* CSS */\n.alert {\n  background:white;\n  padding:30px 50px;\n  border-radius:${obj.borderRadius};\n  box-shadow:${obj.shadow};\n  text-transform:${obj.textTransform};\n  display:flex;\n  align-items:center;\n  gap:20px;\n  max-width:500px;\n  font-family:'Montserrat',sans-serif;\n}\n.alertWrapper {\n  display:flex;\n  align-items:center;\n  gap:15px;\n  width:100%;\n}\n.alertLogo {\n  display:${obj.display};\n  width:40px;\n  height:40px;\n  text-align:center;\n  line-height:40px;\n  border-radius:50%;\n  font-size:28px;\n}\n.alertTitle {font-size:${obj.fontSizeTitle};font-weight:600;color:#333;}\n.alertText {font-size:${obj.fontSize};font-weight:500;color:#333;}`;
}

function injectModalStyles() {
  if (document.getElementById("codeModalStyles")) return;
  const styleEl = document.createElement("style");
  styleEl.id = "codeModalStyles";
  styleEl.textContent = `
    .modal {position:fixed;inset:0;display:flex;align-items:flex-start;justify-content:center;padding-top:5%;background:rgba(0,0,0,.4);backdrop-filter:blur(3px);}
    .modal-content {background:#fff;max-width:860px;width:90%;border-radius:12px;padding:24px;box-shadow:0 10px 30px rgba(0,0,0,.25);position:relative;animation:zoomIn .3s ease;}
    .close-modal {position:absolute;top:12px;right:16px;border:none;background:none;font-size:26px;cursor:pointer;color:#888;}
    .close-modal:hover {color:#000;}
    .tabs {display:flex;gap:8px;margin-bottom:16px;}
    .tab-btn {padding:6px 14px;border:none;background:#e5e7eb;border-radius:6px;cursor:pointer;font-weight:600;}
    .tab-btn.active {background:#007bff;color:#fff;}
    .codeOutput {display:none;background:#f5f5f5;padding:16px;border-radius:8px;max-height:420px;overflow-y:auto;white-space:pre-wrap;font-family:monospace;font-size:14px;}
    .codeOutput.active {display:block;}
    @keyframes zoomIn {from {transform:scale(.8);opacity:0;} to {transform:scale(1);opacity:1;}}
  `;
  document.head.appendChild(styleEl);
}

function createModal(html, css) {
  injectModalStyles();

  injectHighlightAssets();

  const modal = document.createElement("div");
  modal.className = "modal";

  const content = document.createElement("div");
  content.className = "modal-content";

  const closeBtn = document.createElement("button");
  closeBtn.className = "close-modal";
  closeBtn.textContent = "⨉";

  const tabs = document.createElement("div");
  tabs.className = "tabs";

  const htmlTab = document.createElement("button");
  htmlTab.className = "tab-btn active";
  htmlTab.dataset.tab = "html";
  htmlTab.textContent = "HTML";

  const cssTab = document.createElement("button");
  cssTab.className = "tab-btn";
  cssTab.dataset.tab = "css";
  cssTab.textContent = "CSS";

  tabs.append(htmlTab, cssTab);

  const preHtml = document.createElement("pre");
  preHtml.className = "codeOutput active";
  preHtml.textContent = html;

  const preCss = document.createElement("pre");
  preCss.className = "codeOutput";
  preCss.textContent = css;

  content.append(closeBtn, tabs, preHtml, preCss);
  modal.append(content);
  document.body.appendChild(modal);

  closeBtn.addEventListener("click", () => modal.remove());
  window.addEventListener("click", (e) => e.target === modal && modal.remove());

  htmlTab.addEventListener("click", () => {
    htmlTab.classList.add("active"); cssTab.classList.remove("active");
    preHtml.classList.add("active"); preCss.classList.remove("active");
  });
  cssTab.addEventListener("click", () => {
    cssTab.classList.add("active"); htmlTab.classList.remove("active");
    preCss.classList.add("active"); preHtml.classList.remove("active");
  });
}
