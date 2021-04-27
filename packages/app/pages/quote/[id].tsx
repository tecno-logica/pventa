import { useRouter } from "next/router";

const QuoteApp = () => {
  const router = useRouter();
  const { id } = router.query;

  return <div>Quote {id}</div>;
};

export default QuoteApp;
