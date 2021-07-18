import axios from "./../utils/HttpClient";

export default class ProductService {

  async remove(id: string) {
    const mutation = `
    mutation {
      deleteProduct(id: "${id}")
    }
  `;
  const response = await axios.post(
    process.env.NEXT_PUBLIC_URL_BASE,
    { query: mutation }
  );
  return response.data;
  }

  async create(register) {
    const mutation = `
      mutation {
        createProduct(input: {
          name: "${register.name}",
          description: "${register.description}",
          slug: "${register.slug}"
        })
      }
    `;
    const response = await axios.post(
      process.env.NEXT_PUBLIC_URL_BASE,
      { query: mutation }
    );
    return response.data?.data.createProduct;
  }

  async getAll() {
      const query = `
      query {
        getProducts{
          id, name, description, slug
        }
      }
    `;
      const response = await axios.post(
          process.env.NEXT_PUBLIC_URL_BASE,
          { query: query }
      );
      return response.data?.data.getProducts;
  }

  async getById(id) {
    const query = `
      query {
        getByIdProduct(id: "${id}"){
          id, name, description, slug
        }
      }
    `;
    const response = await axios.post(
      process.env.NEXT_PUBLIC_URL_BASE,
      { query: query }
    );
    return response.data?.data?.getByIdProduct;
  }

  update(register) {
    const mutation = `
      mutation {
        updateProduct(input: {
            id: "${register.id}",
            name: "${register.name}",
            description: "${register.description}",
            slug: "${register.slug}"
        })
      }
    `;
    return axios.post(
      process.env.NEXT_PUBLIC_URL_BASE,
      { query: mutation }
    );
  }
}