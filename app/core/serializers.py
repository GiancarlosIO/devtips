from rest_framework import serializers

from .models import Image


# if you use Serializer, you need to implement the create/get/put/etc methods
# class ImageSerializer(serializers.Serializer):
# Model serializer works with the meta-class
class ImageSerializer(serializers.ModelSerializer):
    # IF you use serializers.Serializer mixin you need to define each field of the model
    # size = serializers.FloatField()
    # filename = serializers.CharField(max_length=255)
    # image = serializers.FileField()

    class Meta:
        model = Image
        fields = ('id', 'size', 'filename', 'image',)

    # def create(self, validated_data):
    #     """
    #     Create a return a new "Image" instance given the validated data
    #     """
    #     return Image.objects.create(**validated_data)
