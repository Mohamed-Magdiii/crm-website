import * as teamsApi from "../../apis/teams";

const options = [];
for (let i = 0; i < 50; ++i) {
  options.push({
    value: i + 1,
    label: `Option ${i + 1}`,
  });
}

// const sleep = (ms) =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//       resolve();
//     }, ms);
//   });

const optionsPerPage = 3;

const loadMembersOptions = async (search, page) => {

  let output = [];

  let filteredOptions;
  let data;
  if (!search) {
    data = await teamsApi
      .getMembers({
        payload: {
          page: page,
          limit: 5,
        },
      })
      .then((results) => {
        //do any results transformations
        return results;
      });
    data.docs?.map(function (item) {
      // output[item] = obj[item]['value']
      output.push({
        value: item._id,
        label: item.firstName,
      });
    });
    filteredOptions = output;
  } else {
    // const searchLower = search.toLowerCase();
    output = [];
    data = {};
    data = await teamsApi
      .getMembers({
        payload: {
          page: page,
          limit: 3,
          searchText: search,
        },
      })
      .then((results) => { 
        return results;
      });
    data.docs?.map(function (item) { 
      output.push({
        value: item._id,
        label: item.firstName,
      });
    });

    filteredOptions = output;
    // filteredOptions = options.filter(({ label }) =>
    //   label.toLowerCase().includes(searchLower)
    // );
  }

  const hasMore = Math.ceil(filteredOptions.length / optionsPerPage) > page;
  const slicedOptions = filteredOptions.slice(
    (page - 1) * optionsPerPage,
    page * optionsPerPage
  );
 
  return {
    options: filteredOptions,
    hasMore: data.hasNextPage,
  };
};

export default loadMembersOptions;
