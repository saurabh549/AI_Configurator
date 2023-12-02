from django.urls import path, include
from . import views

urlpatterns = [
    path(r'',views.index),
    path(r'message/', views.MessageAPI.as_view(), name="message-api"),
]