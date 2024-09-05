from rest_framework import generics, permissions
from .serializers import *
from .email import *

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


from django.http import JsonResponse
from django.views import View
from rest_framework.generics import UpdateAPIView

# Credentials

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(username=email, password=password)


        if user is None:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
        
        elif not user.is_active:
            return Response({'error': 'Blocked'}, status=status.HTTP_403_FORBIDDEN)
        
         
        else:
            if not user.is_staff:

                refresh = RefreshToken.for_user(user)
                refresh['username'] = str(user.username)

                access_token = str(refresh.access_token)
                refresh_token = str(refresh)

                content = {
                    'userid':user.id,
                    'access_token': access_token,
                    'refresh_token': refresh_token,
                    'isAdmin': user.is_superuser,
                    # 'isActive':user.is_active
                }
                return Response(content, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'This account is not a user account'}, status=status.HTTP_401_UNAUTHORIZED) 



class RegisterView(APIView):
    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            try:
                
                user = serializer.save(is_active=False) 
       
                send_otp(user.email)
                response_data = {
                    'message': 'OTP sent successfully.',
                    'email': user.email  
                }
                return Response(response_data, status=status.HTTP_200_OK)
            
            except Exception as e:
                print(f"Error during user registration: {e}")
                return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OTPVerificationView(APIView):
    def post(self, request):
        print('register working')
        serializer = OTPVerificationSerializer(data=request.data)
        print(serializer)
        
        if serializer.is_valid():
            print('valid serializer')
            try:
                email = serializer.validated_data.get('email')
                entered_otp = serializer.validated_data.get('otp')
                
                user = User.objects.get(email=email )
                print(user)
                
                if user.otp == entered_otp:
                    print('valid otp')
                    user.is_active = True
                    user.save()


                    return Response({'message': 'User registered and verified successfully'}, status=status.HTTP_200_OK)
                else:
                    return Response({'error': 'Invalid OTP,Please Check your email and Verify'}, status=status.HTTP_400_BAD_REQUEST)
                
            except User.DoesNotExist:
                return Response({'error': 'User not found or already verified'}, status=status.HTTP_404_NOT_FOUND)
            except Exception as e:
                print(f"Error during OTP verification: {e}")
                return Response({'error': 'Internal Server Error'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)    



class UserDetails(APIView):
    def get(self, request):
        user = User.objects.get(id=request.user.id)
        print(user.is_superuser)
        data = UserSerializer(user).data
        content = data
        return Response(content)
    

class LogoutView(APIView):
    def post(self, request):
        try:
            refresh_token = request.data["refresh"]
            print(refresh_token)
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        


        

class CreateTicketView(generics.CreateAPIView):
    queryset = Tickets.objects.all()
    serializer_class = TicketSerializer
    permission_classes = [permissions.IsAuthenticated]

    

from rest_framework.exceptions import PermissionDenied
    

class TicketView(generics.RetrieveAPIView):

    permission_classes=[permissions.IsAuthenticated]
    queryset=Tickets.objects.all()
    serializer_class=TicketSerializer  
    lookup_field = 'pk'

    def get_object(self):
        obj = super().get_object()
        user = self.request.user        
        if obj.user != user:
            raise PermissionDenied("You do not have permission to access this ticket.")
        
        return obj


class ListTicketView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = TicketSerializer

    def get_queryset(self):
        user = self.request.user
        return Tickets.objects.filter(user=user)
    


class UpdateTicketView(generics.UpdateAPIView):
    permission_classes=[permissions.IsAuthenticated]
    queryset=Tickets.objects.all()
    serializer_class=TicketSerializer  
    lookup_field = 'pk' 

    def get_object(self):
        obj = super().get_object()
        user = self.request.user        
        if obj.user != user:
            raise PermissionDenied("You do not have permission to access this ticket.")
        
        return obj




class DeleteTicketView(generics.DestroyAPIView):
    permission_classes=[permissions.IsAuthenticated]
    queryset=Tickets.objects.all()
    serializer_class=TicketSerializer  
    lookup_field = 'pk' 

    def get_object(self):
        obj = super().get_object()
        user = self.request.user        
        if obj.user != user:
            raise PermissionDenied("You do not have permission to access this ticket.")
        
        return obj

    
