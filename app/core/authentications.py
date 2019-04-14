import jwt

from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser

from rest_framework import authentication
from rest_framework import exceptions


def get_http_authorization(request):
    auth = request.META.get('HTTP_AUTHORIZATION', '').split()
    prefix = 'JWT'

    if len(auth) != 2 or auth[0].lower() != prefix.lower():
        return None

    return auth[1]


def decode_jwt(token):
    try:
        payload = jwt.decode(
            token,
            settings.SECRET_KEY,
            True,
            options={
                'verify_exp': False,
            },
            leeway=0,
            audience=None,
            issuer=None,
            algorithms=['HS256']
        )
        return payload
    except jwt.exceptions.DecodeError:
        return None


# remember User has a email like USERNAME_FIELD
def get_user_by_natural_key(email):
    User = get_user_model()
    try:
        return User.objects.get_by_natural_key(email)
    except User.DoesNotExist:
        return None


class CustomDRFAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        token = get_http_authorization(request)
        if not token:
            return (AnonymousUser(), None)

        payload = decode_jwt(token)
        if not payload:
            return (AnonymousUser(), None)

        user = get_user_by_natural_key(payload['email'])
        if not user:
            raise exceptions.AuthenticationFailed('No such user')

        return (user, None)
