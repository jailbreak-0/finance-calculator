import { CalculatorOutputs, CalculatorId } from '../types';

interface AIServiceConfig {
  apiKey: string;
  model: string;
  baseURL?: string;
}

interface AIPromptRequest {
  calculatorId: CalculatorId;
  results: CalculatorOutputs;
  promptType: 'summary' | 'whatIf' | 'explainFormula';
  context?: any;
}

interface AIResponse {
  message: string;
  suggestions?: string[];
}

class AIService {
  private config: AIServiceConfig | null = null;

  /**
   * Initialize AI service with API key
   */
  init(config: AIServiceConfig): void {
    this.config = config;
  }

  /**
   * Generate AI response based on calculation results
   */
  async getAIResponse(request: AIPromptRequest): Promise<AIResponse> {
    if (!this.config) {
      throw new Error('AI Service not initialized. Call init() first.');
    }

    const prompt = this.buildPrompt(request);

    try {
      const response = await fetch(
        this.config.baseURL || 'https://api.openai.com/v1/chat/completions',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.config.apiKey}`,
          },
          body: JSON.stringify({
            model: this.config.model,
            messages: [
              {
                role: 'system',
                content:
                  'You are a helpful financial advisor assistant. Provide clear, actionable advice in 2-3 short sentences.',
              },
              {
                role: 'user',
                content: prompt,
              },
            ],
            temperature: 0.7,
            max_tokens: 200,
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`AI API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const message = data.choices[0]?.message?.content || 'Unable to generate response.';

      return {
        message: message.trim(),
        suggestions: this.extractSuggestions(message),
      };
    } catch (error) {
      console.error('Error calling AI service:', error);
      throw error;
    }
  }

  /**
   * Build prompt based on calculator type and request
   */
  private buildPrompt(request: AIPromptRequest): string {
    const { calculatorId, results, promptType, context } = request;

    switch (promptType) {
      case 'summary':
        return this.buildSummaryPrompt(calculatorId, results);
      case 'whatIf':
        return this.buildWhatIfPrompt(calculatorId, results, context);
      case 'explainFormula':
        return this.buildExplainFormulaPrompt(calculatorId);
      default:
        return 'Please provide financial advice based on the given results.';
    }
  }

  /**
   * Build summary prompt
   */
  private buildSummaryPrompt(calculatorId: CalculatorId, results: CalculatorOutputs): string {
    switch (calculatorId) {
      case 'compoundInterest':
        const ciResults = results as any;
        return `I calculated compound interest with these results: Final Amount: ${ciResults.finalAmount}, Total Contributions: ${ciResults.totalContributions}, Total Interest: ${ciResults.totalInterest}. Summarize this in 2-3 sentences and provide 2 actionable tips to improve my investment strategy.`;

      case 'loans':
        const loanResults = results as any;
        return `I calculated a loan with Monthly EMI: ${loanResults.monthlyEMI}, Total Interest: ${loanResults.totalInterest}, Total Repayment: ${loanResults.totalRepayment}. Summarize this and give me 2 tips to reduce my loan cost.`;

      case 'retirementPlanner':
        const retResults = results as any;
        return `My retirement projection shows Nominal Corpus: ${retResults.projectedCorpusNominal}, Real (Inflation-Adjusted) Corpus: ${retResults.projectedCorpusReal}. Summarize this and give me 2 tips to improve my retirement savings.`;

      default:
        return `Summarize the following financial calculation results and provide 2 actionable tips: ${JSON.stringify(results)}`;
    }
  }

  /**
   * Build what-if scenario prompt
   */
  private buildWhatIfPrompt(
    calculatorId: CalculatorId,
    results: CalculatorOutputs,
    context: any
  ): string {
    const increasePercent = context?.increasePercent || 10;
    return `Given my current results: ${JSON.stringify(results)}, simulate what would happen if I increase my contributions by ${increasePercent}%. Show the new final amount and percentage improvement.`;
  }

  /**
   * Build explain formula prompt
   */
  private buildExplainFormulaPrompt(calculatorId: CalculatorId): string {
    const formulas: Record<CalculatorId, string> = {
      compoundInterest:
        'Explain the compound interest formula A = P * (1 + r/n)^(n*t) in simple terms for someone without a finance background.',
      fixedDeposit:
        'Explain the fixed deposit formula M = P * (1 + r/m)^(m*t) in simple terms.',
      treasuryBills:
        'Explain how Treasury Bills work and the discount pricing formula in simple terms.',
      loans: 'Explain the EMI formula EMI = (P * r * (1 + r)^n) / ((1 + r)^n - 1) in simple terms.',
      retirementPlanner:
        'Explain the retirement planning formula and why inflation matters, in simple terms.',
    };

    return formulas[calculatorId] || 'Explain this financial concept in simple terms.';
  }

  /**
   * Extract suggestions from AI response
   */
  private extractSuggestions(message: string): string[] {
    // Simple extraction - look for numbered points or bullet points
    const suggestions: string[] = [];
    const lines = message.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      // Match patterns like "1.", "2.", "-", "•"
      if (/^[\d\-•]/.test(trimmed)) {
        suggestions.push(trimmed.replace(/^[\d\-•.]\s*/, ''));
      }
    }

    return suggestions.slice(0, 3); // Max 3 suggestions
  }

  /**
   * Check if AI service is available
   */
  isAvailable(): boolean {
    return this.config !== null && !!this.config.apiKey;
  }
}

// Export singleton instance
export const aiService = new AIService();
