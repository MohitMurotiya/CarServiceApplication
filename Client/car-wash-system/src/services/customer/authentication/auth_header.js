export default function authHeader() {
  const customer = JSON.parse(localStorage.getItem("customer"));

  if (customer && customer.token) {
    // for Node.js Express back-end
    return { "x-access-token": customer.token };
  } else {
    return {};
  }
}
