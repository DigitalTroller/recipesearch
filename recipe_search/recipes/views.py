from rest_framework import generics
from .models import Recipe
from .serializers import RecipeSerializer
from django.db.models import Q

class RecipeListView(generics.ListAPIView):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer

    def get_queryset(self):
        ingredients = self.request.query_params.getlist('ingredients')
        nutrients = self.request.query_params.getlist('nutrients')
        queryset = Recipe.objects.all()

        if ingredients:
            queryset = queryset.filter(ingredients__name__in=ingredients).distinct()

        if nutrients:
            queryset = queryset.filter(ingredients__nutrients__name__in=nutrients).distinct()

        return queryset
