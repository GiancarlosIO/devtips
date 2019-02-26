import graphene

import users.schema
import tips.schema


class Query(
        tips.schema.Query,
        graphene.ObjectType,
    ):
    pass


class Mutation(
        users.schema.Mutation,
        tips.schema.Mutation,
        graphene.ObjectType,
    ):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)
