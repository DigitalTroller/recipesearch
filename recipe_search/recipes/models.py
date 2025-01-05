from django.db import models

class Nutrient(models.Model):
    name = models.CharField(max_length=100)
    value = models.FloatField()

    def __str__(self):
        return self.name


class Ingredient(models.Model):
    name = models.CharField(max_length=100)
    nutrients = models.ManyToManyField(Nutrient, related_name='ingredients')

    def __str__(self):
        return self.name


class Recipe(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    steps = models.TextField()
    ingredients = models.ManyToManyField(Ingredient, related_name='recipes')
    image = models.ImageField(upload_to='recipes/images/', null=True, blank=True)

    def __str__(self):
        return self.name
