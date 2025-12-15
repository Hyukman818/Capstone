import { Meal } from '../../data/mealDatabase';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { Clock, Flame, Beef, Wheat, Apple } from 'lucide-react';

interface MealCardProps {
  meal: Meal;
}

export function MealCard({ meal }: MealCardProps) {
  return (
    <div className="bg-white rounded-xl border border-orange-200 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4">
        <h3 className="text-gray-900 font-semibold text-base mb-3">{meal.name}</h3>
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2 text-orange-700">
            <Flame className="w-4 h-4" strokeWidth={2.5} />
            <span className="font-semibold text-sm">{meal.calories} kcal</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Clock className="w-4 h-4" strokeWidth={2} />
            <span className="text-sm">{meal.prepTime}분</span>
          </div>
        </div>
      </div>

      {/* Nutrition Summary */}
      <div className="p-4 bg-orange-50/50">
        <div className="grid grid-cols-3 gap-2 mb-3">
          <div className="flex flex-col items-center gap-2 p-2.5 bg-white rounded-lg">
            <div className="flex items-center gap-1">
              <Beef className="w-4 h-4 text-orange-600" strokeWidth={2} />
              <span className="text-xs text-gray-600 font-medium whitespace-nowrap">단백질</span>
            </div>
            <span className="text-base font-bold text-gray-900 whitespace-nowrap">{meal.protein}g</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-2.5 bg-white rounded-lg">
            <div className="flex items-center gap-1">
              <Wheat className="w-4 h-4 text-orange-600" strokeWidth={2} />
              <span className="text-xs text-gray-600 font-medium whitespace-nowrap">탄수화물</span>
            </div>
            <span className="text-base font-bold text-gray-900 whitespace-nowrap">{meal.carbs}g</span>
          </div>
          <div className="flex flex-col items-center gap-2 p-2.5 bg-white rounded-lg">
            <div className="flex items-center gap-1">
              <Apple className="w-4 h-4 text-orange-600" strokeWidth={2} />
              <span className="text-xs text-gray-600 font-medium whitespace-nowrap">지방</span>
            </div>
            <span className="text-base font-bold text-gray-900 whitespace-nowrap">{meal.fat}g</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center justify-center gap-2 p-2.5 bg-white rounded-lg">
            <span className="text-xs text-gray-600 whitespace-nowrap">식이섬유</span>
            <span className="font-semibold text-sm text-gray-900 whitespace-nowrap">{meal.fiber}g</span>
          </div>
          <div className="flex items-center justify-center gap-2 p-2.5 bg-white rounded-lg">
            <span className="text-xs text-gray-600 whitespace-nowrap">나트륨</span>
            <span className="font-semibold text-sm text-gray-900 whitespace-nowrap">{meal.sodium}mg</span>
          </div>
        </div>
      </div>

      {/* Recipe Details (Accordion) */}
      <Accordion type="single" collapsible className="px-4 pb-4">
        <AccordionItem value="recipe" className="border-none">
          <AccordionTrigger className="text-sm text-orange-700 hover:text-orange-800 py-3">
            레시피 보기
          </AccordionTrigger>
          <AccordionContent>
            {/* Ingredients */}
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">재료</h4>
              <ul className="space-y-1.5">
                {meal.ingredients.map((ingredient, index) => (
                  <li key={index} className="text-xs text-gray-700 flex items-start">
                    <span className="text-orange-500 mr-2">•</span>
                    <span>{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Instructions */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-2">조리 방법</h4>
              <ol className="space-y-2">
                {meal.instructions.map((instruction, index) => (
                  <li key={index} className="text-xs text-gray-700 leading-relaxed">
                    {instruction}
                  </li>
                ))}
              </ol>
            </div>

            {/* Tags */}
            {meal.tags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex flex-wrap gap-2">
                  {meal.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
