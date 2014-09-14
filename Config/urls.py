from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from django.conf.urls.static import static
from Config.settings import FRONTEND_URL
from Backend.apps.principal.views import *
from django.conf import settings

urlpatterns = patterns('',

    url(r'^admin/', include(admin.site.urls)),
    url(r'', include('Backend.apps.principal.urls')),
) + static('/Frontend/', document_root=FRONTEND_URL)

