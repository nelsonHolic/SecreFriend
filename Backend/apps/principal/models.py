from __future__ import unicode_literals

from django.db import models

def get_or_none(classmodel, **kwargs):
    try:
        return classmodel.objects.get(**kwargs)
    except classmodel.DoesNotExist:
        return None



class Seguridadfriend(models.Model):
    id = models.IntegerField(primary_key=True)
    username = models.TextField(unique=True)
    name = models.TextField()
    password = models.TextField()
    seleccionado = models.BooleanField()
    class Meta:
        db_table = 'seguridadfriend'

class Userimage(models.Model):
    id = models.IntegerField(primary_key=True)
    usuario = models.ForeignKey(Seguridadfriend, db_column='usuario')
    image = models.TextField()
    class Meta:
        db_table = 'userimage'