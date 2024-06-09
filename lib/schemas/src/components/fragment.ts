import { gql } from "@apollo/client";

export const BOOK_CARD_FRAGMENT = gql`
query GetBooks {
  books {
    title
  }
}
`;