import axios from 'axios';

describe('App health-check', () => {
  it('[SUCCESS] Health-check', async () => {
    const result = await axios.get(
      `${process.env.PROJECT_URL}/api/health-check`
    );
    expect(result.data).toEqual({ status: 'OK' });
  });
});
