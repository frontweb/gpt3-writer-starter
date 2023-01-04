import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const generateAction = async (req, res) => {
  // Run first prompt
  const prompt = `Ask Dave Ramsey if it's ok or not to purchase the following item: ${req.body.userInput}
And to explain why
Dave's response:\n`;
  console.log(`API: ${prompt}`);

  const baseCompletion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt,
    temperature: 0.7,
    max_tokens: 350,
  });

  const basePromptOutput = baseCompletion.data.choices.pop();

  res.status(200).json({ output: basePromptOutput });
};

export default generateAction;
