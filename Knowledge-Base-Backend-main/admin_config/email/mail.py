from django.core.mail import send_mail
from django.conf import settings




def create_user(request, user_email, user_name, password):
    subject = 'Account Creation'
    message = f""""
    Dear {user_name},

 Your account has been created, and you can now log in using the following details:

Email: {user_email}
Password: {password}

Please keep this information secure and do not share it with anyone. Navigate to your settings to change password.

Best regards,

GetMobile
    
    """
    email_from = settings.EMAIL_HOST_USER
    recipient_list = [user_email,]
    send_mail(subject=subject, message=message, from_email=email_from, recipient_list=recipient_list, fail_silently=False)
