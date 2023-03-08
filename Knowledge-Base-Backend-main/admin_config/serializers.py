from rest_framework import serializers
from . models import AdminPage, VisitorCount





class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminPage
        fields = [
            'id',
            'title',
            'body',
            'colour',
            'image'

        ]



class VisitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitorCount
        fields = '__all__'