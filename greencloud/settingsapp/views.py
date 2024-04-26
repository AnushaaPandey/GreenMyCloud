from django.shortcuts import render

# Create your views here.
from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response

from .models import Setting

# Create your views here.

class SettingsView(APIView):
    def get(self, request, format=None):
        settingsDict = {}

        try:
            settingObjects = Setting.objects.all()

            for setting in settingObjects:
                settingsDict[setting.name] = setting.value
        # print("API Was Called")
            return Response("You Made It", status=200)
        except:
            return Response(status=404)
    
    def post(Self, request, format=None):

        settings = request.data['settings']
        bad_settings = []
   
        for setting in settings:
            try:
                new_setting = Setting(name=setting['NAME'], valeu=settings['VALUE'])
                new_setting.save()
        
            except:
                bad_settings.append(setting)
        
        if len(bad_settings)>0:
            return Response({"INVALID SETTINGS": bad_settings}, status=200)
        
        else:
            return Response(status=200)