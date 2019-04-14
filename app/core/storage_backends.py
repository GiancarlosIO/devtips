from storages.backends.s3boto3 import S3Boto3Storage


class MediaStorage(S3Boto3Storage):
    # the folter to upload the files
    location = 'static/img'
    file_overwrite = False
