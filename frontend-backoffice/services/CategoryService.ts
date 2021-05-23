import axios from "axios";

export default class CategoryService {

    async remove(id: string) {
      const mutation = `
      mutation {
        deleteCategory(id: "${id}")
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
          createCategory(input: { name: "${register.name}", slug: "${register.slug}" }){
            id, name, slug
          }
        }
      `;
      const response = await axios.post(
        process.env.NEXT_PUBLIC_URL_BASE,
        { query: mutation }
      );
      return response.data?.data.createCategory;
    }

    async getAll() {
        const query = `
        query {
          getCategories{
            id, name, slug
          }
        }
      `;
        const response = await axios.post(
            process.env.NEXT_PUBLIC_URL_BASE,
            { query: query }
        );
        return response.data?.data.getCategories;
    }
}