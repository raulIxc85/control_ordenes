#Model Orden
from django.db import models
from django.contrib.auth.models import User

class Orden(models.Model):

    usuario = models.ForeignKey(
        User,
        related_name = 'usuarioOrden',
        on_delete = models.PROTECT
    )
    total = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=0
    )
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __str__(self):
        return ('total: {}'.format(self.total))

