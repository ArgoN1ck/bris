import axios from 'axios';
import { randomUUID } from 'crypto';

describe('[SUCCESS] Profile (e2e)', () => {
  let user;

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
  });

  afterEach(async () => {
    await axios.delete(`${process.env.PROJECT_URL}/api/users/${user.id}`);
  });

  it('[POST] Create profile', async () => {
    const createDto = {
      userId: user.id,
      bio: String(randomUUID() + Date()),
      image: String(randomUUID() + Date()),
    };

    const profile = await axios.post(
      `${process.env.PROJECT_URL}/api/profiles`,
      createDto
    );

    const id = profile.data.id;

    const result = await axios.get(
      `${process.env.PROJECT_URL}/api/profiles/${id}`
    );

    expect(result.data).toMatchObject(createDto);

    await axios.delete(`${process.env.PROJECT_URL}/api/profiles/${id}`);
  });

  it('[PUT] Update profile', async () => {
    const createDto = {
      userId: user.id,
      bio: String(randomUUID() + Date()),
      image: String(randomUUID() + Date()),
    };

    const profile = await axios.post(
      `${process.env.PROJECT_URL}/api/profiles`,
      createDto
    );

    const id = profile.data.id;

    const updateDto = {
      userId: user.id,
      bio: String(randomUUID() + Date()),
      image: String(randomUUID() + Date()),
    };

    await axios.put(`${process.env.PROJECT_URL}/api/profiles/${id}`, updateDto);

    const result = await axios.get(
      `${process.env.PROJECT_URL}/api/profiles/${id}`
    );

    expect(result.data).toMatchObject(updateDto);

    await axios.delete(`${process.env.PROJECT_URL}/api/profiles/${id}`);
  });

  it('[GET] Get profile', async () => {
    const createDto = {
      userId: user.id,
      bio: String(randomUUID() + Date()),
      image: String(randomUUID() + Date()),
    };

    const profile = await axios.post(
      `${process.env.PROJECT_URL}/api/profiles`,
      createDto
    );

    const id = profile.data.id;

    const result = await axios.get(
      `${process.env.PROJECT_URL}/api/profiles/${id}`
    );

    expect(result.data).toMatchObject(createDto);

    await axios.delete(`${process.env.PROJECT_URL}/api/profiles/${id}`);
  });

  it('[DELETE] Delete profile', async () => {
    const createDto = {
      userId: user.id,
      bio: String(randomUUID() + Date()),
      image: String(randomUUID() + Date()),
    };

    const profile = await axios.post(
      `${process.env.PROJECT_URL}/api/profiles`,
      createDto
    );

    const id = profile.data.id;

    await axios.delete(`${process.env.PROJECT_URL}/api/profiles/${id}`);

    await axios
      .get(`${process.env.PROJECT_URL}/api/profiles/${id}`)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(404));
  });
});

describe('[FAIL] Profile (e2e)', () => {
  let user;

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
  });

  afterEach(async () => {
    await axios.delete(`${process.env.PROJECT_URL}/api/users/${user.id}`);
  });

  it('[POST] Create profiles with sample data', async () => {
    const createDto = {
      userId: user.id,
      bio: String(randomUUID() + Date()),
      image: String(randomUUID() + Date()),
    };

    const profile = await axios.post(
      `${process.env.PROJECT_URL}/api/profiles`,
      createDto
    );

    await axios
      .post(`${process.env.PROJECT_URL}/api/profiles`, createDto)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(409));

    const id = profile.data.id;

    await axios.delete(`${process.env.PROJECT_URL}/api/profiles/${id}`);
  });

  it('[GET] Get profile that does not exist', async () => {
    const createDto = {
      userId: user.id,
      bio: String(randomUUID() + Date()),
      image: String(randomUUID() + Date()),
    };

    const profile = await axios.post(
      `${process.env.PROJECT_URL}/api/profiles`,
      createDto
    );

    const id = profile.data.id;

    await axios.delete(`${process.env.PROJECT_URL}/api/profiles/${id}`);

    await axios
      .get(`${process.env.PROJECT_URL}/api/profiles/${id}`)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(404));
  });

  it('[PUT] Update profile with same data', async () => {
    const createUserDto = {
      username: String(randomUUID() + Date()),
      email: String(randomUUID() + Date()),
      password: String(randomUUID() + Date()),
    };

    const newUser = await axios.post(
      `${process.env.PROJECT_URL}/api/users`,
      createUserDto
    );

    const createDto = {
      userId: user.id,
      bio: String(randomUUID() + Date()),
      image: String(randomUUID() + Date()),
    };

    const createNewDto = {
      userId: newUser.data.id,
      bio: String(randomUUID() + Date()),
      image: String(randomUUID() + Date()),
    };

    const profile = await axios.post(
      `${process.env.PROJECT_URL}/api/profiles`,
      createDto
    );

    const newProfile = await axios.post(
      `${process.env.PROJECT_URL}/api/profiles`,
      createNewDto
    );

    const profileId = profile.data.id;
    const newProfileId = newProfile.data.id;

    await axios
      .put(`${process.env.PROJECT_URL}/api/profiles/${newProfileId}`, createDto)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => {
        expect(response.status).toEqual(409);
      });

    await axios.delete(`${process.env.PROJECT_URL}/api/profiles/${profileId}`);
    await axios.delete(
      `${process.env.PROJECT_URL}/api/profiles/${newProfileId}`
    );
    await axios.delete(
      `${process.env.PROJECT_URL}/api/users/${newUser.data.id}`
    );
  });

  it('[DELETE] Delete profile that does not exists', async () => {
    const id = randomUUID();
    await axios
      .delete(`${process.env.PROJECT_URL}/api/profiles/${id}`)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(404));
  });
});
