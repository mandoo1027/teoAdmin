import { defineStore } from 'pinia'; 

export const loadingStore = defineStore('loading',()=> {
   
  const loading = ref(false) 

  const startLoadingbar = ()=>{
    loading.value = true
  }
  const finishLoadingbar = ()=>{
    loading.value = false
  }
  const isLoading = computed(()=>loading.value)

  return {isLoading, startLoadingbar,finishLoadingbar} 
})