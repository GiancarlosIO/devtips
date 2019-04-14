from django.db import models

from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
                                        PermissionsMixin


class Image(models.Model):
    size = models.FloatField(blank=True, null=True)
    filename = models.CharField(max_length=255)
    image = models.FileField(blank=True, null=True)

    def __str__(self):
        return self.filename

    def __unicode__(self):
        return self.filename


class UserManager(BaseUserManager):
    def create_user(self, email, password=None, **kwargs):
        '''Create and save a new user'''
        if not email:
            raise ValueError('User must be have an email address')
        if not password:
            raise ValueError('User must be have a password!')
        user = self.model(email=self.normalize_email(email), **kwargs)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password):
        '''Create and saves a new super user'''
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class User(AbstractBaseUser, PermissionsMixin):
        email = models.EmailField(max_length=255, unique=True)
        name = models.CharField(max_length=255, null=True, blank=False)
        is_active = models.BooleanField(default=True)
        is_staff = models.BooleanField(default=False)
        profile_iamge = models.CharField(max_length=255, blank=True, null=True)
        # profile_image = models.OneToOneField(
        #     Image,
        #     on_delete=models.CASCADE,
        #     primary_key=True,
        # )

        objects = UserManager()

        USERNAME_FIELD = 'email'
