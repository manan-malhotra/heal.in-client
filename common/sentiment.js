import axios from "axios";
const sentimentScore = async (text) => {
  const json = {
    content: text,
  };
  const bag1 = [
    "depression",
    "depressed",
    "weight",
    "suicide",
    "suicidal",
    "anxiety",
    "obesity",
    "self-harm",
    "despair",
    "overweight",
    "self-destructive",
    "distress",
    "harm",
    "suffer",
    "suffering",
    "overeating",
  ];
  const bag2 = [
    "reduce",
    "stop",
    "decrease",
    "lose",
    "minimize",
    "halt",
    "diminish",
    "lower",
    "cease",
    "drop",
  ];
  const value = text.toLowerCase();
  for (let i = 0; i < bag1.length; i++) {
    if (value.includes(bag1[i])) {
      for (let j = 0; j < bag2.length; j++) {
        if (value.includes(bag2[j])) {
          return 0;
        }
      }
    }
  }
  try {
    const response = await axios.post(process.env.SENTIMENT_API, json);
    return response.data.sentiment;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export { sentimentScore };
