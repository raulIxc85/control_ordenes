#Producto serializaer
from rest_framework import serializers
from api.models import Producto

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = (
            'id',
            'descripcionCorta',
            'descripcion',
            'imagen',
            'precio'
        )

class ProductoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = (
            'descripcionCorta',
            'precio'
        )



