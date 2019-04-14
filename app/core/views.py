from PIL import Image

from django.views.generic import TemplateView
from django.conf import settings

from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser
from rest_framework.response import Response
from rest_framework.exceptions import ParseError

from .serializers import ImageSerializer


class BaseView(TemplateView):
    template_name = 'react-template.html'
    _env_vars = {
        'STATIC_URL': settings.STATIC_URL,
    }

    def get_context_data(self, **kwargs):
        context_data = super(BaseView, self).get_context_data(**kwargs)
        context_data['env'] = self._env_vars

        return context_data

# def upload_image(request):
#     if request.method == 'GET':
#         images = Image.objects.all()
#         serializer = ImageSerializer(images, many=True)
#         return Response(serializer.data, status=status.HTTP_200_OK)

#     elif request.method == 'POST':
#         print(request.data)
#         serializer = ImageSerializer(data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     return HttpResponse(status=status.HTTP_404_NOT_FOUND)


# class ImageUploadParser(MultiPartParser):
#     media_type = 'image/*'


class UploadImage(APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request, format=None):
        if 'file' not in request.data:
            raise ParseError('Empty content')

        f = request.data['file']

        # verify if the file is a image
        try:
            img = Image.open(f)
            img.verify()
        except IOError:
            raise ParseError('Unsupported image type')

        data = {
            'size': f.size,
            'filename': f.name,
            'image': f,
        }
        serializer = ImageSerializer(data=data)

        if (serializer.is_valid()):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
