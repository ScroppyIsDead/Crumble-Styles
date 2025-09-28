from rest_framework import serializers
from .models import Cart, Product, CartItem, SaleProduct, Order, OrderItem


class ProductSerializer(serializers.ModelSerializer):
    current_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ["title", "description", "price", "image", "id", "current_price"]

    def get_current_price(self, obj):
        return obj.get_current_price()


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta(object):
        model = CartItem
        fields = ["id", "product", "quantity"]


class SaleProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta(object):
        model = SaleProduct
        fields = ["id", "product", "sale_price", "sale_end"]


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta(object):
        model = Cart
        fields = ["id", "user", "created_at", "items"]


class OrderItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta(object):
        model = OrderItem
        fields = ["id", "product", "quantity"]


class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta(object):
        model = Order
        fields = ["id", "created_at", "status", "items"]
