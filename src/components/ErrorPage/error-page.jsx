import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="text-center mt-5">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <img src="https://cdnl.iconscout.com/lottie/premium/thumb/page-not-response-5631129-4699348.gif" alt="" className="rounded img-fluid" />
    </div>
  );
}