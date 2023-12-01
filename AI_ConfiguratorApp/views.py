from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .utils import extract_data_from_prompt,create_exotel_campaign

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

            app_users = []
            user_objs = AppUser.objects.all()
            for i in user_objs:
                app_users.append(i.user_id)
            
            if user_id in app_users:
                prompt_data = extract_data_from_prompt(message)
                exotel_response = create_exotel_campaign(prompt_data)
                if exotel_response.status == 200:
                    response['message'] = "Your Campaign is created successfull, you can check it on DashBoard."
                    response['status'] = 200
                    return Response(data=response, status=200)
        except Exception as e:
            pass
        return Response(data=response, status=500)