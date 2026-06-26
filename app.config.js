import 'dotenv/config';

export default {
  expo: {
    name: "ProEstoque",
    slug: "proestoque",
    extra: {
      apiUrl: process.env.EXPO_PUBLIC_API_URL,
    },
  },
};
