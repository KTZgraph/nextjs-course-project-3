import { useRef } from "react"; //referencje żeby pobrać dane z inputów

function HomePage() {
  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();
    // można dodać walidacje, czy jest pusty input
    const enteredEmail = emailInputRef.current.value; //wartosc inputu
    const enteredFeedback = feedbackInputRef.current.value; //wartosc feedback

    //POST {email: 'te@te.com;, text: 'Some feedack'}
    const reqBody = {
      email: enteredEmail,
      text: enteredFeedback,
    };
    // nie trzeba pisac wąłsnej domeny
    fetch("/api/feedback", {
      method: "POST", //bardzo ważne, bo na to czeka endpoint
      body: JSON.stringify(reqBody), // pamietać o konwersji z obiektu na jsona
      headers: {
        //explicit mówic że jsona wysyłam
        "Content-Type": "application/json",
      },
    })//.then bo fetch zwraca Promise
      .then((response) => response.json())
      .then((data) => console.log(data)); //można coś zrobić ze zwrotką
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">Your Email Address</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">Your feedback</label>
          <textarea id="feedback" rows="5" ref={feedbackInputRef}></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
    </div>
  );
}

export default HomePage;
