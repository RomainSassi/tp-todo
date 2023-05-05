import { Category } from "@/entities/category";
import CategoryPorts from "@/ports/category.ports";

export default class CategoryService {
  #_categoryPorts: CategoryPorts;

  constructor() {
    this.#_categoryPorts = new CategoryPorts();
  }

  async getCategory() {
    const response = await this.#_categoryPorts.getAllCategory();
    const data = response.data;

    let category: Category[] = [];

    if (!Array.isArray(data)) return false;

    category = data.filter(this.checkDataIsCategory);

    return category;
  }

  async createACategory(cat: Category) {
    const check = this.checkDataIsCategory(cat)
    if (!check) return false
    const response = await this.#_categoryPorts.createCategory(cat)
    
    if (response.statusText === "Created") return true

    return false
  }

  async updateCat(cat: Category) {
    const check = this.checkDataIsCategory(cat)
    if (!check) return false

    const response = await this.#_categoryPorts.updateCat(cat)
    if (response.statusText === "OK") return true
    return false
  }

  async deleteCat(idCat: string) {
    return await this.#_categoryPorts.deleteCat(idCat);
  }

  checkDataIsCategory(data: any): data is Category {
    return (
      typeof data.label === "string" && 
      typeof data.color === "string"
    );
  }
}
