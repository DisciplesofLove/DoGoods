// AI Chat Assistant
async function chatWithNourish(message, context = '') {
    try {
        const systemPrompt = `You are Nourish, ShareFoods' AI assistant. You help users with food sharing, 
        provide cooking tips, and suggest ways to reduce food waste. Consider the following context:
        ${context}`;
        
        const response = await invokeAIAgent(systemPrompt, message);
        return response;
    } catch (error) {
        console.error('AI chat error:', error);
        throw new Error('Unable to process your request. Please try again.');
    }
}

// Recipe Suggestions
async function getRecipeSuggestions(ingredients) {
    try {
        const systemPrompt = `You are a culinary expert. Suggest recipes using these ingredients: ${ingredients.join(', ')}. 
        Focus on reducing food waste and using ingredients efficiently. Format your response as JSON with this structure:
        {
          "recipes": [
            {
              "name": "Recipe Name",
              "ingredients": ["ingredient 1", "ingredient 2", ...],
              "instructions": "Step by step instructions",
              "prepTime": "15 minutes",
              "cookTime": "30 minutes",
              "difficulty": "Easy/Medium/Hard",
              "servings": 4
            },
            ...
          ]
        }`;
        
        const response = await invokeAIAgent(systemPrompt, 'Suggest 3 recipes.');
        return JSON.parse(response);
    } catch (error) {
        console.error('Recipe suggestion error:', error);
        throw new Error('Unable to generate recipe suggestions.');
    }
}

// Food Pairing Recommendations
async function getFoodPairings(food) {
    try {
        const systemPrompt = `You are a food pairing expert. Suggest complementary foods and ingredients that pair well with: ${food}. 
        Format your response as JSON with this structure:
        {
          "food": "${food}",
          "pairings": [
            {
              "name": "Paired Food Name",
              "description": "Brief description of why they pair well"
            },
            ...
          ]
        }`;
        
        const response = await invokeAIAgent(systemPrompt, 'Suggest pairings.');
        return JSON.parse(response);
    } catch (error) {
        console.error('Food pairing error:', error);
        throw new Error('Unable to generate food pairings.');
    }
}

// Storage Tips
async function getStorageTips(food) {
    try {
        const systemPrompt = `You are a food preservation expert. Provide storage tips and best practices for: ${food}.
        Format your response as JSON with this structure:
        {
          "food": "${food}",
          "tips": [
            "Storage tip 1",
            "Storage tip 2",
            ...
          ],
          "shelfLife": {
            "refrigerator": "X days",
            "freezer": "X months",
            "roomTemperature": "X days"
          }
        }`;
        
        const response = await invokeAIAgent(systemPrompt, 'Provide storage tips.');
        return JSON.parse(response);
    } catch (error) {
        console.error('Storage tips error:', error);
        throw new Error('Unable to generate storage tips.');
    }
}

// Trade Value Estimation
async function estimateTradeValue(item, condition, quantity) {
    try {
        const systemPrompt = `You are a food trade expert. Estimate the fair trade value for:
        Item: ${item}
        Condition: ${condition}
        Quantity: ${quantity}
        
        Format your response as JSON with this structure:
        {
          "item": "${item}",
          "estimatedValue": "Description of value",
          "suggestedTrades": [
            "Trade suggestion 1",
            "Trade suggestion 2",
            ...
          ]
        }`;
        
        const response = await invokeAIAgent(systemPrompt, 'Estimate trade value.');
        return JSON.parse(response);
    } catch (error) {
        console.error('Trade value estimation error:', error);
        throw new Error('Unable to estimate trade value.');
    }
}

// Impact Calculator
async function calculateEnvironmentalImpact(foodType, quantity, unit) {
    try {
        const systemPrompt = `You are an environmental impact expert. Calculate the environmental impact of saving:
        Food Type: ${foodType}
        Quantity: ${quantity}
        Unit: ${unit}
        
        Format your response as JSON with this structure:
        {
          "foodType": "${foodType}",
          "quantity": ${quantity},
          "unit": "${unit}",
          "waterSaved": "X liters",
          "co2Prevented": "X kg",
          "landSaved": "X sq meters",
          "equivalents": {
            "carMiles": "X miles of driving",
            "showerMinutes": "X minutes of showering"
          }
        }`;
        
        const response = await invokeAIAgent(systemPrompt, 'Calculate impact.');
        return JSON.parse(response);
    } catch (error) {
        console.error('Impact calculation error:', error);
        throw new Error('Unable to calculate environmental impact.');
    }
}

