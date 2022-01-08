// nie eksportujemy komponentów reacta
//nazwa to z reguły handler because we handle request
function handler(req, res) {
  // downolny kod po stronie serwera, nigdy ten kod nie wyjdzie do klienta tak samo jak getStaticProps i getServerProps
  //odpwoeidź z obiektem res
  res.status(200).json({ message: "This works!" });
}

export default handler;
