export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
  if (!ANTHROPIC_API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'API key not configured' }) };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  const { imageBase64, mediaType, quizPrompt } = body;

  const photoPrompt = `You are an expert colour analyst specializing in seasonal colour analysis. Analyze this person's natural coloring (skin tone, undertones, eye color, hair color) and determine their colour season.

Respond ONLY with a valid JSON object in this exact format (no markdown, no explanation outside JSON):
{
  "season": "Spring" | "Summer" | "Autumn" | "Winter",
  "subtype": "Light Spring" | "True Spring" | "Warm Spring" | "Light Summer" | "True Summer" | "Soft Summer" | "Soft Autumn" | "True Autumn" | "Deep Autumn" | "Deep Winter" | "True Winter" | "Bright Winter",
  "undertone": "Warm" | "Cool" | "Neutral",
  "characteristics": "2-3 sentences describing their natural coloring",
  "palette": ["#hexcolor1", "#hexcolor2", "#hexcolor3", "#hexcolor4", "#hexcolor5", "#hexcolor6", "#hexcolor7", "#hexcolor8"],
  "colourNames": ["Colour 1", "Colour 2", "Colour 3", "Colour 4", "Colour 5", "Colour 6", "Colour 7", "Colour 8"],
  "bestColors": "A sentence describing the best colors to wear",
  "avoidColors": "A sentence describing colors to avoid",
  "makeupTips": "2-3 makeup/styling tips specific to this season",
  "celebrities": ["Celebrity 1", "Celebrity 2", "Celebrity 3"]
}`;

  try {
    let messages;

    if (quizPrompt) {
      messages = [{ role: 'user', content: quizPrompt }];
    } else if (imageBase64) {
      messages = [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: { type: 'base64', media_type: mediaType || 'image/jpeg', data: imageBase64 },
            },
            { type: 'text', text: photoPrompt },
          ],
        },
      ];
    } else {
      messages = [{ role: 'user', content: photoPrompt + '\n\nNote: No image provided, return a sample Spring analysis.' }];
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-opus-4-5',
        max_tokens: 1024,
        messages,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return { statusCode: response.status, body: JSON.stringify({ error: err }) };
    }

    const data = await response.json();
    const text = data.content[0].text.trim();
    const clean = text.replace(/```json|```/g, '').trim();
    const result = JSON.parse(clean);

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(result),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};