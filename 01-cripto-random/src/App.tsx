import { useRandom } from "./useRandom";

export const App = () => {
  const { randomQuery } = useRandom();
  return (
    <>
      <h1>Hello Tankstack!</h1>
      {randomQuery.isFetching ? <p>Loading...</p> : <p>{randomQuery.data}</p>}

      {/* <FetchingNumber /> */}
      {randomQuery.error && <p>{JSON.stringify(randomQuery.error)}</p>}
      <button
        onClick={() => randomQuery.refetch()}
        disabled={randomQuery.isLoading}
      >
        Refresh
      </button>
    </>
  );
};
