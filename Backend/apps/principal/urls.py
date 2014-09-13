__author__ = 'noescobar'
from django.conf.urls import patterns, include, url
from .views import *


urlpatterns = patterns('',
    url(r'^$',VistaTest().logueo),
    url(r'^principal/$',VistaTest().principal),
)