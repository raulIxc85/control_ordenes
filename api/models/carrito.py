#Model Carrito
from django.db import models
from django.contrib.auth.models import User
from api.models.producto import Producto

class Carrito(models.Model):

    usuario = models.ForeignKey(
        User,
        related_name = 'usuarioCarrito',
        on_delete = models.PROTECT
    )
    producto = models.ForeignKey(
        Producto,
        related_name = 'productoCarrito',
        on_delete = models.PROTECT
    )
    cantidad = models.PositiveIntegerField(default=0)




