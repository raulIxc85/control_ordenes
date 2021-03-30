#Model Detalle Orden
from django.db import models
from api.models.orden import Orden
from api.models.producto import Producto

class Detalle_orden(models.Model):

    orden = models.ForeignKey(
        Orden,
        related_name = 'ordenDetalle',
        on_delete = models.PROTECT  
    )
    producto = models.ForeignKey(
        Producto,
        related_name = 'productoOrdenDetalle',
        on_delete = models.PROTECT 
    )
    cantidad = models.PositiveIntegerField(default=0)
    precio = models.DecimalField(
        max_digits=10, 
        decimal_places=2, 
        default=0
    )


    def __str__(self):
        return ('cantidad: {}, precio: {} '.format(self.cantidad, self.precio))







