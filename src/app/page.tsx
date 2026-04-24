import { GraphQLClient, gql } from "graphql-request";

type Post = {
  title: string;
  slug: string;
  brief: string;
};

export default async function Home() {
  const client = new GraphQLClient("https://gql.hashnode.com");

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

  const posts: Post[] = data.publication.posts.edges.map(
    (edge: any) => edge.node
  );

  return (
    <main style={{ maxWidth: "700px", margin: "auto", padding: "20px" }}>
      <h1>Navaneetha Blog</h1>

      {posts.map((post) => (
        <div key={post.slug}>
          <h2>{post.title}</h2>
          <p>{post.brief}</p>
        </div>
      ))}
    </main>
  );
}
