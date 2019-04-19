import random
from faker import Faker
from faker.providers import internet, lorem

from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

from tips.models import Tip


class Command(BaseCommand):
    fake = Faker()
    fake.add_provider(internet)
    fake.add_provider(lorem)

    def handle(self, *args, **kwargs):
        User = get_user_model()
        for x in range(0, 10):
            email = self.fake.email()
            password = self.fake.name()
            User.objects.create(
                email=email,
                password=password,
            )

        user_list = User.objects.all()
        ext_word_list = [
            'styled-components',
            'is',
            'library',
            'we',
            'can',
            'go',
            'ahead',
            'you',
            'can',
            'mastering',
            'don\'',
            'give',
            'up',
            'programming',
            'react',
            'javascript',
        ]
        for x in range(0, 30):
            random_user = random.choice(user_list)
            Tip.objects.create(
                user=random_user,
                title=self.fake.paragraph(
                    nb_sentences=1,
                    ext_word_list=ext_word_list
                ),
                description=self.fake.paragraph(
                    nb_sentences=4,
                    ext_word_list=ext_word_list
                ),
            )
        self.stdout.write(
            self.style.SUCCESS('Success to seed the db')
        )
