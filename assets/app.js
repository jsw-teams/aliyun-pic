const CONFIG = window.__APP_CONFIG__ || {};
const MAX_FILE_MB = Number(CONFIG.MAX_FILE_MB || 5);
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;
const STORAGE_COOKIE_KEY = "goofish_uploader_cookie";
const STORAGE_REMEMBER_KEY = "goofish_uploader_cookie_remember";
const STORAGE_LANG_KEY = "goofish_uploader_lang";

const MESSAGES = {
  "zh-Hans": {
    title: "上传图片",
    subtitle: "选择图片、完成验证、上传并复制结果。",
    fileLabel: "图片文件",
    chooseFile: "选择图片",
    noFile: "未选择文件",
    fileHint: `仅支持图片，大小不超过 ${MAX_FILE_MB}MB。`,
    cookieLabel: "闲鱼 Cookie",
    cookieHint: "Cookie 仅保存在当前浏览器本地。个人设备可勾选记住；公用设备不要保存。",
    cookieHelpLink: "查看 Cookie 获取说明",
    rememberCookie: "记住 Cookie",
    clearSavedCookie: "清除已保存 Cookie",
    uploadNow: "上传",
    verifyTitle: "请完成人机验证",
    verifyDesc: "验证通过后将自动开始上传。",
    uploadingTitle: "正在上传",
    uploadingDesc: "请不要关闭页面。",
    resultTitle: "上传结果",
    directUrl: "图片直链",
    markdownCode: "Markdown 插入",
    copyDirectUrl: "复制直链",
    copyMarkdown: "复制 Markdown",
    showRawResponse: "查看原始返回",
    statusReady: "可以开始上传。",
    statusNeedFile: "请先选择图片。",
    statusNeedCookie: "请填写 Cookie。",
    statusTooLarge: `文件不能超过 ${MAX_FILE_MB}MB。`,
    statusNeedImage: "仅允许上传图片文件。",
    statusTurnstileConfig: "未配置 Turnstile Site Key，请先修改 assets/config.js。",
    statusVerifyLoading: "正在加载验证组件…",
    statusVerifyReady: "请在弹窗中完成人机验证。",
    statusVerifyFailed: "验证失败，请重试。",
    statusVerifyExpired: "验证已过期，请重新验证。",
    statusVerifyTimeout: "验证超时，请重新验证。",
    statusUploading: "正在上传…",
    statusUploadSuccess: "上传成功。",
    statusUploadFailed: "上传失败。",
    statusSavedCookie: "已保存 Cookie 到当前浏览器。",
    statusClearedCookie: "已清除本地保存的 Cookie。",
    statusCopied: "已复制到剪贴板。",
    statusCopyFailed: "复制失败，请手动复制。",
    statusUnknownError: "发生未知错误，请稍后重试。"
  },
  "zh-Hant": {
    title: "上傳圖片",
    subtitle: "選擇圖片、完成驗證、上傳並複製結果。",
    fileLabel: "圖片檔案",
    chooseFile: "選擇圖片",
    noFile: "未選擇檔案",
    fileHint: `僅支援圖片，大小不可超過 ${MAX_FILE_MB}MB。`,
    cookieLabel: "閒魚 Cookie",
    cookieHint: "Cookie 只會保存在目前瀏覽器本地。個人裝置可勾選記住；公用裝置不要保存。",
    cookieHelpLink: "查看 Cookie 取得說明",
    rememberCookie: "記住 Cookie",
    clearSavedCookie: "清除已保存 Cookie",
    uploadNow: "上傳",
    verifyTitle: "請完成人機驗證",
    verifyDesc: "驗證通過後將自動開始上傳。",
    uploadingTitle: "正在上傳",
    uploadingDesc: "請不要關閉頁面。",
    resultTitle: "上傳結果",
    directUrl: "圖片直鏈",
    markdownCode: "Markdown 插入",
    copyDirectUrl: "複製直鏈",
    copyMarkdown: "複製 Markdown",
    showRawResponse: "查看原始返回",
    statusReady: "可以開始上傳。",
    statusNeedFile: "請先選擇圖片。",
    statusNeedCookie: "請填寫 Cookie。",
    statusTooLarge: `檔案不可超過 ${MAX_FILE_MB}MB。`,
    statusNeedImage: "僅允許上傳圖片檔案。",
    statusTurnstileConfig: "尚未設定 Turnstile Site Key，請先修改 assets/config.js。",
    statusVerifyLoading: "正在載入驗證元件…",
    statusVerifyReady: "請在彈窗中完成人機驗證。",
    statusVerifyFailed: "驗證失敗，請重試。",
    statusVerifyExpired: "驗證已過期，請重新驗證。",
    statusVerifyTimeout: "驗證逾時，請重新驗證。",
    statusUploading: "正在上傳…",
    statusUploadSuccess: "上傳成功。",
    statusUploadFailed: "上傳失敗。",
    statusSavedCookie: "已保存 Cookie 到目前瀏覽器。",
    statusClearedCookie: "已清除本地保存的 Cookie。",
    statusCopied: "已複製到剪貼簿。",
    statusCopyFailed: "複製失敗，請手動複製。",
    statusUnknownError: "發生未知錯誤，請稍後再試。"
  },
  en: {
    title: "Upload Image",
    subtitle: "Choose an image, pass verification, upload, and copy the result.",
    fileLabel: "Image file",
    chooseFile: "Choose image",
    noFile: "No file selected",
    fileHint: `Images only, up to ${MAX_FILE_MB}MB.`,
    cookieLabel: "Goofish Cookie",
    cookieHint: "The Cookie is stored only in this browser. Use remember on personal devices only; do not save it on shared devices.",
    cookieHelpLink: "How to get the Cookie",
    rememberCookie: "Remember Cookie",
    clearSavedCookie: "Clear saved Cookie",
    uploadNow: "Upload",
    verifyTitle: "Complete verification",
    verifyDesc: "Upload will start automatically after verification succeeds.",
    uploadingTitle: "Uploading",
    uploadingDesc: "Please do not close this page.",
    resultTitle: "Upload result",
    directUrl: "Direct image URL",
    markdownCode: "Markdown embed",
    copyDirectUrl: "Copy URL",
    copyMarkdown: "Copy Markdown",
    showRawResponse: "Show raw response",
    statusReady: "Ready to upload.",
    statusNeedFile: "Please choose an image first.",
    statusNeedCookie: "Please enter the Cookie.",
    statusTooLarge: `File must be ${MAX_FILE_MB}MB or smaller.`,
    statusNeedImage: "Only image files are allowed.",
    statusTurnstileConfig: "Turnstile Site Key is not configured. Update assets/config.js first.",
    statusVerifyLoading: "Loading verification widget…",
    statusVerifyReady: "Complete the verification in the dialog.",
    statusVerifyFailed: "Verification failed. Please try again.",
    statusVerifyExpired: "Verification expired. Please try again.",
    statusVerifyTimeout: "Verification timed out. Please try again.",
    statusUploading: "Uploading…",
    statusUploadSuccess: "Upload succeeded.",
    statusUploadFailed: "Upload failed.",
    statusSavedCookie: "Cookie saved in this browser.",
    statusClearedCookie: "Saved Cookie removed.",
    statusCopied: "Copied.",
    statusCopyFailed: "Copy failed. Please copy it manually.",
    statusUnknownError: "Unknown error. Please try again later."
  }
};

