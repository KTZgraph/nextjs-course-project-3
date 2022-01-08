// next.js priorytezuje endpoity
// tutaj INNE url api/feedback/some-value

import { buildFeedbackPath, extractFeedback } from "./feedback";

function handler(req, res) { //dla wszystkich rodzajów żadań
  // if (req.method === "DELETE") {można coś zrobić w zależności od metody}

  // z urla trzeba wziac feedBackId
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const feedbackData = extractFeedback(filePath);
  const selectedFeedback = feedbackData.find(feedback => feedback.id === feedbackId)
  res.status(200).json({ feedback: selectedFeedback });
}

export default handler;
