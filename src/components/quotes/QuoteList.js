import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

// const FirstData = [
//     { id:1, author:"ismail", text:"Nice Learning" },
//     { id:2, author:"Saghraoui", text:"React is so good" }
// ]

const QuoteList = (props) => {


  const sortingFunction = (quotes, sort) => {

    console.log("sort = ", sort)

    // let idQuotes = quotes.map(item => {
    //    return item.id
    // })
    if (sort === 'ascanding'){
      // points.sort(function(a, b){return b-a});
      return quotes.sort((a, b) => {
        return a.id > b.id ? 1 : -1;
      });
    }
    if(sort === 'descending'){
      return quotes.sort((a, b) => {
        return a.id < b.id ? 1 : -1;
      });
    }

  }

  // const newTableSorting = sortingFunction(props.quotes, (isSorting ? 'descending':'ascanding'))

  const history = useHistory();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  let isSorting = queryParams.get('sorting') === 'ascanding';

  // console.log("props.quotes = ", props.quotes)
  
  const newTableSorting = sortingFunction(props.quotes, (isSorting ? 'descending':'ascanding'));
  console.log("newTableSorting = ", newTableSorting);


  const sortingQuoteHandler = () => {
  
    history.push('/quotes?sorting=' + (isSorting ? 'descending':'ascanding'));
  }
  
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortingQuoteHandler}>Sorting {isSorting ? 'descending':'ascanding'} quotes</button>
      </div>
      <ul className={classes.list}>
      
        {newTableSorting.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
