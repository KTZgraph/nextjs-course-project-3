import { buildFeedbackPath, extractFeedback } from "../api/feedback"; // nie będzie umieszczony kod po stronie klienta w bundle

function FeedbackPage(props) {
  function loadFeedbackHandler(id) {

  }

  return (
    <ul>
      {props.feedbackItems.map((item) => (
        <li key={item.id}>
          {item.text}
          {/* mojaFunckja.bind(cośCojestThis, wartoscDlaPierwszegoArgumentu) */}
          <button onClick={loadFeedbackHandler.bind(null, item.id)}>Show details</button>
        </li>
      ))}
    </ul>
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
