from rest_framework import serializers
from .models import Category, Articles



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Articles
        fields = '__all__'


class ArticleSerial(serializers.Serializer):
    title = serializers.CharField()
    data_glossary = serializers.CharField()
    play_book = serializers.CharField()
    time = serializers.DateTimeField()


# class GetArticle