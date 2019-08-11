({url}) => {
    // e.g. https://github.com/transposit-connectors/applicant_tracker/blob/master/README.md
    var url_match = /(https:\/\/)*(github.com\/)*(.+?)\/(.+?)\/blob\/(.+?)\/(.+)/.exec(url);
    if (url_match) {
      return { owner: url_match[3], 
               repo: url_match[4],
               branch: url_match[5],
               path: url_match[6]
             };
    }
    return null;
}

/*
 * For sample code and reference material, visit
 * https://www.transposit.com/docs/references/js-operations
 */