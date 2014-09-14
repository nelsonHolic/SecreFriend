__author__ = 'noescobar'
from django.conf.urls import patterns, include, url
from .views import *


urlpatterns = patterns('',
    url(r'^$',VistaTest().logueo),
    url(r'^principal/$',VistaTest().principal),
    url(r'^loguearse/$',ajaxRepond().loguearse),
    url(r'^puebaSession/$',ajaxRepond().pruebaSession),
    url(r'^desLoguearse/$',ajaxRepond().desLoguearse),
    url(r'^getSorteados/$',ajaxRepond().getSorteadores),
    url(r'^postSorteado/$',ajaxRepond().postSorteado),
)