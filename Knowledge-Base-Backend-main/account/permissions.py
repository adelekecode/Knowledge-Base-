from rest_framework import permissions
from rest_framework.exceptions import AuthenticationFailed


from django.conf import settings
from rest_framework_simplejwt.settings import api_settings






class IsAdmin(permissions.BasePermission):
    print(api_settings.SIGNING_KEY == settings.SECRET_KEY)

    # print("Hey I'm here")
    """
    Allows access only to only admin users.
    """
    def has_permission(self, request, view):
        if request.user.is_admin:
            return True
        else:
            raise AuthenticationFailed(detail="Authentication credentials were not provided oh ")