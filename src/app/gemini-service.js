// src/geminiService.js
import { GoogleGenAI } from "@google/genai";
const API_KEY = "AIzaSyBZrAkN3svcqxeVpDj2rQylb-0UWZlOTXk";

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const getInsuranceRecommendation = async (clientDetails) => {
  const contents = `
You are an insurance advisor. Based on the following client information, suggest an appropriate insurance policy:
${clientDetails.age} - Age
${clientDetails.income} - monthly income  
${clientDetails.healthConditions} - Health Conditions
${clientDetails.familySize} - Family Size

I want that the result will be an object with the following main keys:
- planName
- coverageAmount
- premium
- deductible
- exclusions
- recommendations
- policyType
- policyDuration
- claimProcess
- customerSupport
- policyLimit
- waitingPeriod
- renewalTerms
- cancellationPolicy
- gracePeriod
- riders
- discounts
- eligibilityCriteria

use AU dollars as the currency

make object props savable to db format

`;
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents,
  });

  return response.text;
};
