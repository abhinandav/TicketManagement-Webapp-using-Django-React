from django.urls import path
from .views import *

urlpatterns=[
    path('login/',AdminLoginView.as_view()),
    path('users/',ListUsersView.as_view()),
    path('user/<int:id>/tickets/',ListTicketView.as_view()),
    path('user/ticket-update/<int:pk>/',UpdateTicketView.as_view()),
    path('user/ticket-delete/<int:pk>/',DeleteTicketView.as_view()),

]