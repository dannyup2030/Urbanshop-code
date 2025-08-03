// urban_shop/assets/js/mejoras/carrito.js
class CartService {
  static KEY = 'urban_shop_cart_v2';

  static init() {
    this.updateCartCount();
    window.addEventListener('cartUpdated', () => this.updateCartCount());
  }

  static getCart() {
    return JSON.parse(localStorage.getItem(this.KEY)) || [];
  }

  static addItem(product, quantity = 1) {
    const cart = this.getCart();
    const existing = cart.find(item => item.id === product.id);
    
    if (existing) {
      existing.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    this.saveCart(cart);
    return cart;
  }

  static saveCart(cart) {
    localStorage.setItem(this.KEY, JSON.stringify(cart));
    window.dispatchEvent(new CustomEvent('cartUpdated'));
  }

  static updateCartCount() {
    const count = this.getCart().reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-counter').forEach(el => {
      el.textContent = count > 0 ? count : '';
      el.classList.toggle('hidden', count === 0);
    });
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => CartService.init());