// Find Nearest Food Share Locations
async function findNearestFoodShares(location, radius = 5) {
    try {
        const systemPrompt = `You are a location specialist for ShareFoods. Find the nearest food sharing opportunities near:
        Location: ${location}
        Radius: ${radius} miles
        
        Format your response as JSON with this structure:
        {
          "location": "${location}",
          "radius": ${radius},
          "results": [
            {
              "name": "Location name",
              "address": "Full address",
              "distance": "X miles",
              "availableItems": ["item 1", "item 2", ...],
              "hours": "Opening hours information"
            },
            ...
          ]
        }`;
        
        const response = await invokeAIAgent(systemPrompt, 'Find food shares.');
        return JSON.parse(response);
    } catch (error) {
        console.error('Find food shares error:', error);
        throw new Error('Unable to find nearby food sharing locations.');
    }
}

// Mock implementation of invokeAIAgent for demo purposes
async function invokeAIAgent(systemPrompt, userPrompt) {
    // In a real app, this would call an actual AI service
    // For demo purposes, we'll just return mock responses
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    
    if (userPrompt.toLowerCase().includes('recipe') || systemPrompt.toLowerCase().includes('suggest recipes')) {
        return JSON.stringify({
            recipes: [
                {
                    name: "Vegetable Stir Fry",
                    ingredients: ["2 carrots, sliced", "1 bell pepper, diced", "1 cup broccoli florets", "2 tbsp soy sauce", "1 tsp fresh ginger, minced", "2 cloves garlic, minced", "1 tbsp vegetable oil"],
                    instructions: "1. Heat oil in a wok or large pan over medium-high heat.\n2. Add garlic and ginger, stir for 30 seconds.\n3. Add vegetables and stir-fry for 5-6 minutes until tender-crisp.\n4. Add soy sauce and toss to coat.\n5. Serve hot over rice or noodles.",
                    prepTime: "10 minutes",
                    cookTime: "8 minutes",
                    difficulty: "Easy",
                    servings: 2
                },
                {
                    name: "Roasted Vegetable Medley",
                    ingredients: ["2 cups assorted vegetables (carrots, zucchini, bell peppers)", "2 tbsp olive oil", "1 tsp dried herbs (rosemary, thyme)", "Salt and pepper to taste", "1 tbsp balsamic vinegar (optional)"],
                    instructions: "1. Preheat oven to 400°F (200°C).\n2. Cut vegetables into similar-sized pieces.\n3. Toss with olive oil, herbs, salt, and pepper.\n4. Spread on a baking sheet in a single layer.\n5. Roast for 25-30 minutes, stirring halfway.\n6. Drizzle with balsamic vinegar before serving if desired.",
                    prepTime: "15 minutes",
                    cookTime: "30 minutes",
                    difficulty: "Easy",
                    servings: 4
                }
            ]
        });
    } else if (userPrompt.toLowerCase().includes('storage') || systemPrompt.toLowerCase().includes('storage tips')) {
        return JSON.stringify({
            food: "Leafy Greens",
            tips: [
                "Wash and thoroughly dry leaves before storing",
                "Wrap loosely in paper towels to absorb excess moisture",
                "Place in a resealable plastic bag with some air inside",
                "Store in the crisper drawer of your refrigerator",
                "Don't store with ethylene-producing fruits like apples"
            ],
            shelfLife: {
                refrigerator: "5-7 days",
                freezer: "Not recommended",
                roomTemperature: "A few hours only"
            }
        });
    } else if (userPrompt.toLowerCase().includes('find food') || userPrompt.toLowerCase().includes('near me')) {
        return "To find food near you on ShareFoods:\n\n1. Click on the 'Find Food' tab in the main navigation\n2. Enter your location or allow the app to access your location\n3. Browse available food items in your area\n4. Use filters to narrow down by category, distance, or type (donation/trade)\n5. Click on any listing to see more details and contact the donor\n\nIs there a specific type of food you're looking for?";
    } else if (userPrompt.toLowerCase().includes('how does sharefoods work')) {
        return "ShareFoods works in 3 simple steps:\n\n1. **Find Food**: Browse available food items in your area or search for specific items\n\n2. **Connect**: Message the food sharer and arrange a pickup time and location\n\n3. **Share & Save**: Meet up, share food, and help reduce waste in your community\n\nYou can participate as both a donor (sharing excess food) and a recipient (receiving shared food). Would you like to know more about how to list food or find available items?";
    } else {
        return "I'm Nourish, your food sharing assistant. I can help you find food near you, suggest recipes for ingredients you have, provide storage tips for keeping food fresh longer, or answer questions about how ShareFoods works. What would you like to know more about?";
    }
}
