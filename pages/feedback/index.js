import { Fragment, useState } from "react";

import { buildFeedbackPath, extractFeedback } from "../api/feedback"; // nie będzie umieszczony kod po stronie klienta w bundle

function FeedbackPage(props) {
  const [feedbackData, setFeedbackData] = useState();

  function loadFeedbackHandler(id) {
    // używac tylko jak potrzeba api do pobrani ajakiś dodatkowych danych - jak one już są to bez sensu robić requesty dodatkowe - lepiej przekkazać tylko dane między komponentami
    fetch(`/api/${id}`) //trzeba wtedy aktulizacować url jak inaczej foldery w /api/feedback trzymam pliki
      .then((response) => response.json())
      .then((data) => {
        // jak dostanie obiekt zamiast pojedynczego np. stringa o bład [Error: Objects are not valid as a React child]
        setFeedbackData(data.feedback.email);
      }); //api/some-feedback-id
  }

  return (
    <Fragment>
      {/* warunkowo wyświetlane dane */}
      {feedbackData && <p>{feedbackData}</p>}
      <ul>
        {props.feedbackItems.map((item) => (
          <li key={item.id}>
            {item.text}
            {/* mojaFunckja.bind(cośCojestThis, wartoscDlaPierwszegoArgumentu) */}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

/********************* INTEGRACJA ZE SWOIM WLASNYM API + używać własnych danych do prerenderowania stron ***************************/
export async function getStaticProps() {
  //tak samo dla sgetServerSideProps NIE UZYWAC FETCH
  // nawet jak dane z API aplikacji to wszystko zachowuje się tak samo
  //NIE używać fetch w getStaticProps ani getServerSideProps, żeby gadać ze swoim własnym API
  //   tylko importować funckje
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);
  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
