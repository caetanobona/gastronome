import { ref } from 'vue';

const searchQuery = ref<string>('');

export function useSearchQuery() {
  return {
    searchQuery
  }
}