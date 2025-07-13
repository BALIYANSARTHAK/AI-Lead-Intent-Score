import { Lead, ScoreResponse } from "@/types";

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Calls the API to score a lead
 */
export async function scoreLead(leadData: Omit<Lead, "id">): Promise<ScoreResponse> {
  try {
    const response = await fetch(`${API_URL}/api/score-lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(leadData),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error scoring lead:', error);
    // If API fails, use simulation as fallback
    return simulateScoreLead(leadData);
  }
}

/**
 * Simulates a lead score calculation for demo purposes
 */
export function simulateScoreLead(leadData: Omit<Lead, "id">): ScoreResponse {
  // Calculate an initial score based on input factors
  let initialScore = 0;
  
  // Credit score factor (0-35 points)
  if (leadData.creditScore >= 750) initialScore += 35;
  else if (leadData.creditScore >= 700) initialScore += 30;
  else if (leadData.creditScore >= 650) initialScore += 25;
  else if (leadData.creditScore >= 600) initialScore += 15;
  else if (leadData.creditScore >= 550) initialScore += 10;
  else initialScore += 5;
  
  // Income factor (0-25 points)
  if (leadData.income >= 1000000) initialScore += 25;
  else if (leadData.income >= 800000) initialScore += 22;
  else if (leadData.income >= 600000) initialScore += 18;
  else if (leadData.income >= 400000) initialScore += 12;
  else if (leadData.income >= 200000) initialScore += 8;
  else initialScore += 4;
  
  // Age group factor (0-20 points)
  switch (leadData.ageGroup) {
    case "26-35":
      initialScore += 20;
      break;
    case "36-50":
      initialScore += 18;
      break;
    case "18-25":
      initialScore += 16;
      break;
    case "51+":
      initialScore += 10;
      break;
    default:
      initialScore += 10;
  }
  
  // Family background factor (0-20 points)
  switch (leadData.familyBackground) {
    case "Married with Kids":
      initialScore += 20;
      break;
    case "Married":
      initialScore += 15;
      break;
    case "Single":
      initialScore += 10;
      break;
    default:
      initialScore += 10;
  }
  
  // Apply some randomness to simulate AI reranking
  let rerankedScore = Math.min(100, Math.max(0, initialScore + (Math.random() * 20 - 10)));
  
  // If comments contain certain keywords, boost the score
  if (leadData.comments) {
    const comments = leadData.comments.toLowerCase();
    const positiveKeywords = [
      'urgent', 'important', 'interested', 'looking', 'need', 'want', 
      'buy', 'purchase', 'invest', 'soon', 'immediately', 'asap', 'tomorrow'
    ];
    
    for (const keyword of positiveKeywords) {
      if (comments.includes(keyword)) {
        rerankedScore = Math.min(100, rerankedScore + 5);
        break;
      }
    }
  }
  
  // Round to nearest integer
  initialScore = Math.round(initialScore);
  rerankedScore = Math.round(rerankedScore);
  
  return {
    initialScore,
    rerankedScore,
    factors: {
      creditScore: leadData.creditScore / 850 * 35,
      income: Math.min(leadData.income / 1000000 * 25, 25),
      ageGroup: initialScore * 0.2,
      familyBackground: initialScore * 0.2,
    }
  };
}