import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import useHttp from "../hooks/use-http";
import { getSingleQuote } from '../lib/api';
import NoQuotesFound from "../components/quotes/NoQuotesFound";
import LoadingSpinner from "../components/UI/LoadingSpinner";


// const FirstData = [
//     { id:1, author:"ismail", text:"Nice Learning" },
//     { id:2, author:"Saghraoui", text:"React is so good" }
// ]

const QuotesId = () => {

    const params = useParams();

    const { quoteId } = params;

    console.log("quoteId = ", quoteId)
    
    const { sendRequest, status, data:singleQuote, error } = useHttp(getSingleQuote, true);

    useEffect(() => {
        sendRequest(quoteId);
    }, [sendRequest, quoteId])


    
    const match = useRouteMatch();

    console.log("singleQuote = ", singleQuote)

    if(error){
        return <p className="centered">This not quotes with this Id</p>
    }
    if (status === 'completed' && (!singleQuote || singleQuote.length === 0)){
        return <NoQuotesFound />
    }

    if(status === 'pending' || !singleQuote){
        <LoadingSpinner />
    }
    if(!singleQuote){
        return <div className="centered">
            <LoadingSpinner />
        </div>
    }
    
    

    return (
        <Fragment>
            <HighlightedQuote text={singleQuote.text} author={singleQuote.author}/>
            <Route path={`${match.url}`} exact>
                <div className="centered">
                    <Link className="btn--flat" to={`${match.url}/comments`}>
                        Show Comment
                    </Link>
                </div>
            </Route>

            <Route path={`${match.url}/comments`}>
                <Comments />
            </Route>
        </Fragment>

    )
}

export default QuotesId
