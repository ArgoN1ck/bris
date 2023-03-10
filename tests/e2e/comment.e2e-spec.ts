import axios from 'axios';
import { randomUUID } from 'crypto';

describe('[SUCCESS] Comment (e2e)', () => {
  let user;
  let profile;
  let article;

  beforeEach(async () => {
    const createUserDto = {
      username: String(randomUUID() + Date()),
      email: String(randomUUID() + Date()),
      password: String(randomUUID() + Date()),
    };

    user = await axios
      .post(`${process.env.PROJECT_URL}/api/users`, createUserDto)
      .then((response) => response.data);

    const createProfileDto = {
      userId: user.id,
      bio: String(randomUUID() + Date()),
      image: String(randomUUID() + Date()),
    };

    profile = await axios
      .post(`${process.env.PROJECT_URL}/api/profiles`, createProfileDto)
      .then((response) => response.data);

    const username = user.username;

    profile = await axios
      .get(`${process.env.PROJECT_URL}/api/profiles/${username}`)
      .then((response) => response.data);

    const createArticleDto = {
      body: String(randomUUID() + Date()),
      title: String(randomUUID() + Date()),
      description: String(randomUUID() + Date()),
      authorId: profile.id,
    };

    article = await axios
      .post(`${process.env.PROJECT_URL}/api/articles`, createArticleDto)
      .then((response) => response.data);
  });

  afterEach(async () => {
    await axios.delete(`${process.env.PROJECT_URL}/api/users/${user.id}`);
    await axios.delete(
      `${process.env.PROJECT_URL}/api/articles/${article.slug}`
    );
  });

  it('[POST] Create comment', async () => {
    const createDto = {
      body: String(randomUUID() + Date()),
      authorId: profile.id,
      articleId: article.id,
    };

    const comment = await axios.post(
      `${process.env.PROJECT_URL}/api/articles/${article.slug}/comments`,
      createDto
    );

    const result = await axios.get(
      `${process.env.PROJECT_URL}/api/articles/${article.slug}/comments/${comment.data.id}`
    );

    expect(result.data).toMatchObject(createDto);

    await axios.delete(
      `${process.env.PROJECT_URL}/api/articles/${article.slug}/comments/${comment.data.id}`
    );
  });

  it('[GET] Get comment', async () => {
    const createDto = {
      body: String(randomUUID() + Date()),
      authorId: profile.id,
      articleId: article.id,
    };

    const comment = await axios.post(
      `${process.env.PROJECT_URL}/api/articles/${article.slug}/comments`,
      createDto
    );

    const result = await axios.get(
      `${process.env.PROJECT_URL}/api/articles/${article.slug}/comments/${comment.data.id}`
    );

    expect(result.data).toMatchObject(createDto);

    await axios.delete(
      `${process.env.PROJECT_URL}/api/articles/${article.slug}/comments/${comment.data.id}`
    );
  });

  it('[DELETE] Delete comment', async () => {
    const createDto = {
      body: String(randomUUID() + Date()),
      authorId: profile.id,
      articleId: article.id,
    };

    const comment = await axios.post(
      `${process.env.PROJECT_URL}/api/articles/${article.slug}/comments`,
      createDto
    );

    await axios.delete(
      `${process.env.PROJECT_URL}/api/articles/${article.slug}/comments/${comment.data.id}`
    );

    await axios
      .get(`${process.env.PROJECT_URL}/api/comments/${article.slug}`)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(404));
  });
});

describe('[FAIL] Comment (e2e)', () => {
  let user;
  let profile;
  let article;

  beforeEach(async () => {
    const createUserDto = {
      username: String(randomUUID() + Date()),
      email: String(randomUUID() + Date()),
      password: String(randomUUID() + Date()),
    };

    user = await axios
      .post(`${process.env.PROJECT_URL}/api/users`, createUserDto)
      .then((response) => response.data);

    const createProfileDto = {
      userId: user.id,
      bio: String(randomUUID() + Date()),
      image: String(randomUUID() + Date()),
    };

    profile = await axios
      .post(`${process.env.PROJECT_URL}/api/profiles`, createProfileDto)
      .then((response) => response.data);

    const username = user.username;

    profile = await axios
      .get(`${process.env.PROJECT_URL}/api/profiles/${username}`)
      .then((response) => response.data);

    const createArticleDto = {
      body: String(randomUUID() + Date()),
      title: String(randomUUID() + Date()),
      description: String(randomUUID() + Date()),
      authorId: profile.id,
    };

    article = await axios
      .post(`${process.env.PROJECT_URL}/api/articles`, createArticleDto)
      .then((response) => response.data);
  });

  afterEach(async () => {
    await axios.delete(`${process.env.PROJECT_URL}/api/users/${user.id}`);
    await axios.delete(
      `${process.env.PROJECT_URL}/api/articles/${article.slug}`
    );
  });

  it('[GET] Get comment that does not exist', async () => {
    const createDto = {
      body: String(randomUUID() + Date()),
      authorId: profile.id,
      articleId: article.id,
    };

    const comment = await axios.post(
      `${process.env.PROJECT_URL}/api/articles/${article.slug}/comments`,
      createDto
    );

    await axios.delete(
      `${process.env.PROJECT_URL}/api/articles/${article.slug}/comments/${comment.data.id}`
    );

    await axios
      .get(`${process.env.PROJECT_URL}/api/comments/${article.slug}`)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(404));
  });

  it('[DELETE] Delete comment that does not exists', async () => {
    const id = randomUUID();
    await axios
      .delete(`${process.env.PROJECT_URL}/api/comments/${id}`)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(404));
  });
});
