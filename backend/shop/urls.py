from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("getcartitems", views.get_cart_items),
    path("addcartitem", views.add_item_to_cart),
    path("getallproducts", views.get_products),
    path("getcart", views.get_cart),
    path("getfavorites", views.get_favorites),
    path("addtofavorites", views.add_item_to_favorites),
    path("removefromfavorites", views.reomove_item_from_favorites),
    path("removefromcart", views.remove_from_cart),
    path(
        "createpaymentintent", views.create_payment_intent, name="create-payment-intent"
    ),
    path("create_order", views.create_order, name="create-order"),
    path("removefullyfromcart", views.remove_fully_from_cart),
    path("getsaleitem", views.get_sale_product),
    path("getcartquantity", views.get_cart_quantity),
    path("getproduct", views.get_product, name="get-product"),
    path("getuserorders", views.get_user_orders, name="get-user-order"),
    path("getorder/<int:ordernumber>/", views.get_order, name="get-order"),
]
