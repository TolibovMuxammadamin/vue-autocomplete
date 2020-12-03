<template>
  <div id="app">
    <autocomplete v-model="item"
                  :items="items"
                  :inputSearch.sync="search"
                  item-label="title"
                  item-value="id"
                  label="label"
                  :clearable="true">
      <template v-slot:item="{item}">
        <div class="chip">
          {{ item.title }}
        </div>
      </template>
    </autocomplete>
    some change
  </div>
</template>

<script>
import autocomplete from '@/components/autcomplete/template';
import axios from 'axios';
export default {
  name: 'App',
  data: () => ({
    item: null,
    items: [],
    search: ''
  }),
  components: {
    autocomplete
  },
  methods: {
    async getPosts () {
      try {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
        this.items = data;
      } catch (err) { console.log(err) }
    }
  },
  watch: {
    search () {
      this.getPosts();
    }
  },
  created() {
    this.getPosts();
  }
}
</script>

<style>
*, ::after, ::before {
  box-sizing: border-box;
}
#app {
  padding: 20px;
}

.chip {
  padding: 8px;
  background-color: orangered;
  color: #fff;
}

</style>
