import axios from 'axios';
import { randomUUID } from 'crypto';

describe('[SUCCESS] Article (e2e)', () => {
  let user;
  let profile;

  beforeEach(async () => {
    const createUserDto = {
      username: String(randomUUID() + Date()),
      email: String(randomUUID() + Date()),
      password: String(randomUUID() + Date()),
    };

    const newUser = await axios.post(
      `${process.env.PROJECT_URL}/api/users`,
      createUserDto
    );

    user = newUser.data;

    const createDto = {
      userId: user.id,
      bio: String(randomUUID() + Date()),
      image: String(randomUUID() + Date()),
    };

    await axios.post(`${process.env.PROJECT_URL}/api/profiles`, createDto);
    const username = user.username;

    profile = await axios
      .get(`${process.env.PROJECT_URL}/api/profiles/${username}`)
      .then((response) => response.data);
  });

  afterEach(async () => {
    await axios.delete(`${process.env.PROJECT_URL}/api/users/${user.id}`);
  });

  it('[POST] Create article', async () => {
    const createDto = {
      body: String(randomUUID() + Date()),
      title: String(randomUUID() + Date()),
      description: String(randomUUID() + Date()),
      authorId: profile.id,
    };

    const article = await axios.post(
      `${process.env.PROJECT_URL}/api/articles`,
      createDto
    );

    const slug = article.data.slug;

    const result = await axios.get(
      `${process.env.PROJECT_URL}/api/articles/${slug}`
    );

    expect(result.data).toMatchObject(createDto);

    await axios.delete(`${process.env.PROJECT_URL}/api/articles/${slug}`);
  });

  it('[PUT] Update article', async () => {
    const createDto = {
      body: String(randomUUID() + Date()),
      title: String(randomUUID() + Date()),
      description: String(randomUUID() + Date()),
      authorId: profile.id,
    };

    const article = await axios.post(
      `${process.env.PROJECT_URL}/api/articles`,
      createDto
    );

    const slug = article.data.slug;

    const updateDto = {
      body: String(randomUUID() + Date()),
      title: String(randomUUID() + Date()),
      description: String(randomUUID() + Date()),
    };

    await axios.put(
      `${process.env.PROJECT_URL}/api/articles/${slug}`,
      updateDto
    );

    const result = await axios.get(
      `${process.env.PROJECT_URL}/api/articles/${slug}`
    );

    expect(result.data).toMatchObject(updateDto);

    await axios.delete(`${process.env.PROJECT_URL}/api/articles/${slug}`);
  });

  it('[GET] Get article', async () => {
    const createDto = {
      body: String(randomUUID() + Date()),
      title: String(randomUUID() + Date()),
      description: String(randomUUID() + Date()),
      authorId: profile.id,
    };

    const article = await axios.post(
      `${process.env.PROJECT_URL}/api/articles`,
      createDto
    );

    const slug = article.data.slug;

    const result = await axios.get(
      `${process.env.PROJECT_URL}/api/articles/${slug}`
    );

    expect(result.data).toMatchObject(createDto);

    await axios.delete(`${process.env.PROJECT_URL}/api/articles/${slug}`);
  });

  it('[DELETE] Delete article', async () => {
    const createDto = {
      body: String(randomUUID() + Date()),
      title: String(randomUUID() + Date()),
      description: String(randomUUID() + Date()),
      authorId: profile.id,
    };

    const article = await axios.post(
      `${process.env.PROJECT_URL}/api/articles`,
      createDto
    );

    const slug = article.data.slug;

    await axios.delete(`${process.env.PROJECT_URL}/api/articles/${slug}`);

    await axios
      .get(`${process.env.PROJECT_URL}/api/articles/${slug}`)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(404));
  });
});

describe('[FAIL] Article (e2e)', () => {
  let user;
  let profile;

  beforeEach(async () => {
    const createUserDto = {
      username: String(randomUUID() + Date()),
      email: String(randomUUID() + Date()),
      password: String(randomUUID() + Date()),
    };

    const newUser = await axios.post(
      `${process.env.PROJECT_URL}/api/users`,
      createUserDto
    );

    user = newUser.data;

    const createDto = {
      userId: user.id,
      bio: String(randomUUID() + Date()),
      image: String(randomUUID() + Date()),
    };

    await axios.post(`${process.env.PROJECT_URL}/api/profiles`, createDto);
    const username = user.username;

    profile = await axios
      .get(`${process.env.PROJECT_URL}/api/profiles/${username}`)
      .then((response) => response.data);
  });

  afterEach(async () => {
    await axios.delete(`${process.env.PROJECT_URL}/api/users/${user.id}`);
  });

  it('[POST] Create articles with sample data', async () => {
    const createDto = {
      body: String(randomUUID() + Date()),
      title: String(randomUUID() + Date()),
      description: String(randomUUID() + Date()),
      authorId: profile.id,
    };

    const article = await axios.post(
      `${process.env.PROJECT_URL}/api/articles`,
      createDto
    );

    await axios
      .post(`${process.env.PROJECT_URL}/api/articles`, createDto)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(409));

    const slug = article.data.slug;

    await axios.delete(`${process.env.PROJECT_URL}/api/articles/${slug}`);
  });

  it('[GET] Get article that does not exist', async () => {
    const createDto = {
      body: String(randomUUID() + Date()),
      title: String(randomUUID() + Date()),
      description: String(randomUUID() + Date()),
      authorId: profile.id,
    };

    const article = await axios.post(
      `${process.env.PROJECT_URL}/api/articles`,
      createDto
    );

    const slug = article.data.slug;

    await axios.delete(`${process.env.PROJECT_URL}/api/articles/${slug}`);

    await axios
      .get(`${process.env.PROJECT_URL}/api/articles/${slug}`)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(404));
  });

  it('[DELETE] Delete article that does not exists', async () => {
    const id = randomUUID();
    await axios
      .delete(`${process.env.PROJECT_URL}/api/articles/${id}`)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(404));
  });
});
