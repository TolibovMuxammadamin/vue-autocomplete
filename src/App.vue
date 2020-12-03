<template>
  <div id="app">
    <autocomplete v-model="todo"
                  :items="todos"
                  item-label="title"
                  item-value="id"
                  label="Simple Autocomplete" />
    <autocomplete v-model="post"
                  :items="posts"
                  :inputSearch.sync="search"
                  item-label="title"
                  item-value="id"
                  label="Autocomplete with throttle search and v-slot"
                  :clearable="true">
      <template v-slot:item="{ item }">
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
    post: null,
    posts: [],
    todo: null,
    todos: [],
    search: ''
  }),
  components: {
    autocomplete
  },
  methods: {
    async getPosts () {
      try {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/posts`);
        this.posts = data;
      } catch (err) { console.log(err) }
    },
    async getTodos () {
      try {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/1/todos`);
        this.todos = data;
      } catch (err) { console.log(err) }
    }
  },
  watch: {
    search () {
      this.getPosts();
    }
  },
  created() {
    this.getTodos();
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
