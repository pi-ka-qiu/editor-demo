export default {
  tree: params => `/api/v5/repos/${params.owner}/${params.repo}/git/trees/${params.sha}`,
};
