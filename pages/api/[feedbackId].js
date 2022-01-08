import { buildFeedbackPath, extractFeedback } from "../feedback";

function handler(req, res) { //dla wszystkich rodzajów żadań
  // if (req.method === "DELETE") {można coś zrobić w zależności od metody}

  // z urla trzeba wziac feedBackId
  const feedBackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const feedBackData = extractFeedback(filePath);
  const selectedFeedBack = feedBackData.find(
    (feedback) => feedback.id === feedBackId
  );
  res.status(200).json({ feedback: selectedFeedBack });
}

export default handler;
