from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from datetime import datetime, timedelta, timezone
import uuid



class AppUser(models.Model):

    user_id = models.CharField(default="", max_length=50)

    created_on = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "AppUser"
        verbose_name_plural = "AppUser"

    def __str__(self):
        return str(self.user_id)

class ConversationModel(models.Model):

    user_id = models.ForeignKey(AppUser, on_delete=models.CASCADE)

    message = models.CharField(default="", max_length=500)

    receiver = models.CharField(default="",max_length=50)

    created_on = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "ConversationModel"
        verbose_name_plural = "ConversationModel"

    def __str__(self):
        return str(self.receiver)