from django.urls import path, include
from . import views


urlpatterns = [
    path('create', views.AdminView.as_view()),
    path('profile', views.UpdateAdminView.as_view()),
    path('category/total', views.CategoryAggregate.as_view()),
    path('articles/total', views.ArticleAggregate.as_view()),
    path('total/visits', views.VisitsCount.as_view()),
    path('chart/data/<int:pk>', views.ChartData.as_view())

    
]
