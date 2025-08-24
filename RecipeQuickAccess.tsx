import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { ChefHat, Clock, Users, BookOpen } from 'lucide-react';

interface Recipe {
  id: string;
  name: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  instructions: string[];
  ingredients: string[];
}

export function RecipeQuickAccess() {
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const recipes: Recipe[] = [
    {
      id: '1',
      name: 'Pasta Carbonara',
      cookTime: '20 min',
      servings: 4,
      difficulty: 'Medium',
      instructions: [
        'Boil salted water and cook pasta according to package directions',
        'Cook pancetta in a large skillet until crispy',
        'Whisk eggs, cheese, salt and pepper in a bowl',
        'Drain pasta, reserve 1 cup pasta water',
        'Add hot pasta to pancetta, remove from heat',
        'Quickly stir in egg mixture, adding pasta water as needed'
      ],
      ingredients: ['400g spaghetti', '200g pancetta', '4 eggs', '100g parmesan', 'Black pepper']
    },
    {
      id: '2',
      name: 'Chocolate Chip Cookies',
      cookTime: '25 min',
      servings: 24,
      difficulty: 'Easy',
      instructions: [
        'Preheat oven to 375°F',
        'Mix butter, sugars until fluffy',
        'Beat in eggs and vanilla',
        'Mix in flour, baking soda, salt',
        'Stir in chocolate chips',
        'Drop spoonfuls on baking sheet',
        'Bake 9-11 minutes until golden'
      ],
      ingredients: ['2¼ cups flour', '1 cup butter', '¾ cup brown sugar', '2 eggs', '2 cups chocolate chips']
    },
    {
      id: '3',
      name: 'Roasted Chicken',
      cookTime: '1h 20min',
      servings: 6,
      difficulty: 'Medium',
      instructions: [
        'Preheat oven to 425°F',
        'Pat chicken dry and season inside and out',
        'Stuff cavity with lemon and herbs',
        'Truss chicken and place on roasting pan',
        'Roast 60-70 minutes until internal temp 165°F',
        'Rest 10 minutes before carving'
      ],
      ingredients: ['1 whole chicken', 'Salt', 'Pepper', '1 lemon', 'Fresh herbs', 'Olive oil']
    }
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const nextStep = () => {
    if (selectedRecipe && currentStep < selectedRecipe.instructions.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const startRecipe = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setCurrentStep(0);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-6">
        <ChefHat className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Recipe Assistant</h2>
      </div>

      {!selectedRecipe ? (
        // Recipe Selection
        <div className="space-y-4">
          <h3 className="font-medium">Quick Recipes</h3>
          {recipes.map(recipe => (
            <div key={recipe.id} className="border rounded-lg p-4 hover:bg-muted/50 cursor-pointer"
                 onClick={() => startRecipe(recipe)}>
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium">{recipe.name}</h4>
                <Badge className={getDifficultyColor(recipe.difficulty)}>
                  {recipe.difficulty}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {recipe.cookTime}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {recipe.servings} servings
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Recipe Instructions
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{selectedRecipe.name}</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setSelectedRecipe(null)}
            >
              <BookOpen className="w-4 h-4 mr-2" />
              Back to Recipes
            </Button>
          </div>

          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">
                Step {currentStep + 1} of {selectedRecipe.instructions.length}
              </span>
              <Badge variant="secondary">
                {Math.round(((currentStep + 1) / selectedRecipe.instructions.length) * 100)}% Complete
              </Badge>
            </div>

            <div className="mb-4 p-4 bg-muted/50 rounded-lg min-h-[80px] flex items-center">
              <p className="text-center w-full">
                {selectedRecipe.instructions[currentStep]}
              </p>
            </div>

            <div className="flex justify-between">
              <Button 
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
              >
                Previous
              </Button>
              
              <Button 
                onClick={nextStep}
                disabled={currentStep === selectedRecipe.instructions.length - 1}
              >
                {currentStep === selectedRecipe.instructions.length - 1 ? 'Finished!' : 'Next Step'}
              </Button>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h4 className="font-medium mb-3">Ingredients</h4>
            <ScrollArea className="h-32">
              <ul className="space-y-1">
                {selectedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-sm">• {ingredient}</li>
                ))}
              </ul>
            </ScrollArea>
          </div>
        </div>
      )}
    </Card>
  );
}