from django.db import models

# Create your models here.

class AdminPage(models.Model):
    title = models.CharField(max_length=350, null=True)
    body = models.CharField(max_length=350, blank=False)
    colour = models.CharField(max_length=100, null=True)
    image = models.ImageField(upload_to='KB_Admin_logo', blank=True, null=True)





class VisitorCount(models.Model):
    name = models.CharField(max_length=200, blank=False, null=True)
    email = models.CharField(max_length=200, blank=False, null=True)
    role = models.CharField(max_length=200, blank=False, null=True)
    time_of_visit = models.CharField(max_length=300, blank=False, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
