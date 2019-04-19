import uuid

from django.db import models
# from django.utils.text import slugify
from django.contrib.auth import get_user_model

from core.models import Image


class Tip(models.Model):
    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
    )
    title = models.CharField(max_length=255, null=False)
    slug = models.CharField(max_length=255, unique=True, null=True, blank=True)
    description = models.TextField(blank=True)
    image = models.OneToOneField(
        Image,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    # image = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.title

    def __unicode__(self):
        return self.title

    def save(self, *args, **kwargs):
        unique_id = uuid.uuid4().hex
        # slug = slugify(self.title)
        self.slug = unique_id
        super(Tip, self).save(*args, **kwargs)
