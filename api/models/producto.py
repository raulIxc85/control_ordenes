#Model producto
from django.db import models
from django.contrib.auth.models import User

class Producto(models.Model):

    descripcionCorta = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=200, blank=True, null=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    imagen = models.ImageField(upload_to="producto", blank=True, null=True)
    
    usuario = models.ForeignKey(
        User,
        related_name='usuarioProducto',
        on_delete=models.PROTECT
    )

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)


    def __str__(self):
        return self.descripcionCorta

    
    def delete(self, *args):
        self.activo=False
        self.save()
        return True


