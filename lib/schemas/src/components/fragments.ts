import { gql } from "@apollo/client";

export const BOOK_CARD_FRAGMENT = gql`
mutation DeleteProject($id: ID!) {
  deleteProject(id: $id) {
    title
  }
}
query GetFile($path: String!) {
  file(path: $path) {
    name
    type
    path
    updatedAt
    size
    ls {
      name
      type
      path
      updatedAt
      size
    }
  }
}
query GetIcon {
  icons {
    id
    srcPath
    name
  }
}
query GetProject ($id: ID!) {
  getProject(id: $id) {
    id
    title
    icon {
      id
      srcPath
      name
    }
    contents {
      contentType
      id
      name
      updatedAt
      size
      icon {
        id
        srcPath
        name
      }
    }
    tags {
      id
      name
      color
    }
  }
}

query GetProjects {
  projects {
    id
    title
    sort
    description
    icon {
      id
      name
      srcPath
    }
    tags {
      id
      name
      color
    }
  }
}
mutation InsertIcon($name: String!, $binary: String!) {
  insertIcon(name: $name, binary: $binary) {
    id
    srcPath
    name
  }
}
mutation InsertProject($name: String!, $iconId: ID!, $description: String, $sort: String) {
  insertProject(name: $name, iconId: $iconId, description: $description) {
    id
    title
    description
  }
}
mutation UpdateProject($name: String, $iconId: ID, $description: String, $sort: String, $id: ID!) {
  updateProject(name: $name, iconId: $iconId, description: $description, sort: $sort, id: $id) {
    id
    title
    description
    sort
  }
}
`