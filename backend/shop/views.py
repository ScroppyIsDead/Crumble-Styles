from django.shortcuts import get_object_or_404
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import (
    CartSerializer,
    CartItemSerializer,
    ProductSerializer,
    SaleProductSerializer,
    OrderSerializer,
    OrderItemSerializer,
)
from .models import Cart, CartItem, Product, Favorites, Order, OrderItem, SaleProduct
import stripe
from django.conf import settings
from django.db.models.functions import Lower
from django.utils import timezone

# Create your views here.
stripe.api_key = settings.STRIPE_SECRET_KEY


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])  # ensures logged in
def get_cart_items(request):
    user = request.user
    cart = Cart.objects.get(user=user)
    serializer = CartSerializer(cart)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_item_to_cart(request):
    cart, created = Cart.objects.get_or_create(user=request.user)
    quantity = 1  # get quantity
    product_id = request.data.get("product_id")

    product = get_object_or_404(Product, id=product_id)

    cart_item, created = CartItem.objects.get_or_create(
        cart=cart, product=product, defaults={"quantity": quantity}
    )

    if not created:
        cart_item.quantity += quantity
        cart_item.save()

    serializer = CartItemSerializer(cart_item)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_from_cart(request):
    cart = get_object_or_404(Cart, user=request.user)
    product = request.data.get("product_id")
    quantity = request.data.get("quantity")
    cart_product = get_object_or_404(CartItem, cart=cart, product=product)

    cart_product.quantity -= quantity

    if cart_product.quantity <= 0:
        cart_product.delete()
        return Response(
            {"message": "removed item from cart"}, status=status.HTTP_204_NO_CONTENT
        )

    else:
        cart_product.save()
        serializer = CartItemSerializer(cart_product)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def remove_fully_from_cart(request):
    cart = get_object_or_404(Cart, user=request.user)
    product = request.data.get("product_id")
    cart_product = get_object_or_404(CartItem, cart=cart, product=product)
    cart_product.delete()
    return Response({"message": "removed from cart"}, status=status.HTTP_200_OK)


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_item_to_favorites(request):
    favorites, created = Favorites.objects.get_or_create(user=request.user)
    product_id = request.data.get("product_id")

    product = get_object_or_404(Product, id=product_id)

    favorites.products.add(product)

    serializer = ProductSerializer(product)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def reomove_item_from_favorites(request):
    favorites = get_object_or_404(Favorites, user=request.user)
    product_id = request.data.get("product_id")
    product = get_object_or_404(Product, id=product_id)

    favorites.products.remove(product)

    serializer = ProductSerializer(product)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(["GET"])
def get_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_cart(request):
    cart = request.user.cart
    products = cart.items.all().order_by(Lower("product__title"))
    serializer = CartItemSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_favorites(request):
    favorites = request.user.favorites
    products = favorites.products.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_payment_intent(request):
    try:
        # Fetch the cart and calculate the total amount
        cart = get_object_or_404(Cart, user=request.user)
        cart_items = CartItem.objects.filter(cart=cart)
        total_amount = sum(
            item.product.get_current_price() * item.quantity for item in cart_items
        )

        amount_in_cents = int(total_amount * 100)

        payment_intent = stripe.PaymentIntent.create(
            amount=amount_in_cents,
            currency="usd",
        )
        return Response({"client_secret": payment_intent["client_secret"]})
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_order(request):
    user = request.user
    cart = get_object_or_404(Cart, user=user)
    paymentid = request.data.get("paymentid")

    try:
        payment_intent = stripe.PaymentIntent.retrieve(paymentid)

        if payment_intent["status"] != "succeeded":
            return Response(
                {"message": "error, payment didnt go through"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        order = Order.objects.create(user=user)

        cart_items = CartItem.objects.filter(cart=cart)
        for cart_item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=cart_item.product,
                quantity=cart_item.quantity,
            )
        cart_items.delete()

        return Response(
            {"message": "order created", "order": order.id}, status=status.HTTP_200_OK
        )
    except stripe.error.StripeError as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except Cart.DoesNotExist:
        return Response({"error": "Cart not found"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(["GET"])
def get_sale_product(request):
    now = timezone.now()
    products_on_sale = SaleProduct.objects.filter(sale_end__gte=now)
    serializer = SaleProductSerializer(products_on_sale, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_cart_quantity(request):
    cart = get_object_or_404(Cart, user=request.user)
    total_quantity = sum(item.quantity for item in cart.items.all())
    return Response(total_quantity, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_product(request):
    productid = request.GET.get("productid")
    product = get_object_or_404(Product, id=productid)
    serializer = ProductSerializer(product)
    return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_orders(request):
    orders = Order.objects.filter(user=request.user).order_by("-id")
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data, status.HTTP_200_OK)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_order(request, ordernumber):
    try:
        order = Order.objects.get(id=ordernumber, user=request.user)
        serializer = OrderSerializer(order)
        return Response(serializer.data, status.HTTP_200_OK)
    except Order.DoesNotExist:
        return Response({"error": "Order not found."}, status=status.HTTP_404_NOT_FOUND)
