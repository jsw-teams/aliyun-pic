const MAX_FILE_MB = 5;
const MAX_FILE_BYTES = MAX_FILE_MB * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
  "image/svg+xml"
]);

const UPSTREAM_URL = "https://stream-upload.goofish.com/api/upload.api?_input_charset=utf-8&appkey=fleamarket";

function json(data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      ...extraHeaders
    }
  });
}

function extractImageUrl(value) {
  if (!value) return "";

  if (typeof value === "string") {
    const trimmed = value.trim();
    if (/^https?:\/\//i.test(trimmed)) return trimmed;
    return "";
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      const found = extractImageUrl(item);
      if (found) return found;
    }
    return "";
  }

  if (typeof value === "object") {
    for (const key of Object.keys(value)) {
      const found = extractImageUrl(value[key]);
      if (found) return found;
    }
  }

  return "";
}

async function verifyTurnstile(token, secret, remoteip) {
  const form = new URLSearchParams();
  form.set("secret", secret);
  form.set("response", token);
  if (remoteip) form.set("remoteip", remoteip);

  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: form.toString()
  });

  if (!response.ok) {
    throw new Error("Turnstile verification request failed");
  }

  return response.json();
}

export const onRequestOptions = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "access-control-allow-origin": "*",
      "access-control-allow-methods": "POST, OPTIONS",
      "access-control-allow-headers": "content-type",
      "cache-control": "no-store, max-age=0"
    }
  });
};

export const onRequestPost = async ({ request, env, clientIp }) => {
  try {
    if (!env?.TURNSTILE_SECRET_KEY) {
      return json({ success: false, error: "Missing TURNSTILE_SECRET_KEY environment variable." }, 500);
    }

    const formData = await request.formData();
    const file = formData.get("file");
    const cookie = String(formData.get("cookie") || "").trim();
    const turnstileToken = String(formData.get("cf-turnstile-response") || "").trim();

    if (!(file instanceof File)) {
      return json({ success: false, error: "No file uploaded." }, 400);
    }

    if (!cookie) {
      return json({ success: false, error: "Cookie is required." }, 400);
    }

    if (!turnstileToken) {
      return json({ success: false, error: "Turnstile token is required." }, 400);
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return json({ success: false, error: "Only image files are allowed." }, 400);
    }

    if (file.size > MAX_FILE_BYTES) {
      return json({ success: false, error: `File must be ${MAX_FILE_MB}MB or smaller.` }, 413);
    }

    const turnstileResult = await verifyTurnstile(turnstileToken, env.TURNSTILE_SECRET_KEY, clientIp);
    if (!turnstileResult?.success) {
      return json(
        {
          success: false,
          error: "Human verification failed.",
          turnstile: turnstileResult
        },
        403
      );
    }

    const upstreamForm = new FormData();
    upstreamForm.append("file", file, file.name || `upload-${Date.now()}.jpg`);
    upstreamForm.append("name", "upload.jpg");
    upstreamForm.append("folderId", "0");
    upstreamForm.append("appkey", "fleamarket");

    const upstreamResponse = await fetch(UPSTREAM_URL, {
      method: "POST",
      headers: {
        "accept": "application/json, text/plain, */*",
        "cookie": cookie,
        "origin": "https://author.goofish.com",
        "referer": "https://author.goofish.com/",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36 EdgeOneUploader/1.0"
      },
      body: upstreamForm
    });

    const contentType = upstreamResponse.headers.get("content-type") || "";
    const rawText = await upstreamResponse.text();

    let raw;
    try {
      raw = contentType.includes("application/json") ? JSON.parse(rawText) : JSON.parse(rawText);
    } catch {
      raw = { rawText };
    }

    const imageUrl = extractImageUrl(raw);
    const markdown = imageUrl ? `![](${imageUrl})` : "";

    return json(
      {
        success: upstreamResponse.ok,
        imageUrl,
        markdown,
        raw,
        upstreamStatus: upstreamResponse.status
      },
      upstreamResponse.ok ? 200 : upstreamResponse.status
    );
  } catch (error) {
    console.error("upload error:", error);
    return json(
      {
        success: false,
        error: error?.message || "Server error."
      },
      500
    );
  }
};
