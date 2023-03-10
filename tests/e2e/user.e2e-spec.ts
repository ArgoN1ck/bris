import axios from 'axios';
import { randomUUID } from 'crypto';

describe('[SUCCESS] User (e2e)', () => {
  it('[POST] Create user', async () => {
    const createDto = {
      username: String(randomUUID() + Date()),
      email: String(randomUUID() + Date()),
      password: String(randomUUID() + Date()),
    };

    const user = await axios.post(
      `${process.env.PROJECT_URL}/api/users`,
      createDto
    );

    const id = user.data.id;

    const result = await axios.get(
      `${process.env.PROJECT_URL}/api/users/${id}`
    );

    expect(result.data).toMatchObject(createDto);

    await axios.delete(`${process.env.PROJECT_URL}/api/users/${id}`);
  });

  it('[PUT] Update user', async () => {
    const createDto = {
      username: String(randomUUID() + Date()),
      email: String(randomUUID() + Date()),
      password: String(randomUUID() + Date()),
    };

    const user = await axios.post(
      `${process.env.PROJECT_URL}/api/users`,
      createDto
    );

    const id = user.data.id;

    const updateDto = {
      username: String(randomUUID() + Date()),
      email: String(randomUUID() + Date()),
      password: String(randomUUID() + Date()),
    };

    await axios.put(`${process.env.PROJECT_URL}/api/users/${id}`, updateDto);

    const result = await axios.get(
      `${process.env.PROJECT_URL}/api/users/${id}`
    );

    expect(result.data).toMatchObject(updateDto);

    await axios.delete(`${process.env.PROJECT_URL}/api/users/${id}`);
  });

  it('[GET] Get user', async () => {
    const createDto = {
      username: String(randomUUID() + Date()),
      email: String(randomUUID() + Date()),
      password: String(randomUUID() + Date()),
    };

    const user = await axios.post(
      `${process.env.PROJECT_URL}/api/users`,
      createDto
    );

    const id = user.data.id;

    const result = await axios.get(
      `${process.env.PROJECT_URL}/api/users/${id}`
    );

    expect(result.data).toMatchObject(createDto);

    await axios.delete(`${process.env.PROJECT_URL}/api/users/${id}`);
  });

  it('[DELETE] Delete user', async () => {
    const createDto = {
      username: String(randomUUID() + Date()),
      email: String(randomUUID() + Date()),
      password: String(randomUUID() + Date()),
    };

    const user = await axios.post(
      `${process.env.PROJECT_URL}/api/users`,
      createDto
    );

    const id = user.data.id;

    await axios.delete(`${process.env.PROJECT_URL}/api/users/${id}`);

    await axios
      .get(`${process.env.PROJECT_URL}/api/users/${id}`)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(404));
  });
});

describe('[FAIL] User (e2e)', () => {
  it('[POST] Create users with sample data', async () => {
    const createDto = {
      username: String(randomUUID() + Date()),
      email: String(randomUUID() + Date()),
      password: String(randomUUID() + Date()),
    };

    const user = await axios.post(
      `${process.env.PROJECT_URL}/api/users`,
      createDto
    );

    await axios
      .post(`${process.env.PROJECT_URL}/api/users`, createDto)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(409));

    const id = user.data.id;

    await axios.delete(`${process.env.PROJECT_URL}/api/users/${id}`);
  });

  it('[GET] Get user that does not exist', async () => {
    const createDto = {
      username: String(randomUUID() + Date()),
      email: String(randomUUID() + Date()),
      password: String(randomUUID() + Date()),
    };

    const user = await axios.post(
      `${process.env.PROJECT_URL}/api/users`,
      createDto
    );

    const id = user.data.id;

    await axios.delete(`${process.env.PROJECT_URL}/api/users/${id}`);

    await axios
      .get(`${process.env.PROJECT_URL}/api/users/${id}`)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(404));
  });

  it('[PUT] Update user with same data', async () => {
    const createDto = {
      username: String(randomUUID() + Date()),
      email: String(randomUUID() + Date()),
      password: String(randomUUID() + Date()),
    };

    const createNewDto = {
      username: String(randomUUID() + Date()),
      email: String(randomUUID() + Date()),
      password: String(randomUUID() + Date()),
    };

    const user = await axios.post(
      `${process.env.PROJECT_URL}/api/users`,
      createDto
    );

    const newUser = await axios.post(
      `${process.env.PROJECT_URL}/api/users`,
      createNewDto
    );

    const userId = user.data.id;
    const newUserId = newUser.data.id;

    await axios
      .put(`${process.env.PROJECT_URL}/api/users/${newUserId}`, createDto)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(409));

    await axios.delete(`${process.env.PROJECT_URL}/api/users/${userId}`);
    await axios.delete(`${process.env.PROJECT_URL}/api/users/${newUserId}`);
  });

  it('[DELETE] Delete user that does not exists', async () => {
    const id = randomUUID();
    await axios
      .delete(`${process.env.PROJECT_URL}/api/users/${id}`)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(404));
  });
});
