import { gql } from "@apollo/client";

export const getPlaylists = gql`
  query Query {
    getPlaylists {
      id
      title
    }
  }
`;

export const getSongs=gql`query Query($playlistId: Int!, $search: String) {
    getSongs(playlistId: $playlistId, search: $search) {
      _id
      title
      photo
      url
      duration
      artist
    }
  }
  `;