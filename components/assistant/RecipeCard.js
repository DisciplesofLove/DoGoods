function RecipeCard({ recipe }) {
    try {
        const { name, ingredients, instructions, prepTime, cookTime, difficulty, servings } = recipe;
        
        return (
            <div data-name="recipe-card" className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
                <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{name}</h3>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                        {prepTime && (
                            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                                <i className="far fa-clock mr-1"></i> Prep: {prepTime}
                            </span>
                        )}
                        {cookTime && (
                            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                                <i className="fas fa-fire mr-1"></i> Cook: {cookTime}
                            </span>
                        )}
                        {difficulty && (
                            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                                <i className="fas fa-chart-line mr-1"></i> {difficulty}
                            </span>
                        )}
                        {servings && (
                            <span className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded-full">
                                <i className="fas fa-utensils mr-1"></i> Serves {servings}
                            </span>
                        )}
                    </div>
                    
                    <div className="mb-4">
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Ingredients:</h4>
                        <ul className="list-disc pl-5 space-y-1">
                            {ingredients.map((ingredient, index) => (
                                <li key={index} className="text-sm text-gray-600">{ingredient}</li>
                            ))}
                        </ul>
                    </div>
                    
                    <div>
                        <h4 className="font-medium text-sm text-gray-700 mb-2">Instructions:</h4>
                        <p className="text-sm text-gray-600 whitespace-pre-line">{instructions}</p>
                    </div>
                </div>
            </div>
        );
    } catch (error) {
        console.error('RecipeCard component error:', error);
        reportError(error);
        return null;
    }
}
