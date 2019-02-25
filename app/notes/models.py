from django.db import models
from django.utils.text import slugify


class Note(models.Model):
    title = models.CharField(max_length=255, null=False)
    slug = models.SlugField(unique=True, null=True)
    description = models.TextField(blank=True)

    def save(self, *args, **kwargs):
        self.slug = slugify(self.title)
        super(Note, self).save(*args, **kwargs)
