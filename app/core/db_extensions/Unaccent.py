# you need to create an empty migration
# docker-compose run --rm app sh -c "python manage.py makemigrations core --empty"
# then fill that migration with this

from django.contrib.postgres.operations import UnaccentExtension
from django.db import migrations


class Migration(migrations.Migration):
    operations = [
        UnaccentExtension(),
    ]