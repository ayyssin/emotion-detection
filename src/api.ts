import axios from "axios";

const API_KEY = "AIzaSyAwL3rckKkr9bGp6NLbQD8iKXs2MjBvwcY";
const API_URL =
  "https://commentanalyzer.googleapis.com/v1alpha1/comments:analyze?key=" +
  API_KEY;

export const checkText = (text: string) => {
  const body = {
    comment: {
      text: text,
    },
    languages: ["ru"],
    requestedAttributes: {
      TOXICITY: {},
      INSULT: {},
      FLIRTATION: {},
      THREAT: {},
    },
  };
  return axios.post(API_URL);
};
