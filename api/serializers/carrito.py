#Carrito serializaer
from rest_framework import serializers
from api.models import Carrito

class CarritoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrito
        fields = (
            'id',
            'usuario',
            'producto',
            'cantidad',
        )

class CarritoRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carrito
        fields = (
            'cantidad',
        )



