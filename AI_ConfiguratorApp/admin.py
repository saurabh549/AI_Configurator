from django.contrib import admin
from AI_ConfiguratorApp.models import *
# Register your models here.

class AppUserAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'created_on')
admin.site.register(AppUser,AppUserAdmin)

class ConversationModelAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'receiver', 'created_on')
admin.site.register(ConversationModel,ConversationModelAdmin)