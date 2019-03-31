from django.views.generic import TemplateView
from django.conf import settings


class BaseView(TemplateView):
    template_name = 'react-template.html'
    _env_vars = {
        'STATIC_URL': settings.STATIC_URL,
    }

    def get_context_data(self, **kwargs):
        context_data = super(BaseView, self).get_context_data(**kwargs)
        context_data['env'] = self._env_vars

        return context_data
