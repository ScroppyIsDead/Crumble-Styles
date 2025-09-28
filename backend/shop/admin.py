from django.contrib import admin
from .models import Product, Cart, Order, CartItem, OrderItem, SaleProduct

# Register your models here.


@admin.register(CartItem)
class CartItemAdmin(admin.ModelAdmin):
    list_display = ("cart", "product", "quantity")


@admin.register(SaleProduct)
class SaleProductAdmin(admin.ModelAdmin):
    list_display = ("product", "sale_end", "sale_price")


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ("title", "description", "price", "image")


class CartItemInline(admin.TabularInline):
    model = CartItem
    extra = 0  # No extra empty forms


class OrderItemInline(admin.TabularInline):
    model = OrderItem
    extra = 0  # No extra empty forms


@admin.register(Cart)
class CartAdmin(admin.ModelAdmin):
    list_display = ("user", "created_at", "cart_items_display")
    inlines = [CartItemInline]

    def cart_items_display(self, obj):
        items = obj.items.all()
        return ", ".join([f"{item.quantity} x {item.product.title}" for item in items])

    cart_items_display.short_description = "Cart Items"


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ("user", "created_at", "status", "order_items_display")
    inlines = [OrderItemInline]

    def order_items_display(self, obj):
        items = obj.items.all()
        return ", ".join([f"{item.quantity} x {item.product.title}" for item in items])

    order_items_display.short_description = "Order Items"
