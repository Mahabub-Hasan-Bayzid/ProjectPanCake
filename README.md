# 🥞 Pancake Maker App

A fun and modern pancake customization web app! Users can build their dream pancake with toppings, extras, and choose how to get it delivered — while chefs can manage all the incoming orders in a sleek dashboard.

---

## 🚀 Features

### 👨‍🍳 Customer Side
- Customize your pancake:
  - Choose from Classic, Chocolate, or Blueberry.
  - Add toppings like 🥜 Nuts, 🍌 Bananas, 🧉 Syrup (1€ each).
  - Add extras like 🍦 Whipped Cream (2€) or 🍨 Ice Cream (3€).
  - Select your delivery method: 🚶 Eat In, 🛍️ Pick Up, or 🛵 Delivery (+5€).
- Real-time **price calculation** with sleek UI.
- "See Order" preview button before confirming.
- "Place Order" button saves your order.
- All orders are stored in browser **localStorage**.

---

### 🧾 Chef / Admin Side
- Click "Show All Orders" to view a **modal table** of all submitted orders.
- Each order includes:
  - Order ID
  - Customer name
  - Pancake type
  - Toppings & extras
  - Delivery method
  - Total price
  - Current status (dropdown: `waiting`, `ready`, `delivered`)
- Update the order **status** from the table.
- **Color-coded status styling**:
  - 🟡 `waiting`
  - 🔵 `ready`
  - 🟢 `delivered`
- Delete completed/delivered orders with a click.
- Order list table supports **scrolling** for overflow.

---

## 💾 Technologies Used
- HTML5
- CSS3 (with custom modern UI design)
- JavaScript (Vanilla)
- `localStorage` for persistent data
- SweetAlert2 for beautiful alerts

---

## 🎨 UI Highlights
- Stylish buttons with hover effects.
- Modern dropdowns, checkboxes, radios, and form fields.
- Clean modal with scrollable order table.
- Emoji-enhanced interface for extra delight 🌈

---

## 📦 Folder Structure

