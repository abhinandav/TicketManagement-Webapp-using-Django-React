from django.urls import path
from .views import *
from rest_framework_simplejwt.views import TokenRefreshView



from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('token/', TokenObtainPairView.as_view(serializer_class=MyTokenObtainPairSerializer), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),


    path('login/', LoginView.as_view(), name='login'),
    path('register/', RegisterView.as_view(), name='register'),
    path('otp/', OTPVerificationView.as_view(), name='otp'),
    path('logout/',LogoutView.as_view(),name='login'),
    path('user-details/',UserDetails.as_view(),name='user-details'),

    # tickets
    path('ticket/<int:pk>/',TicketView.as_view(), name='ticket-view'),
    path('ticket-create/',CreateTicketView.as_view(), name='ticket-create'),
    path('tickets-list/', ListTicketView.as_view(), name='ticket-list'),
    path('ticket-update/<int:pk>/', UpdateTicketView.as_view(), name='ticket-update'),
    path('ticket-delete/<int:pk>/', DeleteTicketView.as_view(), name='ticket-delete'),

]