const state = {
  lang: resolveLanguage(),
  selectedFile: null,
  turnstileLoaded: false,
  turnstileWidgetRendered: false,
  activeModal: null,
  focusTrapHandler: null,
  turnstileWidgetId: null
};

const $ = (selector) => document.querySelector(selector);
const elements = {
  fileInput: $("#file-input"),
  chooseFileBtn: $("#choose-file-btn"),
  fileName: $("#file-name"),
  cookieInput: $("#cookie-input"),
  cookieHelpLink: $("#cookie-help-link"),
  rememberCookie: $("#remember-cookie"),
  clearCookieBtn: $("#clear-cookie-btn"),
  uploadBtn: $("#upload-btn"),
  statusLive: $("#status-live"),
  verifyModal: $("#verify-modal"),
  verifyStatus: $("#verify-status"),
  turnstileWidget: $("#turnstile-widget"),
  loadingModal: $("#loading-modal"),
  resultModal: $("#result-modal"),
  loadingText: $("#loading-text"),
  resultUrl: $("#result-url"),
  resultMd: $("#result-md"),
  resultRaw: $("#result-raw")
};

init();

function init() {
  applyLanguage();
  bindEvents();
  restoreCookiePreference();
  configureHelpLink();
  setStatus(t("statusReady"));
}

function bindEvents() {
  elements.chooseFileBtn.addEventListener("click", () => elements.fileInput.click());
  elements.fileInput.addEventListener("change", onFileChange);
  elements.uploadBtn.addEventListener("click", onUploadClick);
  elements.clearCookieBtn.addEventListener("click", clearSavedCookie);
  elements.rememberCookie.addEventListener("change", onRememberToggle);

  document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", () => closeModal(button.getAttribute("data-close-modal")));
  });

  document.querySelectorAll(".result-copy").forEach((button) => {
    button.addEventListener("click", async () => {
      const targetId = button.getAttribute("data-copy-target");
      const target = document.getElementById(targetId);
      try {
        await navigator.clipboard.writeText(target.value);
        setStatus(t("statusCopied"));
      } catch {
        setStatus(t("statusCopyFailed"));
      }
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && state.activeModal && state.activeModal !== "loading-modal") {
      closeModal(state.activeModal);
    }
  });
}

