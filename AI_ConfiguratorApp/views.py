from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .utils import extract_data_from_prompt,create_exotel_campaign
import sys
# Create your views here.


def index(request):
    response = HttpResponse()
    response.write("<h1>Welcome to our AI Configurator App</h1>")
    return response


class MessageAPI(APIView):

    def post(self,request,*args,**kwargs):
        response = {}
        try:
            try:
                data = request.data
            except:
                response['status'] = 400
                response['message'] = "Malformed request body."
                return Response(data=response, status=response['status'])

            user_id = ''
            if 'user_id' in data:
                user_id = data['user_id']
            if user_id == "":
                response['status'] = 400
                response['message'] = "Invalid User_id"
                return Response(data=response,status=400)

            message = ''
            if 'message' in data:
                message = data['message']
            if message == "":
                response['status'] = 400
                response['message'] = "Invalid message"
                return Response(data=response,status=400)

            receiver = ""
            if 'receiver' in data:
                receiver = data['receiver']
            if receiver == "":
                response['status'] = 400
                response['message'] = "Invalid receiver"
                return Response(data=response,status=400)

            try:
                user_obj = AppUser.objects.get(user_id=user_id)
            except:
                response['message'] = "You are not the configrator user."
                response['status'] = 403
                return Response(data=response, status=200)
            
            if user_obj:
                
                
                # creating or getting prompt id
                prompt_id = data.get("prompt_id", None)
                if prompt_id:
                    prompt_obj = Prompts.objects.filter(prompt_id=prompt_id).first()
                else:
                    prompt_obj = Prompts.objects.create(user=user_obj)

                # storing user conversation in prompt
                message_obj = ConversationModel.objects.create(
                    user_id = user_obj,
                    message = message,
                    receiver = receiver
                )
                
                prompt_obj.conversations.add(message_obj)  # saving conversation into prompt

                # prompt_data = extract_data_from_prompt(message)
                # exotel_response = create_exotel_campaign(prompt_data)
                # if exotel_response.status == 200:
                #     response['message'] = "Your Campaign is created successfull, you can check it on DashBoard."
                #     response['status'] = 200
                #     return Response(data=response, status=200)
                response['message']   = "Your Campaign is created successfull, you can check it on DashBoard."
                message_obj = ConversationModel.objects.create(
                    user_id = user_obj,
                    message = response['message'],
                    receiver = user_obj.user_id
                )
                prompt_obj.conversations.add(message_obj) # saving conversation into prompt
                
                response['status']    = 200
                response['prompt_id'] = prompt_obj.prompt_id
                response['receiver']  = user_obj.user_id
                return Response(response, status=200)
        except Exception as e:
            exc_type, exc_obj, exc_tb = sys.exc_info()
            response['error']   = str(e) + str(exc_tb.tb_lineno)
            response['status']    = 500
            return Response(response, status=500)