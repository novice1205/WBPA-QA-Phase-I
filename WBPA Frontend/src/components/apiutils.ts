const YOUR_API_KEY = "";

export const fetchHealthPredictions = async (waterQualityData) => {
    const prompt = `Based on the following water quality parameters, predict potential health risks in 3-4 concise bullet points:\n\n${JSON.stringify(waterQualityData, null, 2)}`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
      {
        headers: { 
          Authorization: `Bearer ${YOUR_API_KEY}`,
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const result = await response.json();

    if (result && result[0] && result[0].generated_text) {
        let predictions = result[0].generated_text;

        // 🔴 **Remove JSON-like Data & Water Quality Labels**
        predictions = predictions.replace(/\{[\s\S]*?\}/g, "");  // Remove JSON blocks
        predictions = predictions.replace(/"name":\s*".*?",/g, "");  // Remove "name" fields
        predictions = predictions.replace(/"value":\s*[\d.]+/g, ""); // Remove "value" fields
        predictions = predictions.replace(/"pH":|"TDS":|"dissolvedO2":/g, "");  // Remove parameter names
        predictions = predictions.replace(/[\[\]{}]/g, "");  // Remove brackets

        // 🔵 **Extract Only Predictions**
        const predictionList = predictions
          .replace(/Based on the following water quality parameters.*?\n/, '') // Remove prompt
          .replace(/Possible health risks:.*?\n/, '') // Remove generic message
          .split(/\n|-/) // Split by new lines or dashes (for bullet points)
          .map(sentence => sentence.trim()) // Trim spaces
          .filter(sentence => sentence.length > 5) // Remove short irrelevant sentences
          .slice(0, 3); // Limit to 3 predictions

        return predictionList;
    } else {
        return ["No prediction available."];
    }
};

