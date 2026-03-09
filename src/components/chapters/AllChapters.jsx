import Prologue from "./Prologue/Prologue";
import Chapter1 from "./Chapter1/Chapter1";
import Chapter2 from "./Chapter2/Chapter2";
import Chapter3 from "./Chapter3/Chapter3";
import Chapter4 from "./Chapter4/Chapter4";
import Chapter5 from "./Chapter5/Chapter5";
import Epilogue from "./Epilogue/Epilogue";

const AllChapters = () => {
  return (
    <>
      <Prologue />
      <Chapter1 />
      <Chapter2 />
      <Chapter3 />
      <Chapter4 />
      <Chapter5 />
      <Epilogue />
    </>
  );
};

export default AllChapters;