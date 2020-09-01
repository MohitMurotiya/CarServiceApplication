export default function authHeader() {
  const admin = JSON.parse(localStorage.getItem("admin"));

  if (admin && admin.token) {
    // for Node.js Express back-end
    return { "x-access-token": admin.token };
  } else {
    return {};
  }
}
