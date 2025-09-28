from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

# Create your models here.


class Product(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to="product_images/")

    def get_current_price(self):
        try:
            sale = SaleProduct.objects.get(product=self, sale_end__gte=timezone.now())
            return sale.sale_price
        except SaleProduct.DoesNotExist:
            return self.price

    def __str__(self):
        return self.title


class SaleProduct(models.Model):
    product = models.ForeignKey(Product, related_name="sale", on_delete=models.CASCADE)
    sale_price = models.DecimalField(max_digits=10, decimal_places=2)
    sale_end = models.DateTimeField()

    def is_active(self):
        now = timezone.now()
        return now <= self.sale_end

    def __str__(self):
        return f"{self.product.title} on sale for {self.sale_price}"


class Order(models.Model):
    user = models.ForeignKey(User, related_name="orders", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=50, default="pending")

    def __str__(self):
        return f"Order {self.id} by {self.user.username}"


class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity}x of {self.product.title}"


class Favorites(models.Model):
    user = models.OneToOneField(
        User, related_name="favorites", on_delete=models.CASCADE
    )
    products = models.ManyToManyField(Product)

    def __str__(self):
        return f"{self.user.username} favorite products"


class Cart(models.Model):
    user = models.OneToOneField(User, related_name="cart", on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Cart of {self.user.username}"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name="items", on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField()

    def __str__(self):
        return f"{self.quantity} x {self.product.title} in Cart"