function resolveLanguage() {
  const saved = localStorage.getItem(STORAGE_LANG_KEY);
  if (saved && MESSAGES[saved]) return saved;

  const browserLang = (navigator.language || "en").toLowerCase();
  if (browserLang.startsWith("zh-tw") || browserLang.startsWith("zh-hk") || browserLang.startsWith("zh-mo")) return "zh-Hant";
  if (browserLang.startsWith("zh")) return "zh-Hans";
  return "en";
}

function t(key) {
  return MESSAGES[state.lang]?.[key] || MESSAGES.en[key] || key;
}

function applyLanguage() {
  document.documentElement.lang = state.lang === "zh-Hans" ? "zh-CN" : state.lang === "zh-Hant" ? "zh-Hant" : "en";
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) return;
    node.textContent = t(key);
  });
  elements.fileName.textContent = state.selectedFile ? state.selectedFile.name : t("noFile");
}

function configureHelpLink() {
  const href = CONFIG.COOKIE_HELP_URL && CONFIG.COOKIE_HELP_URL !== "https://example.com/your-cookie-guide"
    ? CONFIG.COOKIE_HELP_URL
    : "#";

  elements.cookieHelpLink.href = href;
  if (href === "#") {
    elements.cookieHelpLink.addEventListener("click", (event) => event.preventDefault());
    elements.cookieHelpLink.setAttribute("aria-disabled", "true");
  }
}

function restoreCookiePreference() {
  const remember = localStorage.getItem(STORAGE_REMEMBER_KEY) === "1";
  const savedCookie = localStorage.getItem(STORAGE_COOKIE_KEY) || "";
  elements.rememberCookie.checked = remember;
  if (remember && savedCookie) {
    elements.cookieInput.value = savedCookie;
  }
}

function onRememberToggle() {
  if (elements.rememberCookie.checked) {
    localStorage.setItem(STORAGE_REMEMBER_KEY, "1");
    localStorage.setItem(STORAGE_COOKIE_KEY, elements.cookieInput.value.trim());
    setStatus(t("statusSavedCookie"));
  } else {
    localStorage.removeItem(STORAGE_REMEMBER_KEY);
    localStorage.removeItem(STORAGE_COOKIE_KEY);
  }
}

function clearSavedCookie() {
  localStorage.removeItem(STORAGE_COOKIE_KEY);
  localStorage.removeItem(STORAGE_REMEMBER_KEY);
  elements.rememberCookie.checked = false;
  elements.cookieInput.value = "";
  setStatus(t("statusClearedCookie"));
}

function onFileChange(event) {
  const [file] = event.target.files || [];
  state.selectedFile = file || null;
  elements.fileName.textContent = file ? file.name : t("noFile");

  if (!file) return;
  if (!file.type.startsWith("image/")) {
    setStatus(t("statusNeedImage"), true);
    return;
  }
  if (file.size > MAX_FILE_BYTES) {
    setStatus(t("statusTooLarge"), true);
    return;
  }
  setStatus(t("statusReady"));
}

async function onUploadClick() {
  const file = state.selectedFile;
  const cookie = elements.cookieInput.value.trim();

  if (!file) {
    setStatus(t("statusNeedFile"), true);
    return;
  }
  if (!file.type.startsWith("image/")) {
    setStatus(t("statusNeedImage"), true);
    return;
  }
  if (file.size > MAX_FILE_BYTES) {
    setStatus(t("statusTooLarge"), true);
    return;
  }
  if (!cookie) {
    setStatus(t("statusNeedCookie"), true);
    return;
  }
  if (!CONFIG.TURNSTILE_SITE_KEY || CONFIG.TURNSTILE_SITE_KEY === "YOUR_TURNSTILE_SITE_KEY") {
    setStatus(t("statusTurnstileConfig"), true);
    return;
  }

  if (elements.rememberCookie.checked) {
    localStorage.setItem(STORAGE_REMEMBER_KEY, "1");
    localStorage.setItem(STORAGE_COOKIE_KEY, cookie);
  }

  try {
    setStatus(t("statusVerifyLoading"));
    openModal("verify-modal");
    elements.verifyStatus.textContent = t("statusVerifyLoading");
    await ensureTurnstileLoaded();
    await prepareTurnstileWidget();
    elements.verifyStatus.textContent = t("statusVerifyReady");
    window.turnstile.execute(state.turnstileWidgetId);
  } catch (error) {
    console.error(error);
    elements.verifyStatus.textContent = t("statusVerifyFailed");
    setStatus(error.message || t("statusVerifyFailed"), true);
  }
}

