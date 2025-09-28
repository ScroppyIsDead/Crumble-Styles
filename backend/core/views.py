from django.shortcuts import get_object_or_404
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response
from .serializers import UserSerializer
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User
from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import UserData
from django.conf import settings
from django.core.mail import send_mail


@api_view(["POST"])
def login(request):
    user = get_object_or_404(User, username=request.data["username"])
    if not user.check_password(request.data["password"]):
        return Response({"detail": "Not Found."}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"token": token.key, "status": f"logged in as{user.username}"})


@api_view(["POST"])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        user = User.objects.get(username=request.data["username"])
        user.set_password(request.data["password"])
        user.email = request.data["email"]
        user.save()
        userdata = UserData.objects.create(user=user)
        return Response(
            {"message": "account made", "status": f"signed up as {user.username}"}
        )
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])  # ensures logged in
def get_user_info(request):
    user = request.user
    serializer = UserSerializer(user)
    return Response(serializer.data)


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def update_user_info(request):
    user = request.user
    serializer = UserSerializer(user, data=request.data, partial=True)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def reset_password(request):
    user = request.user
    password = request.data["password"]
    if user.check_password(password):
        newpassword = request.data["new_password"]
        user.set_password(newpassword)
        user.save()
        return Response({"message": user.username}, status=status.HTTP_200_OK)
    return Response(
        {"error": "Password incorrect"}, status=status.HTTP_401_UNAUTHORIZED
    )


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        request.user.auth_token.delete()
        return Response(
            {"detail": "Successfully logged out."}, status=status.HTTP_200_OK
        )
    except Exception as e:
        return Response(
            {"detail": "Error logging out."}, status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_phone(request):
    user = request.user
    phone = request.data.get("phone")
    userdata, created = UserData.objects.get_or_create(user=user)
    userdata.phone = phone
    return Response({"message": "correctly added phone"}, status=status.HTTP_200_OK)


@api_view(["GET"])
@authentication_classes([SessionAuthentication, TokenAuthentication])
@permission_classes([IsAuthenticated])  # ensures logged in
def is_logged_in(request):
    return Response(True)


@api_view(["GET"])
def send_mail_letter(request):
    subject = "Sorry for the inconvience"
    message = "Sorry but we dont actually have a news letter, this website is a dummy website made to be apart of showcasing my skills as a web developer."
    email_from = settings.EMAIL_HOST_USER
    recipient = [request.GET.get("email")]
    send_mail(subject, message, email_from, recipient)
    return Response({message: "success"}, status=status.HTTP_200_OK)
