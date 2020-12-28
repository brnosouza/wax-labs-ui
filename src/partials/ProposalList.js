import React, {useEffect} from 'react';
import ReactPaginate from 'react-paginate';
import useQueryString from '../utils/useQueryString';

import {useWindowSize} from '../utils/util';
import * as globals from "../utils/vars";
import RenderProposalCard from "./ProposalCard.js";

const reactPaginateObject = {
    mobile: {marginPagesDisplayed:1, pageRangeDisplayed:1},
    tablet_mobile_up : {marginPagesDisplayed:1, pageRangeDisplayed:7},
    tablet_up: {marginPagesDisplayed:1, pageRangeDisplayed: 11},
    tablet_landscape_up: {marginPagesDisplayed:1, pageRangeDisplayed:17},
    desktop: {marginPagesDisplayed:1, pageRangeDisplayed:21},
}
const perPage = 10;

export default function RenderProposalList(props){

    const [page, setPage] = useQueryString(globals.PAGE_QUERY_STRING_KEY, 1);


    const windowSize = useWindowSize();

    useEffect(()=>{
        // Only set to 1 if user changed the filters.
        // This is needed because when the user loads a queryString
        // props.proposalsList changes, but we don't want the page to be
        // set to 1 in that case.
        if(props.filterChanged){
            setPage(1);
        }
        //eslint-disable-next-line
    }, [props.proposalsList, props.filterChanged])


    function calculateNumberOfPages() {
        let totalProperties = props.proposalsList.length;
        if (totalProperties === 0){
            return 1;
        }
        return Math.ceil(totalProperties/perPage);
    }
    function pageChange(data) {
        let selected = data.selected;
        setPage(selected + 1);
    }

    let pagesList = []
    for(let i = 1; i<=calculateNumberOfPages(); i++){
        pagesList.push(i);
    }


    const indexOfLastAsset = page * perPage;
    const indexOfFirstAsset = indexOfLastAsset - perPage;

    let paginatedProperties = props.proposalsList.slice(indexOfFirstAsset, indexOfLastAsset);

    let paginateObject = reactPaginateObject[windowSize.breakpoint];

    return (
        <React.Fragment>
            {
                paginatedProperties.length ?
                paginatedProperties.map((proposal) =>
                    <RenderProposalCard proposal={proposal} key={proposal.proposal_id} categories={props.categories} />)
                :
                <p>{props.noProposalsMessage}</p>
            }

            <ReactPaginate
                previousLabel={'<'}
                nextLabel=">"
                breakLabel="..."
                forcePage={page - 1}
                pageCount={calculateNumberOfPages()}
                marginPagesDisplayed={paginateObject.marginPagesDisplayed}
                pageRangeDisplayed={paginateObject.pageRangeDisplayed}
                onPageChange={pageChange}
                containerClassName='pagination'
                pageLinkClassName="page-link"
                nextLinkClassName="page-link"
                previousLinkClassName="page-link"
                breakLinkClassName="page-link"
                breakClassName="page-item"
                pageClassName="page-item"
                previousClassName="page-item"
                nextClassName="page-item"
                subContainerClassName='pages pagination'
                activeClassName="active"
            />

        </React.Fragment>
    )
}