import graphene
from graphene_django import DjangoObjectType

from .models import Note


class LinkType(DjangoObjectType):
    class Meta:
        model = Note


class Query(graphene.ObjectType):
    notes = graphene.List(LinkType)

    def resolve_notes(self, info, **kwargs):
        return Note.objects.all()
