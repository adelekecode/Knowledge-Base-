from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from .serializers import CategorySerializer, ArticleSerializer
from rest_framework.views import APIView
from account.permissions import IsAdmin
from rest_framework.response import Response
from .models import Category, Articles

# Create your views here.

class CreateCategoryView(APIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (IsAdmin,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        data = {}
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data['response'] = 'successfully created a category.'
 
        return Response(data)


class UpdateCategory(APIView):
    permission_classes = (IsAdmin,)
    def put(self, request, pk):
        try:
            instance = Category.objects.get(id=pk)
        except Category.DoesNotExist:
            return Response({'error': 'profile not found'}, status=404)

        serializer = CategorySerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    

    def delete(self, request, pk):
        try:
            instance = Category.objects.get(id=pk)
            instance.delete()
            return Response({"message": "post successfully deleted"}, 200)
        except Category.DoesNotExist:
            return Response({"message": "post id does not exist!"}, 404)

class CategoryID(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, pk):
        try:
            instance = Category.objects.get(id=pk)
            serializer = CategorySerializer(instance)
            return Response(serializer.data)
        except Category.DoesNotExist:
            return Response({'error': 'category id not found'}, status=404)
        
class GetCategory(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        try:
            all_categories = Category.objects.all().order_by('-id')
        except Category.DoesNotExist:
            return Response({"error": "categories not available"}, 404)
        serializer = CategorySerializer(all_categories, many=True)
        data = {
            "all categories": serializer.data
        }
        return Response(data)


class CreateArticleView(APIView):
    queryset = Articles.objects.all()
    serializer_class = ArticleSerializer
    permission_classes = (IsAdmin,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        data = {}
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data['response'] = 'successfully created an article.'
 
        return Response(data)

class UpdateArticleView(APIView):
    permission_classes = (IsAdmin,)

    def put(self, request, pk):
        try:
            instance = Articles.objects.get(id=pk)
        except Articles.DoesNotExist:
            return Response({'error': 'article not found'}, status=404)

        serializer = ArticleSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    

    def delete(self, request, pk):
        try:
            instance = Articles.objects.get(id=pk)
            instance.delete()
            return Response({"message": "article successfully deleted"}, 200)
        except Articles.DoesNotExist:
            return Response({"message": "article id does not exist!"}, 404)

    
class ArticleID(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk):
        try:
            instance = Articles.objects.get(id=pk)
            serializer = ArticleSerializer(instance)
            return Response(serializer.data)
        except Articles.DoesNotExist:
            return Response({'error': 'article id not found'}, status=404)
        

class CategoryArticles(APIView):
    permission_classes = (IsAuthenticated,)

    def get(self, request, pk): 
        try:
            articles = Articles.objects.filter(category_id=pk).order_by('-id')
            category = Category.objects.get(id=pk)
            serializer = ArticleSerializer(articles, many=True)
            data = {
                "category_name": category.name,
                "article": serializer.data
            }
            return Response(data)
        except Category.DoesNotExist:
            return Response({"error": "category articles id not found"}, status=404)



class CategoryList(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        categories = Category.objects.all().order_by('name')
        data = []

        for category in categories:
            articles = Articles.objects.filter(category_id=category.id).order_by('-id')
            serializer = ArticleSerializer(articles, many=True)
            category_data = {
                "id": category.id,
                "name": category.name,
                "articles": serializer.data
                
            }
            data.append(category_data)

        return Response(data)



class GetArticle(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        all_categories = Articles.objects.all().order_by('-id')
        serializer = ArticleSerializer(all_categories, many=True)
        data = {
            "all articles": serializer.data
        }
        return Response(data)
    
class GetArtics(APIView):
    permission_classes = (IsAdmin,)
    def get(self, request):
        categories = Category.objects.all().order_by('-id')
        data = []

        for category in categories:
            articles = Articles.objects.filter(category_id=category.id).order_by('-id')
            categories_ = Category.objects.filter(id=category.id)
            serializer = ArticleSerializer(articles, many=True)
            serializer_ = CategorySerializer(categories_, many=True) 
            articles_data = []
            for article in serializer.data:
                articles_data.append({
                    "article_id": article['id'],
                    "title": article['title'],
                    "data_glossary": article['data_glossary'],
                    "play_book": article['play_book'],
                    "article_time": article['time'],
                    "category_id": serializer_.data[0].get('id'),
                    "category_name": serializer_.data[0].get('name'),
                    "category_time": serializer_.data[0].get('time')
                })
            data.append(articles_data)

        return Response(data)




