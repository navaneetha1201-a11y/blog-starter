import { GraphQLClient, gql } from "graphql-request";

const client = new GraphQLClient("https://gql.hashnode.com");

export async function getPosts() {
  const query = gql`
    query {
      publication(host: "navaneetha.in") {
        posts(first: 10) {
          edges {
            node {
              title
              slug
              brief
            }
          }
        }
      }
    }
  `;

  const data = await client.request(query);
  return data.publication.posts.edges;
}
