from django.db import models
from django.contrib.auth.models import User
# Create your models here.
from datetime import datetime, timedelta, timezone
import uuid
import hashlib
from .utils import generate_prompt_id



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


class PromptManager(models.Manager):
    def create(self, *args, **kwargs):
        user = kwargs['user']
        kwargs["prompt_id"] = generate_prompt_id(str(user))
        return super().create(*args, **kwargs)


class Prompts(models.Model):
    prompt_id    = models.CharField(max_length=50, unique=True, editable=False)

    user = models.ForeignKey(AppUser, on_delete=models.CASCADE)

    is_completed = models.BooleanField(default=False)

    prompt_data  = models.TextField(default={})

    missing_fields = models.CharField(max_length=50, blank=True, null=True)

    conversations = models.ManyToManyField(ConversationModel)

    created_on = models.DateTimeField(auto_now=True)

    objects = PromptManager()

    def save(self, *args, **kwargs):
        if not self.prompt_id:
            self.prompt_id = generate_prompt_id(str(self.user))
        super(Prompts, self).save(*args, **kwargs)

    def __str__(self):
        return self.prompt_id

    class Meta:
        verbose_name = "Prompts"
        verbose_name_plural = "Prompts"
    