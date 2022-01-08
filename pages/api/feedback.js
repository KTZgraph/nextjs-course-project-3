import fs from "fs";
import path from "path";
// next.js priorytezuje endpoity
// /api w urlu NIE BIERZE DO URLA NAZWY PLIKU JAK w /pages


// helperty mozna też wydzielić do osobnych plików i/lub folderów np helpers w główym root 
//helper fuinction żeby nie duplikować kodu
export function buildFeedbackPath() { // zeby gettaticProps i getServerProps w/pages miały dostep do funckji
  return path.join(process.cwd(), "data", "feedback.json"); //process.cwd() current workind directory dla nextjs to root
}

export function extractFeedback(filePath) { // zeby gettaticProps i getServerProps w/pages miały dostep do funckji
  const fileData = fs.readFileSync(filePath);
  const data = JSON.parse(fileData); //wiem, że to pusta lista bo jestem właścicielem pliku
  return data;
}

// nie eksportujemy komponentów reacta
//nazwa to z reguły handler because we handle request
function handler(req, res) {
  // downolny kod po stronie serwera, nigdy ten kod nie wyjdzie do klienta tak samo jak getStaticProps i getServerProps
  if (req.method === "POST") {
    const email = req.body.email; // already parsed body nextjs to robi
    const feedbackText = req.body.text;

    const newFeedback = {
      id: new Date().toISOString(), //taki na szybko id
      email: email,
      text: feedbackText,
    };

    //stroe it in database or file - tutaj zapis do /data/feedback.json
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    // czytam synchronicznie plik - blokuję a potem aktualizuję dane

    data.push(newFeedback);
    //zapisuję synchronicznie - blokuję zmienione dane do pliku tylko do jsona z obiektu zamieniamiam
    fs.writeFileSync(filePath, JSON.stringify(data));
    // status odpowiedzi
    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    //bo inaczej wysle dwie odpowiedzi a to powadzi do problemów
    //odpwoeidź z obiektem res
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    res.status(200).json({ feedback: data });
  }
}

export default handler;
