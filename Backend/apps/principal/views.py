from django.shortcuts import render
from django.views.generic import View
from django.shortcuts import  render_to_response, RequestContext


# Create your views here.


class VistaTest(View):

    def logueo(self,request, *args, **kwargs):
        return render_to_response('principal/logueo.html',RequestContext(request))


    def principal(self,request, *args, **kwargs):
        return render_to_response('principal/index.html',RequestContext(request))