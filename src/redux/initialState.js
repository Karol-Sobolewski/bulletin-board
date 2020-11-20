export const initialState = {
  posts: {
    data: [
      {
        id: 1,
        user: `User 1`,
        title: `title 1`,
        description: `description 1`,
      },
      {
        id: 2,
        user: `User 2`,
        title: `title 2`,
        description: `description 2`,
      },
      {
        id: 3,
        user: `User 3`,
        title: `title 3`,
        description: `description 3`,
      },
      {
        id: 4,
        user: `User 4`,
        title: `title 4`,
        description: `description 4`,
      },
    ],
    loading: {
      active: false,
      error: false,
    },
  },
  users: {
    data: [
      {
        id: 10,
        name: `Not Logged`,
        role: `Not Logged`,
        active: false,
      },
      {
        id: 11,
        name: `User 1`,
        role: `Logged`,
        active: true,
      },
      {
        id: 12,
        name: `User 2`,
        role: `Logged`,
        active: true,
      },
      {
        id: 13,
        name: `Admin`,
        role: `Admin`,
        active: true,
      },
    ],
    activeUser: {
      id: 10,
      name: `Not Logged`,
      role: `Not Logged`,
      active: false,
    },
  },
};
