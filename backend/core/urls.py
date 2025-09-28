from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path("login", views.login),
    path("signup", views.signup),
    path("userinfo", views.get_user_info),
    path("updateuserinfo", views.update_user_info),
    path("changepassword", views.reset_password),
    path("logout", views.logout),
    path("islogedin", views.is_logged_in, name="is-logged-in"),
    path("sendmail", views.send_mail_letter),
]
