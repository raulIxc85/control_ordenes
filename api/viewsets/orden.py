#Orden View
import json
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from django.db import transaction
from rest_framework.pagination import PageNumberPagination
from django.db.models import Sum, F, ExpressionWrapper, DecimalField, Avg

from api.models import Orden
from django.contrib.auth.models import User
from api.models import Detalle_orden
from api.models import Producto
from api.serializers import OrdenSerializer, OrdenRegistroSerializer

class OrdenViewset(viewsets.ModelViewSet):
    queryset = Orden.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ('total',)
    search_fields = ('total',)
    ordering_fields = ('total',)

    def get_serializer_class(self):
        """Define serializer para API"""
        if self.action == 'list' or  self.action == 'retrieve':
            return OrdenSerializer
        else:
            return OrdenRegistroSerializer

    def create(self, request):
        try:
            with transaction.atomic():

                user = request.user
                usuario=User.objects.filter(username=request.user)
               
                if usuario:
                    usuarioR = request.user.id
                else:
                    buscar=User.objects.get(username='invitado')
                    usuarioR = buscar.id
                
                data = request.data
                
                #verificar usuario
                verificar = Producto.objects.filter(pk=data.get("id"),usuario=usuarioR)
                
                if verificar:
                    
                    return Response({'mensaje': {'No puede comprar productos de usted mismo'} }, status=status.HTTP_400_BAD_REQUEST)
                
                else:
                    
                    #validacion de los datos al serializer
                    serializer = OrdenRegistroSerializer(data=data)

                    if serializer.is_valid():
                        #insertar los datos luego de validar
                        Orden.objects.create(
                            total = data.get("total"),
                            usuario = User.objects.get(pk=usuarioR)
                        )
                        id = Orden.objects.latest('id')
                        id_orden = Orden.objects.filter(pk=id.id,usuario=usuarioR)
                        detalle = Detalle_orden.objects.create(
                            cantidad = data.get("cantidad"),
                            precio = data.get("precio"), 
                            producto = Producto.objects.get(pk=data.get("id")),
                            orden = id
                        )
                    else:
                        print("error en la validacion de datos")
            
                    return Response(serializer.data, status=status.HTTP_200_OK)
                    
        except Exception as e:
                return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    

    @action(methods=["get"], detail=False)
    def total_ventas(self, request):
        user = request.user.id
        ventas = Detalle_orden.objects.values(
            'producto__descripcionCorta'
        ).annotate(total = Sum( ExpressionWrapper(
            F('precio') * F('cantidad'),
            output_field=DecimalField()))
        ).filter(producto__usuario=user)

        #paginando el resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(ventas, request)
        serializer = resultado_pagina
        return paginador.get_paginated_response(serializer)


    @action(methods=["get"], detail=False)
    def total_ventas_global(self, request):
        user = request.user.id
        total = Detalle_orden.objects.filter(
            producto__usuario=user
        ).aggregate(
            total = Sum( ExpressionWrapper(
            F('precio') * F('cantidad'),
            output_field=DecimalField()))
        )

        promedio = Detalle_orden.objects.filter(
            producto__usuario=user
        ).aggregate(
            total = Avg('producto__precio')
        )

        data = {
            'total_venta': total,
            'promedio_precio': promedio
        }
        return Response(data, status=status.HTTP_200_OK)


    def get_permissions(self):
        """ Define permisos para este recurso """
        if self.action == "create":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]




