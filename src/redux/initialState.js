export const initialState = {
  posts: {
    data: [
      {
        id: 1,
        author: `User 1`,
        title: `title 1`,
        description: `description 1`,
        status: 'published',
        date: '2020-11-22 at 15:55',
        edited: {
          name: 'Admin',
          date: '2020-11-22 at 16:00',
        },
      },
      {
        id: 2,
        author: `User 2`,
        title: `title 2`,
        description: `description 2`,
        status: 'draft',
      },
      {
        id: 3,
        author: `User 3`,
        title: `title 3`,
        description: `description 3`,
        status: 'published',
      },
      {
        id: 4,
        author: `User 4`,
        title: `title 4`,
        description: `description 4`,
        status: 'closed',
      },
    ],
    loading: {
      active: false,
      error: false,
    },
    activePost: {},
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
