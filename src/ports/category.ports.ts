import { Category } from "@/entities/category";
import axios from "axios";

export default class CategoryPorts {
  #url = "https://6423efc847401740432f0134.mockapi.io/api/v1";

  getAllCategory() {
    const endPoint = "category";
    return axios.get(`${this.#url}/${endPoint}`);
  }

  createCategory(cat: Category) {
    const endpoint = "category"
    return axios.post(`${this.#url}/${endpoint}`, cat);
  }

  updateCat(cat: Category) {
    const endpoint = "category"
    return axios.put(`${this.#url}/${endpoint}/${cat.id}`, cat);
  }

  deleteCat(idCat: string) {
    const endpoint = "category"
    return axios.delete(`${this.#url}/${endpoint}/${idCat}`);
  }
}
