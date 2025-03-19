// AI Trade Matching Utility
async function findTradeMatches(userItem, targetValue = null) {
    try {
        const systemPrompt = `You are a trading expert. Analyze the given item and suggest potential trades 
        based on similar value and category. Consider both direct matches and potential trade-up opportunities.
        
        Format your response as JSON with this structure:
        {
            "directMatches": [
                {
                    "item": "Item name",
                    "description": "Item description",
                    "estimatedValue": "Estimated value",
                    "matchScore": "Match score (0-100)",
                    "reason": "Why this is a good match"
                }
            ],
            "tradeUpSuggestions": [
                {
                    "item": "Item name",
                    "description": "Item description",
                    "estimatedValue": "Estimated value",
                    "stepValue": "Value increase from current item",
                    "reason": "Why this is a good trade-up option"
                }
            ]
        }`;

        const userPrompt = `Find trade matches for: ${userItem.title}
        Description: ${userItem.description}
        Category: ${userItem.category}
        ${targetValue ? `Target Value: ${targetValue}` : ''}`;

        const response = await invokeAIAgent(systemPrompt, userPrompt);
        return JSON.parse(response);
    } catch (error) {
        console.error('Trade matching error:', error);
        throw new Error('Failed to find trade matches');
    }
}

// Trade-up Path Calculator
async function calculateTradeUpPath(currentItem, targetItem) {
    try {
        const systemPrompt = `You are a trading strategy expert. Calculate the optimal path of trades 
        to reach a target item from a current item. Consider market value, availability, and trade difficulty.
        
        Format your response as JSON with this structure:
        {
            "currentValue": "Current item value",
            "targetValue": "Target item value",
            "estimatedSteps": "Number of trades needed",
            "tradePath": [
                {
                    "step": "Step number",
                    "tradeFor": "Item to trade for",
                    "estimatedValue": "Item value",
                    "valueIncrease": "Value increase",
                    "strategy": "Trading strategy for this step"
                }
            ]
        }`;

        const userPrompt = `Calculate trade-up path from:
        Current Item: ${currentItem.title} (${currentItem.description})
        Target Item: ${targetItem.title} (${targetItem.description})`;

        const response = await invokeAIAgent(systemPrompt, userPrompt);
        return JSON.parse(response);
    } catch (error) {
        console.error('Trade-up path calculation error:', error);
        throw new Error('Failed to calculate trade-up path');
    }
}

// Value Estimation
async function estimateItemValue(item) {
    try {
        const systemPrompt = `You are a value estimation expert. Estimate the fair market value of the given item 
        based on its description and category.
        
        Format your response as JSON with this structure:
        {
            "estimatedValue": "Estimated value in USD",
            "valueRange": {
                "min": "Minimum value",
                "max": "Maximum value"
            },
            "confidence": "Confidence score (0-100)",
            "factors": ["Factor 1", "Factor 2", ...]
        }`;

        const userPrompt = `Estimate value for:
        Item: ${item.title}
        Description: ${item.description}
        Category: ${item.category}
        Condition: ${item.condition || 'Not specified'}`;

        const response = await invokeAIAgent(systemPrompt, userPrompt);
        return JSON.parse(response);
    } catch (error) {
        console.error('Value estimation error:', error);
        throw new Error('Failed to estimate item value');
    }
}

// Trade Fairness Analysis
async function analyzeTradeFairness(offeredItem, requestedItem) {
    try {
        const systemPrompt = `You are a trade fairness analyst. Evaluate the fairness of a proposed trade 
        by comparing the items' values, conditions, and market demand.
        
        Format your response as JSON with this structure:
        {
            "fairnessScore": "Score from 0-100",
            "valueComparison": {
                "offeredValue": "Value of offered item",
                "requestedValue": "Value of requested item",
                "difference": "Value difference"
            },
            "recommendation": "Fair/Unfair/Needs Adjustment",
            "adjustmentSuggestions": ["Suggestion 1", "Suggestion 2", ...],
            "analysis": "Detailed analysis of the trade"
        }`;

        const userPrompt = `Analyze trade fairness between:
        Offered: ${offeredItem.title} (${offeredItem.description})
        Requested: ${requestedItem.title} (${requestedItem.description})`;

        const response = await invokeAIAgent(systemPrompt, userPrompt);
        return JSON.parse(response);
    } catch (error) {
        console.error('Trade fairness analysis error:', error);
        throw new Error('Failed to analyze trade fairness');
    }
}