function ensureTurnstileLoaded() {
  if (state.turnstileLoaded && window.turnstile) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-turnstile-script="1"]');
    if (existing && window.turnstile) {
      state.turnstileLoaded = true;
      resolve();
      return;
    }
    const script = existing || document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.defer = true;
    script.dataset.turnstileScript = "1";
    script.onload = () => {
      state.turnstileLoaded = true;
      resolve();
    };
    script.onerror = () => reject(new Error(t("statusVerifyFailed")));
    if (!existing) document.head.appendChild(script);
  });
}

function prepareTurnstileWidget() {
  if (!window.turnstile) return Promise.reject(new Error(t("statusVerifyFailed")));

  if (!state.turnstileWidgetRendered) {
    state.turnstileWidgetId = window.turnstile.render("#turnstile-widget", {
      sitekey: CONFIG.TURNSTILE_SITE_KEY,
      appearance: "execute",
      execution: "execute",
      theme: "auto",
      language: CONFIG.DEFAULT_LANGUAGE === "auto" ? "auto" : CONFIG.DEFAULT_LANGUAGE,
      callback: async (token) => {
        closeModal("verify-modal");
        await uploadFile(token);
      },
      "error-callback": () => {
        elements.verifyStatus.textContent = t("statusVerifyFailed");
        setStatus(t("statusVerifyFailed"), true);
      },
      "expired-callback": () => {
        elements.verifyStatus.textContent = t("statusVerifyExpired");
        setStatus(t("statusVerifyExpired"), true);
      },
      "timeout-callback": () => {
        elements.verifyStatus.textContent = t("statusVerifyTimeout");
        setStatus(t("statusVerifyTimeout"), true);
      }
    });
    state.turnstileWidgetRendered = true;
  } else {
    window.turnstile.reset(state.turnstileWidgetId);
  }

  return Promise.resolve();
}

async function uploadFile(turnstileToken) {
  openModal("loading-modal", { closeable: false });
  elements.loadingText.textContent = t("statusUploading");
  setStatus(t("statusUploading"));

  const body = new FormData();
  body.append("file", state.selectedFile, state.selectedFile.name);
  body.append("cookie", elements.cookieInput.value.trim());
  body.append("cf-turnstile-response", turnstileToken);

  try {
    const response = await fetch("/api/upload", {
      method: "POST",
      body
    });

    const payload = await response.json().catch(() => ({ success: false, error: t("statusUnknownError") }));
    closeModal("loading-modal");

    if (!response.ok || !payload.success) {
      const message = payload.error || t("statusUploadFailed");
      setStatus(message, true);
      openResultModal({
        imageUrl: "",
        markdown: "",
        raw: JSON.stringify(payload, null, 2)
      });
      return;
    }

    setStatus(t("statusUploadSuccess"));
    openResultModal({
      imageUrl: payload.imageUrl || "",
      markdown: payload.markdown || "",
      raw: JSON.stringify(payload.raw ?? payload, null, 2)
    });
  } catch (error) {
    closeModal("loading-modal");
    console.error(error);
    setStatus(error.message || t("statusUploadFailed"), true);
  }
}

function openResultModal({ imageUrl, markdown, raw }) {
  elements.resultUrl.value = imageUrl;
  elements.resultMd.value = markdown;
  elements.resultRaw.textContent = raw;
  openModal("result-modal");
}

function openModal(id, options = {}) {
  const closeable = options.closeable !== false;
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.hidden = false;
  state.activeModal = id;

  const focusables = getFocusable(modal);
  if (focusables[0]) focusables[0].focus();

  if (!closeable) return;
  trapFocus(modal);
}

function closeModal(id) {
  const modal = document.getElementById(id);
  if (!modal) return;
  modal.hidden = true;
  releaseFocusTrap();
  if (state.activeModal === id) state.activeModal = null;
  elements.uploadBtn.focus();
}

function getFocusable(container) {
  return [...container.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
    .filter((el) => !el.hasAttribute("disabled") && !el.getAttribute("aria-hidden"));
}

function trapFocus(container) {
  releaseFocusTrap();
  state.focusTrapHandler = (event) => {
    if (event.key !== "Tab") return;
    const focusable = getFocusable(container);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };
  document.addEventListener("keydown", state.focusTrapHandler);
}

function releaseFocusTrap() {
  if (state.focusTrapHandler) {
    document.removeEventListener("keydown", state.focusTrapHandler);
    state.focusTrapHandler = null;
  }
}

function setStatus(message, isError = false) {
  elements.statusLive.textContent = message;
  elements.statusLive.style.color = isError ? "#fca5a5" : "";
}
