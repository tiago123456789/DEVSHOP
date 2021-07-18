import axios from "./../utils/HttpClient";

export default class BrandService {

  async remove(id: string) {
    const mutation = `
      mutation {
        deleteBrand(id: "${id}")
      }
    `;
    const response = await axios.post(
      process.env.NEXT_PUBLIC_URL_BASE,
      { query: mutation }
    );
    return response.data;
  }


  async updateLogoBrand(id, file) {
    const mutation = `
        mutation {
          updateLogoBrand(id: "${id}", file: "${file}")
        }
      `;

    return await axios.post(
      process.env.NEXT_PUBLIC_URL_BASE,
      { query: mutation }
    )
  }

  async create(register) {
    const mutation = `
        mutation {
          createBrand(input: {
            name: "${register.name}",
          })
        }
      `;
    const response = await axios.post(
      process.env.NEXT_PUBLIC_URL_BASE,
      { query: mutation }
    );
    return response.data?.data.createBrand;
  }

  async getAll() {
    const query = `
        query {
          getBrands{
            id, name, image
          }
        }
      `;
    const response = await axios.post(
      process.env.NEXT_PUBLIC_URL_BASE,
      { query: query }
    );
    return response.data?.data.getBrands;
  }

  async getById(id) {
    const query = `
        query {
          getBrandById(id: "${id}"){
            id, name, image
          }
        }
      `;
    const response = await axios.post(
      process.env.NEXT_PUBLIC_URL_BASE,
      { query: query }
    );
    return response.data?.data?.getBrandById;
  }

  update(register) {
    const mutation = `
        mutation {
          updateBrand(input: {
              id: "${register.id}",
              name: "${register.name}"
          })
        }
      `;
    return axios.post(
      process.env.NEXT_PUBLIC_URL_BASE,
      { query: mutation }
    );
  }
}