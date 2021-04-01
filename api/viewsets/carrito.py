#Carrito View
import json
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from api.models import Carrito
from django.contrib.auth.models import User
from api.models import Producto
from api.serializers import CarritoSerializer,CarritoRegistroSerializer

class CarritoViewset(viewsets.ModelViewSet):
    queryset = Carrito.objects.filter()

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ('cantidad',)
    search_fields = ('cantidad',)
    ordering_fields = ('cantidad',)

    def get_serializer_class(self):
        """Define serializer para API"""
        if self.action == 'list' or  self.action == 'retrieve':
            return CarritoSerializer
        else:
            return CarritoRegistroSerializer

    def create(self, request):
        try:
            user = request.user
            usuario=User.objects.filter(username=request.user)
            
            if usuario is not None:
                buscar=User.objects.get(username='invitado')
                usuarioR = buscar.id
            else:
                usuarioR = user

            data = request.data
            #validacion de los datos al serializer
            serializer = CarritoRegistroSerializer(data=data)

            if serializer.is_valid():
                #insertar los datos luego de validar
                Carrito.objects.create(
                    cantidad = data.get("cantidad"),
                    producto = Producto.objects.get(pk=data.get("producto")),
                    usuario = User.objects.get(pk=usuarioR)
                )
            else:
                print("error en la validacion de datos")
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

    def get_permissions(self):
        """ Define permisos para este recurso """
        if self.action == "create":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]




