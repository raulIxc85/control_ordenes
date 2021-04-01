#Orden serializer
from rest_framework import serializers
from api.models import Orden

class OrdenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orden
        fields = (
            'id',
            'total',
        )

class OrdenRegistroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Orden
        fields = (
            'total',
        )




