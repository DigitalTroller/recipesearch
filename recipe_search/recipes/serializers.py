from rest_framework import serializers
from .models import Recipe, Ingredient, Nutrient

class NutrientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Nutrient
        fields = '__all__'


class IngredientSerializer(serializers.ModelSerializer):
    nutrients = NutrientSerializer(many=True)

    class Meta:
        model = Ingredient
        fields = '__all__'


class RecipeSerializer(serializers.ModelSerializer):
    ingredients = IngredientSerializer(many=True)

    class Meta:
        model = Recipe
        fields = '__all__'
