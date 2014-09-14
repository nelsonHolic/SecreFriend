from django.shortcuts import render_to_response
from django.shortcuts import RequestContext
from django.core import serializers
from django.http import HttpResponse
from django.views.generic import View
import json
from django.http import HttpResponseRedirect

class VistaTest(View):

    def logueo(self,request, *args, **kwargs):
        loguearse = True
        try:
            if request.session['usuario']:
                return HttpResponseRedirect('/principal/')
                loguearse = False
        except Exception:
            pass

        return render_to_response('principal/logueo.html',RequestContext(request))


    def principal(self,request, *args, **kwargs):
        loguearse = True
        try:
            if request.session['usuario']:
                loguearse = False
                return render_to_response('principal/index.html',RequestContext(request))
        except Exception:
            pass
        return render_to_response('principal/logueo.html',RequestContext(request))




from models import *
from django.views.generic.base import TemplateView


class ajaxRepond(TemplateView):

    def loguearse(self,request,*args,**kwargs):
        datosDeLogueo = json.loads(request.body)
        #cali = Calificacion.objects.all()
        print datosDeLogueo['user']['username']
        usuario = get_or_none(Seguridadfriend,username = datosDeLogueo['user']['username'])
        error = None
        if(usuario):
            if(datosDeLogueo['user']['password'] == usuario.password):
                request.session['usuario'] = serializers.serialize('json',[usuario],fields = ('username','name'))
            else:
                error = 'invalid'
        else:
            error = 'notexist'
        return HttpResponse(error, mimetype = 'application/json')

    def pruebaSession(self,request,*args,**kwargs):
        print 'usuario'
        print request.session['usuario']
        return HttpResponse('dg', mimetype = 'application/json')

    def desLoguearse(self,request,*args,**kwargs):
            request.session['usuario'] = None
            return HttpResponse('succes')