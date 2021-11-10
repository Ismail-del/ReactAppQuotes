import { Fragment, useEffect } from "react";
import QuoteList from '../components/quotes/QuoteList';
// import useHttp from "../hooks/use-http";
import { getAllQuotes } from "../lib/api";
import useHttp from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import NoQuotesFound from '../components/quotes/NoQuotesFound';

// const FirstData = [
//     { id:1, author:"ismail", text:"Nice Learning" },
//     { id:2, author:"Saghraoui", text:"React is so good" }
// ]


const Quotes = () => {

    const { sendRequest, status, data:loadedQuotes, error } = useHttp(getAllQuotes, true);

    // const { sendRequest, status } = useHttp();
    
    useEffect(() => {
        sendRequest();
        // console.log("sendRequest = ", sendRequest());
       
    }, [sendRequest])

    if(error){
        return <p className="centered">This an Error</p>
    }

    if(status === 'completed' && (!loadedQuotes || loadedQuotes.length === 0)){
        return <NoQuotesFound />
    }

    if(status === 'pending'){
        return (<div>
            <LoadingSpinner />
        </div>)
    }

    return (
        <Fragment>
            <QuoteList quotes={loadedQuotes}/>
        </Fragment>
    )
}

export default Quotes
