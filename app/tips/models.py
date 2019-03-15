import uuid

from django.db import models
from django.utils.text import slugify


class Tip(models.Model):
    title = models.CharField(max_length=255, null=False)
    slug = models.SlugField(unique=True, null=True, blank=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title

    def __unicode__(self):
        return self.title

    def save(self, *args, **kwargs):
        unique_id = uuid.uuid4().hex
        slug = slugify(self.title)
        self.slug = f'{slug}-{unique_id}'
        super(Tip, self).save(*args, **kwargs)
