import axios from 'axios';
import { randomUUID } from 'crypto';

describe('[SUCCESS] Tag (e2e)', () => {
  it('[POST] Create tag', async () => {
    const createDto = {
      title: String(randomUUID() + Date()),
    };

    const tag = await axios.post(
      `${process.env.PROJECT_URL}/api/tags`,
      createDto
    );

    const id = tag.data.id;

    const result = await axios.get(`${process.env.PROJECT_URL}/api/tags/${id}`);

    expect(result.data).toMatchObject(createDto);

    await axios.delete(`${process.env.PROJECT_URL}/api/tags/${id}`);
  });

  it('[PUT] Update tag', async () => {
    const createDto = {
      title: String(randomUUID() + Date()),
    };

    const tag = await axios.post(
      `${process.env.PROJECT_URL}/api/tags`,
      createDto
    );

    const id = tag.data.id;

    const updateDto = {
      title: String(randomUUID() + Date()),
    };

    await axios.put(`${process.env.PROJECT_URL}/api/tags/${id}`, updateDto);

    const result = await axios.get(`${process.env.PROJECT_URL}/api/tags/${id}`);

    expect(result.data).toMatchObject(updateDto);

    await axios.delete(`${process.env.PROJECT_URL}/api/tags/${id}`);
  });

  it('[GET] Get tag', async () => {
    const createDto = {
      title: String(randomUUID() + Date()),
    };

    const tag = await axios.post(
      `${process.env.PROJECT_URL}/api/tags`,
      createDto
    );

    const id = tag.data.id;

    const result = await axios.get(`${process.env.PROJECT_URL}/api/tags/${id}`);

    expect(result.data).toMatchObject(createDto);

    await axios.delete(`${process.env.PROJECT_URL}/api/tags/${id}`);
  });

  it('[DELETE] Delete tag', async () => {
    const createDto = {
      title: String(randomUUID() + Date()),
    };

    const tag = await axios.post(
      `${process.env.PROJECT_URL}/api/tags`,
      createDto
    );

    const id = tag.data.id;

    await axios.delete(`${process.env.PROJECT_URL}/api/tags/${id}`);

    await axios
      .get(`${process.env.PROJECT_URL}/api/tags/${id}`)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(404));
  });
});

describe('[FAIL] Tag (e2e)', () => {
  it('[POST] Create tags with sample data', async () => {
    const createDto = {
      title: String(randomUUID() + Date()),
    };

    const tag = await axios.post(
      `${process.env.PROJECT_URL}/api/tags`,
      createDto
    );

    await axios
      .post(`${process.env.PROJECT_URL}/api/tags`, createDto)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(409));

    const id = tag.data.id;

    await axios.delete(`${process.env.PROJECT_URL}/api/tags/${id}`);
  });

  it('[GET] Get tag that does not exist', async () => {
    const createDto = {
      title: String(randomUUID() + Date()),
    };

    const tag = await axios.post(
      `${process.env.PROJECT_URL}/api/tags`,
      createDto
    );

    const id = tag.data.id;

    await axios.delete(`${process.env.PROJECT_URL}/api/tags/${id}`);

    await axios
      .get(`${process.env.PROJECT_URL}/api/tags/${id}`)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(404));
  });

  it('[PUT] Update tag with same data', async () => {
    const createDto = {
      title: String(randomUUID() + Date()),
    };

    const createNewDto = {
      title: String(randomUUID() + Date()),
    };

    const tag = await axios.post(
      `${process.env.PROJECT_URL}/api/tags`,
      createDto
    );

    const newTag = await axios.post(
      `${process.env.PROJECT_URL}/api/tags`,
      createNewDto
    );

    const tagId = tag.data.id;
    const newTagId = newTag.data.id;

    await axios
      .put(`${process.env.PROJECT_URL}/api/tags/${newTagId}`, createDto)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => {
        expect(response.status).toEqual(409);
      });

    await axios.delete(`${process.env.PROJECT_URL}/api/tags/${tagId}`);
    await axios.delete(`${process.env.PROJECT_URL}/api/tags/${newTagId}`);
  });

  it('[DELETE] Delete tag that does not exists', async () => {
    const id = randomUUID();
    await axios
      .delete(`${process.env.PROJECT_URL}/api/tags/${id}`)
      .then(() => expect(true).toEqual(false))
      .catch(({ response }) => expect(response.status).toEqual(404));
  });
});
