import { any } from "prop-types";
import React, { useState } from "react";
import classNames from "classnames";
import algoliasearch from "algoliasearch/lite";
import { object } from "prop-types";
import { withAem } from "library/utils/withAem";
import { InstantSearch, createInfiniteHitsSessionStorageCache, SortBy, Stats, Configure } from "react-instantsearch-dom";
import { analyticsData } from "xps-utils/analytics";
const analytics = analyticsData();
import InfiniteHits from './InfiniteHits';

// Include only the reset
import "instantsearch.css/themes/reset.css";

import { ALGOLIA_FACETS, ALGOLIA_SORT } from "./constants";
import { ToggleRefinementList } from "./ToggleRefinementList";
import { ClearRefinements } from "./ClearRefinements";
import { CustomSearchBox } from "./CustomSearchBox";

const handleClick = (v) => {
  if (typeof v === "string") {
    return v
      .toString()
      .toLowerCase()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-") // Replace multiple - with single -
      .replace(/^-+/, "") // Trim - from start of text
      .replace(/-+$/, ""); // Trim - from end of text
  }
  return "";
};
const sessionStorageCache = createInfiniteHitsSessionStorageCache();

const Plp = ({ aemData }) => {
  const searchClient = algoliasearch(aemData.algoliaAppId, aemData.algoliaSearchApiKey);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const searchtermRaw = urlParams.get("searchterm");
  const [searchterm, setSearchterm] = useState(searchtermRaw);

  function handleReset() {
    setSearchterm("");
  }

  const [toggleKey, setToggleKey] = useState([]);
  const [allToggleClass, setAllToggleClass] = useState(false);
  const accordioToggleHandler = (event, i) => {
    if (!toggleKey.includes(i)) {
      setToggleKey([...toggleKey, i]);
    } else {
      setToggleKey(toggleKey.filter((item) => item !== i));
    }
  };

  const toggleAllHandler = () => {
    setAllToggleClass((prevState) => !prevState);
  };

  function analyticsData(searchterm, nbHits) {
    analytics.updateSearchAnalyticsData(searchterm, nbHits);
  }

  return (
    <div className="cmp-container-plp">
      <InstantSearch 
        indexName={aemData.algoliaIndexName} 
        searchClient={searchClient}
      >
        {aemData.algoliaTerm ? (<Configure filters={aemData.algoliaTerm} hitsPerPage={16}/>) : (< Configure hitsPerPage={16} />) }
        
        <div className="cmp-container-plp__head-row">
          <div className="cmp-text-plp__filter-title">Filter</div>
          <div className="cmp-ontainer-plp__sortby-head">
            <div className="cmp-container-plp__right-filter">
              <span className="cmp-text-plp__filter--label">Filter</span>
              <div className="cmp-container-plp__right-filter--value" onClick={toggleAllHandler}>
                <span>All</span>
              </div>
            </div>

            <div className="cmp-container-plp__ight-sort-by">
              <div className="cmp-container-plp__ight-sort-by-box">
                <span className="cmp-text-plp__ight-sort-by-title">Sort by</span>
                <SortBy defaultRefinement={aemData.algoliaIndexName} items={ALGOLIA_SORT} />
              </div>
            </div>
            <Stats
              translations={{
                stats(nbHits, processingTimeMS, nbSortedHits, areHitsSorted) {
                  analyticsData(searchterm, nbHits);
                  if (nbHits > 1) {
                    return searchterm === null || searchterm === "" ? `${nbHits.toLocaleString()} Coffees  ` : `${nbHits.toLocaleString()} Coffees for '${searchterm}' `;
                  } else if (nbHits === 0) {
                    return searchterm === null || searchterm === "" ? `${nbHits.toLocaleString()} Coffees  ` : `No matching Beanz for '${searchterm}' `;
                  } else {
                    return searchterm === null || searchterm === "" ? ` ${nbHits.toLocaleString()}  Coffee  ` : `${nbHits.toLocaleString()} Coffee for '${searchterm}' `;
                  }
                },
              }}
            />
          </div>
        </div>
        <div className="cmp-container-plp__inner">
          <div className={`cmp-container__plp-left ${allToggleClass ? "active" : ""}`}>
            <div className="cmp-container__plp-left-mobile-header">
              <h3 className="cmp-text__plp-left-mobile-title-h3">Filter</h3>
              <button type="button" className="cmp-button__plp-left-close-btn" onClick={toggleAllHandler}></button>
            </div>
            <div className="cmp-container__plp-left-nav-box">
              {/* To Do - Functionality needs to work on for both Apply and Reset buttons */}
              <button type="button" className="cmp-button__plp-left--apply-btn" onClick={toggleAllHandler}>
                Apply
              </button>
              <ClearRefinements onReset={handleReset} />
              {/* <button type='button' className='cmp-button__plp-left--reset-btn'>Reset</button> */}
              <div className="plp-search">
                <CustomSearchBox defaultRefinement={searchterm} placeholder="Search here..." onChange={(value) => setSearchterm(value)} onReset={() => setSearchterm("")} searchterm={searchterm} />
              </div>

              {ALGOLIA_FACETS.map((facet, i) => (
                <div className={classNames("cmp-container__plp-left--filter-card", { "plp-card-close": toggleKey.includes(i) })} key={facet}>
                  <h4
                    className="cmp-text__plp-left--filter-card-title"
                    onClick={(event) => {
                      accordioToggleHandler(event, i);
                    }}
                  >
                    {facet.split("_").join(" ")}
                  </h4>
                  {/* <RefinementList attribute={facet} /> */}

                  <ToggleRefinementList attribute={facet} limit={35} />
                </div>
              ))}
              {/* <CurrentRefinements /> */}
            </div>
          </div>

          <div className="cmp-container__plp-right">
            <InfiniteHits cache={sessionStorageCache} minHitsPerPage={16} aemData={aemData} handleClick={handleClick} />
          </div>
        </div>
      </InstantSearch>
    </div>
  );
};

Plp.propTypes = {
  aemData: object,
};

export default withAem(Plp);
