import { API } from "../content/ContentContext.jsx"

const TOKEN_KEY = "4go.admin.token"
const ADMIN_KEY = "4go.admin.info"
let token = null
try { token = sessionStorage.getItem(TOKEN_KEY) } catch { /* storage unavailable */ }

export const getToken = () => token
export function setSession(t, info) {
  token = t || null
  try {
    if (t) {
      sessionStorage.setItem(TOKEN_KEY, t)
      if (info) sessionStorage.setItem(ADMIN_KEY, JSON.stringify(info))
    } else {
      sessionStorage.removeItem(TOKEN_KEY)
      sessionStorage.removeItem(ADMIN_KEY)
    }
  } catch { /* storage unavailable */ }
}
export function readAdminInfo() {
  try { return JSON.parse(sessionStorage.getItem(ADMIN_KEY) || "null") } catch { return null }
}

export class ApiErr extends Error {
  constructor(status, message, details) {
    super(message)
    this.status = status
    this.details = details
  }
}

let onUnauthorized = null
export const setUnauthorizedHandler = (fn) => { onUnauthorized = fn }

async function request(path, { method = "GET", body, auth = true } = {}) {
  if (!API) throw new ApiErr(0, "VITE_API_URL is not set, so the dashboard cannot reach the backend.")
  let res
  try {
    res = await fetch(API + path, {
      method,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...(auth && token ? { Authorization: "Bearer " + token } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    })
  } catch {
    throw new ApiErr(0, "Could not reach the server. Check your connection and try again.")
  }
  let json = null
  try { json = await res.json() } catch { /* no body */ }
  if (!res.ok) {
    if (res.status === 401 && auth && onUnauthorized) onUnauthorized()
    throw new ApiErr(res.status, (json && json.message) || "Request failed (" + res.status + ").", json && json.details)
  }
  return json && json.data !== undefined ? json.data : json
}

export const login = (email, password) => request("/admin/auth/login", { method: "POST", body: { email, password }, auth: false })
export const verifyOtp = (email, code) => request("/admin/auth/verify-otp", { method: "POST", body: { email, code }, auth: false })
export const refresh = () => request("/admin/auth/refresh", { method: "POST" })

const base = "/site-admin"
export const listSections = () => request(base + "/sections")
export const saveSection = (key, value) => request(base + "/sections/" + key, { method: "PUT", body: { value } })
export const resetSection = (key) => request(base + "/sections/" + key, { method: "DELETE" })
export const listItems = () => request(base + "/items")
export const createItem = (collection, data) => request(base + "/items", { method: "POST", body: { collection, data } })
export const updateItem = (id, patch) => request(base + "/items/" + id, { method: "PUT", body: patch })
export const deleteItem = (id) => request(base + "/items/" + id, { method: "DELETE" })
export const reorderItems = (collection, ids) => request(base + "/items/reorder", { method: "POST", body: { collection, ids } })
export const importContent = (payload) => request(base + "/import", { method: "POST", body: payload })
export const listMessages = (unread = false, limit = 100) => request(base + "/messages?limit=" + limit + (unread ? "&unread=1" : ""))
export const markMessage = (id, read) => request(base + "/messages/" + id, { method: "PATCH", body: { read } })
export const deleteMessage = (id) => request(base + "/messages/" + id, { method: "DELETE" })
export const listApplications = (unread = false, limit = 100) => request(base + "/applications?limit=" + limit + (unread ? "&unread=1" : ""))
export const markApplication = (id, read) => request(base + "/applications/" + id, { method: "PATCH", body: { read } })
export const deleteApplication = (id) => request(base + "/applications/" + id, { method: "DELETE" })

// The CV is private, so it is fetched with the admin token and saved from memory (a plain link would not carry the login).
export async function downloadCv(id, filename) {
  if (!API) throw new ApiErr(0, "VITE_API_URL is not set, so the dashboard cannot reach the backend.")
  let res
  try {
    res = await fetch(API + base + "/applications/" + id + "/cv", { headers: token ? { Authorization: "Bearer " + token } : {} })
  } catch {
    throw new ApiErr(0, "Could not reach the server. Check your connection and try again.")
  }
  if (!res.ok) {
    let json = null
    try { json = await res.json() } catch { /* no body */ }
    if (res.status === 401 && onUnauthorized) onUnauthorized()
    throw new ApiErr(res.status, (json && json.message) || "Download failed (" + res.status + ").")
  }
  const url = URL.createObjectURL(await res.blob())
  const a = document.createElement("a")
  a.href = url
  a.download = filename || "cv"
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 10000)
}

// Image upload for promotions. Sends multipart to POST /site-admin/uploads and expects { data: { url } } back.
export const IMAGE_MAX_BYTES = 5 * 1024 * 1024
export const IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

export async function uploadImage(file) {
  if (!IMAGE_TYPES.includes(file.type)) throw new ApiErr(0, "Use a JPG, PNG, WebP or GIF image.")
  if (file.size > IMAGE_MAX_BYTES) throw new ApiErr(0, "That image is over 5 MB. Choose a smaller one.")
  if (!API) throw new ApiErr(0, "VITE_API_URL is not set, so the dashboard cannot reach the backend.")
  const body = new FormData()
  body.append("image", file)
  let res
  try {
    res = await fetch(API + base + "/uploads", { method: "POST", headers: { Accept: "application/json", ...(token ? { Authorization: "Bearer " + token } : {}) }, body })
  } catch {
    throw new ApiErr(0, "Could not reach the server. Check your connection and try again.")
  }
  if (res.status === 404 || res.status === 405) throw new ApiErr(res.status, "The server does not have the image upload route yet. Deploy the latest backend, then try again.")
  let json = null
  try { json = await res.json() } catch { /* no body */ }
  if (!res.ok) {
    if (res.status === 401 && onUnauthorized) onUnauthorized()
    throw new ApiErr(res.status, (json && json.message) || "Upload failed (" + res.status + ").")
  }
  const url = json && ((json.data && json.data.url) || json.url)
  if (!url) throw new ApiErr(res.status, "The server did not return an image address.")
  return url
}
