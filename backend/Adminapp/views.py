from rest_framework import generics, permissions
from .serializers import *
from user.models import *
from user.serializers import TicketSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate,logout
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.decorators import api_view, permission_classes
from django.shortcuts import get_object_or_404
from rest_framework import status, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import generics



class AdminLoginView(APIView):
    def post(self,request):
        email=request.data['email']
        password=request.data['password']

        user=authenticate(username=email,password=password)

        if user.is_superuser:
            refresh = RefreshToken.for_user(user)
            refresh['username'] = str(user.username)

            access_token = refresh.access_token
            refresh_token = str(refresh)

            content = {
                'access_token': str(access_token),
                'refresh_token': refresh_token,
                'isAdmin': user.is_superuser,
            }
        elif user.is_staff:
            return Response({'This account is not a Superuser account'}, status=status.HTTP_401_UNAUTHORIZED)
        else:
                return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response(content, status=status.HTTP_200_OK)



class ListUsersView(generics.ListAPIView):
    queryset=User.objects.filter(is_superuser=False)
    serializer_class=UserSerializer

class ListTicketView(generics.ListAPIView):
    queryset=Tickets.objects.all()
    serializer_class=TicketSerializer
    def get_queryset(self):
        id = self.kwargs['id'] 
        return Tickets.objects.filter(user=id)




class UpdateTicketView(generics.UpdateAPIView):
    # permission_classes=[permissions.IsAuthenticated]
    queryset=Tickets.objects.all()
    serializer_class=TicketSerializer  
    lookup_field = 'pk' 





class DeleteTicketView(generics.DestroyAPIView):
    # permission_classes=[permissions.IsAuthenticated]
    queryset=Tickets.objects.all()
    serializer_class=TicketSerializer  
    lookup_field = 'pk' 



    

    