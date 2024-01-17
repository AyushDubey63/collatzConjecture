const HeadingContent = () => {
  return (
    <div className="flex flex-col gap-5 items-center">
      <h1 className="text-7xl backdrop-blur-md text-center bg-gray-600 shadow-md p-4 inline rounded-3xl text-white">
        Collatz Conjecture Visualization
      </h1>
      <span className="text-white text-2xl text-left inline">
        Collatz Conjecture: The Collatz Conjecture is a sequence starting from
        any positive integer. If the number is even, it's divided by 2; if odd,
        it's multiplied by 3 and 1 is added. The sequence continues, aiming to
        reach 1. Example (Starting with 6):
      </span>

      <ol className="list-decimal p-2 list-inside text-left flex flex-col items-start justify-center">
        <li className="text-3xl text-white font-medium">
          {" "}
          6 (even) → <strong className="text-pink-500"> 6/2 </strong> ={" "}
          <strong className="text-pink-500">3</strong>{" "}
        </li>
        <li className="text-3xl text-white font-medium">
          {" "}
          3 (odd) → <strong className="text-blue-600"> 3 * 3 + 1 </strong> =
          <strong className="text-blue-600"> 10</strong>{" "}
        </li>
        <li className="text-3xl text-white font-medium">
          {" "}
          10 (even) →<strong className="text-red-500"> 10/2 </strong>={" "}
          <strong className="text-red-500"> 5 </strong>
        </li>
        <li className="text-3xl text-white font-medium">
          {" "}
          5 (odd) →<strong className="text-yellow-500"> 5 * 3 + 1</strong> =
          <strong className="text-yellow-500"> 16 </strong>
        </li>
        <li className="text-3xl text-white font-medium">
          {" "}
          16 (even) →<strong className="text-green-500"> 16/2 </strong>=
          <strong className="text-green-500"> 8 </strong>
        </li>
        <li className="text-3xl text-white font-medium">
          {" "}
          8 (even) →<strong className="text-orange-500"> 8/2</strong> =
          <strong className="text-orange-500"> 4 </strong>
        </li>
        <li className="text-3xl text-white font-medium">
          {" "}
          4 (even) →<strong className="text-purple-600"> 4/2 </strong>={" "}
          <strong className="text-purple-600">2 </strong>
        </li>
        <li className="text-3xl text-white font-medium">
          {" "}
          2 (even) →<strong className="text-cyan-400"> 2/2 </strong>={" "}
          <strong className="text-cyan-400">1</strong>
        </li>
      </ol>
      <span className="text-white text-left text-2xl inline">
        Here is the small example of the collaz conjeture showing the number
        <strong className="text-blue-500"> 10</strong> you an also genarte your
        own series by giving input in the given field
      </span>
    </div>
  );
};
export default HeadingContent;
