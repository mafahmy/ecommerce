export const verifyEmailTemp = (link) => {
    const html = `Please Verify Email by clicking <a href=${link}>here</a>`;
    return html;
}
export const orderReciept = (order) => {
    const html = `<h1>Thank you for shopping with us</h1>
    <p>we have recieved your order for total ${order.totalPrice}</p>`
    return html;
}
export const resetPassword = (link) => {
    const html = `Please Click On Link to reset your Password <a href=${link}>here</a>`
    return html;
}