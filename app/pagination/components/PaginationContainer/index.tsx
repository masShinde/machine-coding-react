import type { PaginationContainerPropTypes } from "./PaginationContainerPropTypes";
import "./styles.css";

export function PaginationContainer(props: PaginationContainerPropTypes) {
  const { selectedPage, onPageChangeHandler, totalPages } = props;


  // 12 13 14 15 16 17
  // currentIndex -> length - 6 -> show prev pages
  // currentIndex >= 3 else show prev 2 next 3

  const createArr = () => {
    if(selectedPage < 3)
        return Array.from(({length: 6}), (_, i) =>  i)
    else if(selectedPage >= totalPages - 3)
        return Array.from(({length: 6}), (_, i) => totalPages - 6 + i)
    return Array.from(({length: 6}), (_, i) => selectedPage - 2 + i)
  }

  return (
    <div className="pagination-container">
      {createArr()?.map((val, index) => (
          <button
            key={index}
            onClick={() => onPageChangeHandler(val)}
            className={"page-button "+(val === selectedPage && "selected-page")}
          >
            {val + 1}
          </button>
        ))}
    </div>
  );
}
