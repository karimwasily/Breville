export const query = `query (
    $options: PageQueryOptions
  ) {
    posts(options: $options) {
      data {
        id
        title
      }
      meta {
        totalCount
      }
    }
}`;

export const GetPaymentVersion = 'query me($id:String!){ me{payment(id:$id){version } }}';
export default {
  query,
  GetPaymentVersion
};