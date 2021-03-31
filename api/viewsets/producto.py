#Producto View
import json
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.core.files import File
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

from api.models import Producto
from api.serializers import ProductoSerializer,ProductoRegistroSerializer

class ProductoViewset(viewsets.ModelViewSet):
    queryset = Producto.objects.filter(activo=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ('descripcionCorta',)
    search_fields = ('descripcionCorta',)
    ordering_fields = ('descripcionCorta',)

    def get_serializer_class(self):
        """Define serializer para API"""
        if self.action == 'retrieve':
            return ProductoSerializer
        else:
            return ProductoRegistroSerializer
    

    def list(self, request):
        user = request.user.id
        productos = Producto.objects.filter(usuario=user, activo=True)
        
        #paginando el resultado
        paginador = PageNumberPagination()
        resultado_pagina = paginador.paginate_queryset(productos, request)
        serializer = ProductoSerializer(resultado_pagina, many=True)
        return paginador.get_paginated_response(serializer.data)


    def create(self, request):
        try:
            user = request.user
            data = request.data
            imagen = data.get("imagen")
            datos = json.loads(data["data"])
            #validacion de los datos al serializer
            serializer = ProductoRegistroSerializer(data=datos)

            if serializer.is_valid():
                #insertar los datos luego de validar
                Producto.objects.create(
                    descripcionCorta = datos.get("descripcionCorta"),
                    descripcion = datos.get("descripcion"),
                    precio = datos.get("precio"),
                    imagen = File(imagen),
                    usuario = user
                )
            else:
                print("error en la validacion de datos")
            
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)


    def update(self, request, pk):
        try:
            data = request.data
            imagen = data.get("imagen")
            datos = json.loads(data["data"])

            #Modificar datos
            producto = Producto.objects.get(pk=pk)
            if imagen is not None:
                if producto.imagen is not None:
                    producto.imagen.delete()
                    producto.imagen = File(imagen)
            
            producto.descripcionCorta = datos.get("descripcionCorta")
            producto.descripcion = datos.get("descripcion")
            producto.precio = datos.get("precio")
            producto.save()

            return Response({'registro modificado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    


    def destroy(self, request, pk):
        try:
            producto = Producto.objects.get(pk=pk)
            if producto.imagen is not None:
                producto.imagen.delete()
            producto.delete()
            return Response({'registro eliminado'}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'detail': str(e)}, status=status.HTTP_400_BAD_REQUEST)



    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]





