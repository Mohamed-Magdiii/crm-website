import * as ordersApi from "../../../../apis/orders";

const loadOptions = async (search, page) => {
  

  let output = [];

  let filteredOptions;
  let data;
  if (!search) {
    data = await ordersApi
      .getMarkets({
        payload: {
          page: page,
          limit: 5,
        },
      })
      .then((results) => {
        return results;
      });
    data.docs?.map(function (item) {
      output.push({
        value: item.pairName,
        label: item.pairName,
      });
    });
    filteredOptions = output;
  } else {
    output = [];
    data = {};
    data = await ordersApi
      .getMarkets({
        payload: {
          page: page,
          limit: 3,
          searchText: search,
        },
      })
      .then((results) => {
        //do any results transformations
        return results;
      });
    data.docs?.map(function (item) {
      output.push({
        value: item.pairName,
        label: item.pairName,
      });
    });

    filteredOptions = output;
  }

  return {
    options: filteredOptions,
    hasMore: data.hasNextPage,
  };
};

export default loadOptions;
