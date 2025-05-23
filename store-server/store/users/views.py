from django.shortcuts import render, HttpResponseRedirect
from django.contrib import auth
from django.urls import reverse
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
import re
import json
from urllib3 import request
from django.views import View

from users.models import User
from users.forms import UserLoginForm, UserRegisterForm, UserProfileForm
from products.models import Basket
def login(request):
    if request.method == 'POST':
        form = UserLoginForm(data=request.POST)
        if form.is_valid():
            username = request.POST['username']
            password = request.POST['password']
            user = auth.authenticate(username=username, password=password)
            if user:
                auth.login(request, user)
                return HttpResponseRedirect(reverse('index'))
    else:
        form = UserLoginForm()
    context = {'form': form}
    return render(request, 'users/login.html', context)

def registration(request):
    if request.method == 'POST':
        form = UserRegisterForm(data=request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Your account has been created!')
            return HttpResponseRedirect(reverse('users:login'))
    else:
        form = UserRegisterForm()
    context = {'form': form}
    return render(request, 'users/registration.html', context)

def profile(request):
    if request.method == 'POST':
        form = UserProfileForm(instance=request.user, data=request.POST, files=request.FILES)
        if form.is_valid():
            form.save()
            return HttpResponseRedirect(reverse('users:profile'))
    else:
        form = UserProfileForm(instance=request.user)

    baskets = Basket.objects.filter(user=request.user)
    total_sum = 0
    total_quantity = 0
    for basket in baskets:
        total_sum = total_sum + basket.sum()
        total_quantity = total_quantity + basket.quantity
    context = {'title': 'Store - Профиль', 'form': form, 'baskets': baskets, 'total_sum': total_sum, 'total_quantity': total_quantity }
    return render(request, 'users/profile.html', context)

def logout(request):
    auth.logout(request)
    return HttpResponseRedirect(reverse('index'))


@csrf_exempt
def validate_email(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get("email", "").lower()
        email_regex = r"(^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$)"
        if not re.match(email_regex, email):
            return JsonResponse({"valid": False, "message": "Некорректный формат Email."})
        if get_user_model().objects.filter(email=email).exists():
            return JsonResponse({"valid": False, "message": "Email уже используется."})
        return JsonResponse({"valid": True, "message": "Email доступен!"})
    return JsonResponse({"valid": False, "message": "Некорректный запрос."})