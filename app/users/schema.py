from django.contrib.auth import get_user_model

import graphene
from graphene_django import DjangoObjectType


class UserInput(graphene.InputObjectType):
    email = graphene.String(required=True)
    password = graphene.String(required=True)
    name = graphene.String(required=False)


class UserType(DjangoObjectType):
    class Meta:
        model = get_user_model()


class CreateUser(graphene.Mutation):
    user = graphene.Field(lambda: UserType)

    class Arguments:
        user_data = UserInput(required=True)

    @staticmethod
    def mutate(root, info, user_data=None):
        user = get_user_model().objects.create_user(**user_data)
        return CreateUser(user=user)


class Mutation(graphene.ObjectType):
    create_user = CreateUser.Field()
