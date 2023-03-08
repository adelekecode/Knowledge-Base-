from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.views import APIView
from . models import AdminPage, VisitorCount
from . serializers import AdminSerializer, VisitorSerializer
from account.permissions import IsAdmin
from category.models import Category, Articles
from django.db.models import Count
from django.db.models.functions import TruncMonth
from rest_framework.permissions import IsAuthenticated


# Create your views here.

class AdminView(APIView):
    serializer_class = AdminSerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        data = {}
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data['response'] = 'successfully created an admin view.'

        return Response(data)

class UpdateAdminView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        try:
            page_data = AdminPage.objects.first()
        except AdminPage.DoesNotExist:
            return Response({"error": "page not found"}, 404)
        serializer = AdminSerializer(page_data)
        data = {
            "page_data": serializer.data
        }
        return Response(data)
    def put(self, request):
        try:
            instance = AdminPage.objects.first()
        except AdminPage.DoesNotExist:
            return Response({'error': 'page not found'}, status=404)

        serializer = AdminSerializer(instance, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)
    

class CategoryAggregate(APIView):
    permission_classes = (IsAdmin,)
    def get(self, request):
        try:
            total = Category.objects.count()
            return Response({"total_category": total}, 200)
        except Category.DoesNotExist:
            return Response({"error": "categories not found"}, 404)

class ArticleAggregate(APIView):
    def get(self, request):
        try:
            total = Articles.objects.count()
            return Response({"total_articles": total}, 200)
        except Articles.DoesNotExist:
            return Response({"error": "articles not found"}, 404)



class VisitsCount(APIView):
    serializer_class = VisitorSerializer
    permission_classes = (IsAuthenticated,)


    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        data = {}
        serializer.is_valid(raise_exception=True)
        serializer.save()
        data['response'] = 'successfully registered a visit.'

        return Response(data)
    

    def get(self, request):
        try:
            total = VisitorCount.objects.count()
            return Response({"total_vist": total}, 200)
        except VisitorCount.DoesNotExist:
            return Response({"error": "model not found"}, 404)



class ChartData(APIView):
    permission_classes = (IsAdmin,)
    def get(self, request, pk):
        try:
            items = VisitorCount.objects.annotate(month=TruncMonth('created_at')).filter(created_at__year=pk).values('month').annotate(count=Count('id')).order_by('month')

            return Response({"month_data": items}, 200)
        except VisitorCount.DoesNotExist:
            return Response({"error": "request not found"}, 404)
    