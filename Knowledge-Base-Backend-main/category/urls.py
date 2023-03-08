from django.urls import path, include
from . import views


urlpatterns = [
    path('create', views.CreateCategoryView.as_view()),
    path('update/<int:pk>', views.UpdateCategory.as_view()),
    path('<int:pk>', views.CategoryID.as_view()),
    path('all', views.GetCategory.as_view()),
    path('article/create', views.CreateArticleView.as_view()),
    path('article/<int:pk>', views.ArticleID.as_view()),
    path('article/update/<int:pk>', views.UpdateArticleView.as_view()),
    path('article/all', views.GetArticle.as_view()),
    path('articles/<int:pk>', views.CategoryArticles.as_view()),
    path('data/list', views.CategoryList.as_view()),
    path('article/list', views.GetArtics.as_view())
]
