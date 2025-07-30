from django.urls import path
from . import views

urlpatterns = [
    path('cards/', views.get_cards, name='get_cards'),
    path('cards/add/', views.add_card, name='add_card'),
    path('cards/update/<int:card_id>/', views.update_card, name='update_card'),
    path('cards/delete/<int:card_id>/', views.delete_card, name='delete_card'),
]