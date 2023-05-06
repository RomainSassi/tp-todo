import { Category } from "@/entities/category"
import CategoryService from "@/services/category.services"


export default {
    namespaced: true,
    state: {
        allCategory: []
    },
    getters: {
        allCategory: (state: any) => state.allCategory,
        color: (state: any) => (cat: any) => {
            const index = state.allCategory.findIndex((obj: Category) => obj.id == cat)
            if (index !== -1) {
                return state.allCategory[index].color
            }
            return false
        }
    },
    mutations: {
        SET_ALL(state: any, data: []) {
            state.allCategory = data
        },
        SET_UPDATE(state: any, payload: Category) {
            const index = state.allCategory.findIndex((obj: Category) => obj.id === payload.id)

            if (index !== -1) {
                state.allCategory[index] = payload
            }
        }
    },
    actions: {
        async getAllCategory({commit}: any) {
            const categoryService = new CategoryService();
            const data = await categoryService.getCategory();
            if (data !== false) {
                commit('SET_ALL', data)
            }
        }, 
        async deteleCat(context: any, cat: Category) {
            const categoryService = new CategoryService();
            const response = await categoryService.deleteCat(cat.id)
            if (response === true) {
                context.dispatch('getAllCategory');
                context.commit('SET_SNACKBAR_VALUE', {
                    text: `${cat.label} supprimée !`,
                    concern: "info"
                }, {root: true})
            } else {
                context.commit('SET_SNACKBAR_VALUE', {
                    text: `${cat.label} non supprimée !`,
                    concern: "error"
                }, {root: true})
            }
        }
    },
}