import graphene
from graphene_django import DjangoObjectType

from .models import Tip


class TipInput(graphene.InputObjectType):
    title = graphene.String(required=True)
    # slug = graphene.String(required=True)
    description = graphene.String(required=True)


class TipType(DjangoObjectType):
    class Meta:
        model = Tip


class CreateTip(graphene.Mutation):
    tip = graphene.Field(TipType)

    class Arguments:
        tip_data = TipInput(required=True)

    @staticmethod
    def mutate(root, info, tip_data=None):
        tip = Tip.objects.create(**tip_data)
        return CreateTip(tip=tip)


class Query(graphene.ObjectType):
    tips = graphene.List(TipType)

    def resolve_tips(self, info, **kwargs):
        return Tip.objects.all()


class Mutation(graphene.ObjectType):
    create_tip = CreateTip.Field()