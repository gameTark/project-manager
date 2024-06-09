import { gql } from "@apollo/client";

export const BOOK_CARD_FRAGMENT = gql`
query GetBooks {
  books {
    title
  }
}
`;

export const GET_FILE_FRAGMENT = gql`
query GetFile($path: String!) {
  file(path: $path) {
    name
    path
    ls {
      name
      type
      updatedAt
      size
    }
  }
}
`;