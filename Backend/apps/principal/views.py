from django.shortcuts import render_to_response
from django.shortcuts import RequestContext
from django.core import serializers
from django.http import HttpResponse
from django.views.generic import View
import json
from django.http import HttpResponseRedirect
from django.db.models import Q
import random
import operator

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
                error = 'usuario o contrasena inconrrecta'
        else:
            error = 'usuario o contrasena inconrrecta'
        if(error):
            mensaje = json.dumps({'error': error}, sort_keys=True,
                             indent=4, separators=(',', ': '))
            return HttpResponse(mensaje, mimetype = 'application/json')
        else:
            return HttpResponse('"success"', mimetype = 'application/json')


    def pruebaSession(self,request,*args,**kwargs):
        print request.session['usuario']
        return HttpResponse('dg', mimetype = 'application/json')

    def desLoguearse(self,request,*args,**kwargs):
            request.session['usuario'] = None
            return HttpResponse('succes')


    def getSorteadores(self,request,*args,**kwargs):
        usuario = json.loads(request.session['usuario'])[0]
        error = None
        if (usuario):
            print usuario
            usuario = get_or_none(Seguridadfriend,id = usuario[u'pk'])
            if(usuario):
                if(not usuario.jugado):
                    query = Q(seleccionado = False)
                    jugadores = Seguridadfriend.objects.filter(query)
                    jugadores = jugadores.exclude(id = usuario.id)
                    dato = serializers.serialize('json',jugadores,fields = ('username','name'))
                    return HttpResponse(dato, mimetype = 'application/json')
                else:
                    error = 'usted ya ha jugado'
                    print error
            else:
                error = 'un error ha ocurrido'
        else:
            error = 'un error ha ocurrido'
        return HttpResponse(error)

    def postSorteado(self,request,*args,**kwargs):
        usuario = json.loads(request.session['usuario'])[0]
        error = None
        if (usuario):
            print usuario
            usuario = get_or_none(Seguridadfriend,id = usuario[u'pk'])
            if(usuario):
                if(not usuario.jugado):
                    query = Q(seleccionado = False)
                    elegido = json.loads(request.body)
                    usuarioElegido = get_or_none(Seguridadfriend,id = elegido['id'])
                    print 'usuario elegido'
                    print usuarioElegido.username
                    usuarioElegido.seleccionado = True
                    usuarioElegido.save()
                    usuario.jugado = True
                    usuario.save()
                    return HttpResponse('sucess', mimetype = 'application/json')
                else:
                    error = 'usted ya ha jugado'
                    print error
            else:
                error = 'un error ha ocurrido'
        else:
            error = 'un error ha ocurrido'
        return HttpResponse(error)