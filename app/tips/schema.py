import graphene
# import django_filters
from graphql import GraphQLError

from graphene_django.filter import DjangoFilterConnectionField
# from django.db.models import Q
from graphene_django.types import DjangoObjectType

from .models import Tip


# class TipType(DjangoObjectType):
#     class Meta:
#         model = Tip


# class TipInput(graphene.InputObjectType):
# title = graphene.String(required=True)
# # slug = graphene.String(required=True)
# description = graphene.String(required=True)

# it is a custom filter, we don't need this today
# class TipFilter(django_filters.FilterSet):
#     class Meta:
#         model = Tip
#         fields = ['title', 'description']
class CustomNode(graphene.relay.Node):
    '''
    This class removes base64 unique ids and operates with plain ID's
    '''

    class Meta:
        name = 'Node'

    @staticmethod
    def to_global_id(type, id):
        # return '{}:{}'.format(type, id)
        return id

    @classmethod
    def get_node_from_global_id(cls, info, global_id, only_type=None):
        # is it recursion?
        node = super().get_node_from_global_id(info, global_id, only_type)
        if node:
            return node

        get_node = getattr(only_type, 'get_node', None)
        if get_node:
            return get_node(global_id, info)

        # try:
        #     id = int(global_id)
        # except ValueError:
        #     raise GraphQLError('Invalid object id. It should be a valid integer!')

        # model = getattr(Query, info.field_name).field_type._meta.model
        # try:
        #     node_data = model.objects.get(id=id)
        # except model.DoesNotExist:
        #     return None

        # return node_data


class NodeWithOriginalId(object):
    original_id = graphene.Int()

    def resolve_original_id(self, info):
        return self.id


class GetNodeById(object):
    @classmethod
    def get_node(cls, id, info):
        try:
            id = int(id)
        except ValueError:
            raise GraphQLError('Invalid object id. It should be a valid integer!')

        try:
            node_data = cls._meta.model.objects.get(id=id)
            return node_data
        except cls._meta.model.DoesNotExist:
            return None


class TipNode(NodeWithOriginalId, GetNodeById, DjangoObjectType):
    class Meta:
        model = Tip
        # filter_fields = ['title', 'description']
        # Allow for some more advanced filtering here
        # filter_fields = {
        #     'name': ['exact', 'icontains', 'istartswith'],
        #     'notes': ['exact', 'icontains'],
        #     'category': ['exact'],
        #     'category__name': ['exact'],
        # }
        filter_fields = {
            'title': ['exact', 'icontains', 'istartswith'],
            'description': ['exact', 'icontains', 'istartswith'],
        }
        interfaces = (graphene.relay.Node, )

    # @classmethod
    # def get_node(cls, id, info):
    #     try:
    #         id = int(id)
    #     except ValueError:
    #         raise GraphQLError('Invalid object id. It should be a valid integer!')

    #     try:
    #         tip = cls._meta.model.objects.get(id=id)
    #         return tip
    #     except cls._meta.model.DoesNotExist:
    #         return None


class CreateTip(graphene.relay.ClientIDMutation):
    tip = graphene.Field(TipNode)

    class Input:
        title = graphene.String()
        description = graphene.String()

    def mutate_and_get_payload(root, info, **input):
        user = info.context.user

        if not user or user.is_anonymous:
            raise GraphQLError('You need to be authenticated')

        tip = Tip(
            title=input.get('title'),
            description=input.get('description'),
            user=user,
        )
        tip.save()

        return CreateTip(tip=tip)


class Query(graphene.ObjectType):
    # tip = graphene.relay.Node.Field(TipNode)
    tip = CustomNode.Field(TipNode)
    tips = DjangoFilterConnectionField(TipNode)
    # tips = graphene.List(
    #     TipType,
    #     search=graphene.String(),
    #     first=graphene.Int(),
    #     skip=graphene.Int(),
    # )

    # def resolve_tips(self, info, search=None, skip=None, first=None, **kwargs):
    #     qs = Tip.objects.all()
    #     if search:
    #         filter = (
    #             Q(title__icontains=search) |
    #             Q(description__icontains=search)
    #         )
    #         qs = qs.filter(filter)

    #     if skip:
    #         qs = qs[skip:]

    #     if first:
    #         qs = qs[:first]

    #     return qs


class Mutation(graphene.ObjectType):
    create_tip = CreateTip.Field()
