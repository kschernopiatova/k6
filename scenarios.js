import * as category from "./requests/categories_page.js"
import * as home from "./requests/home_page.js"
import * as cart from "./requests/cart_page.js"
import * as checkout from "./requests/checkout_page.js"

export function default_scenario() {
    home.open_home_page()
    category.get_categories()
    category.get_category_products()
    cart.add_to_cart()
    category.get_category_products()
    cart.add_to_cart()
    cart.get_cart_info()
    cart.update_quantity()
    cart.get_cart_info()
    cart.remove_from_cart()
    checkout.submit_purchase()
}